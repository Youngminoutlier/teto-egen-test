import os
import json
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
from urllib.parse import urlparse

# PostgreSQL 연결 정보 가져오기
def get_database_url():
    # Render.com에서 제공하는 DATABASE_URL 환경변수 사용
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        # 로컬 개발용 fallback (필요시)
        database_url = os.getenv('DATABASE_URL_LOCAL', 'sqlite:///test_results.db')
    return database_url

def get_db():
    """PostgreSQL 데이터베이스 연결"""
    database_url = get_database_url()
    
    if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
        # PostgreSQL 연결
        conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
        return conn
    else:
        # SQLite fallback (로컬 개발용)
        import sqlite3
        conn = sqlite3.connect(database_url.replace('sqlite:///', ''))
        conn.row_factory = sqlite3.Row
        return conn

def init_db():
    """데이터베이스 초기화"""
    conn = get_db()
    database_url = get_database_url()
    
    try:
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            # PostgreSQL용 테이블 생성
            with conn.cursor() as cursor:
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS test_results (
                        id SERIAL PRIMARY KEY,
                        nickname VARCHAR(50) NOT NULL,
                        gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
                        teto_score INTEGER NOT NULL CHECK (teto_score >= 0 AND teto_score <= 100),
                        egen_score INTEGER NOT NULL CHECK (egen_score >= 0 AND egen_score <= 100),
                        result_type VARCHAR(50) NOT NULL,
                        answers JSONB,
                        start_time VARCHAR(50),
                        end_time VARCHAR(50),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                ''')
            conn.commit()
        else:
            # SQLite용 테이블 생성 (로컬 개발용)
            conn.execute('''
                CREATE TABLE IF NOT EXISTS test_results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nickname TEXT NOT NULL,
                    gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
                    teto_score INTEGER NOT NULL CHECK (teto_score >= 0 AND teto_score <= 100),
                    egen_score INTEGER NOT NULL CHECK (egen_score >= 0 AND egen_score <= 100),
                    result_type TEXT NOT NULL,
                    answers TEXT,
                    start_time TEXT,
                    end_time TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
        
        print("데이터베이스 테이블이 생성되었습니다.")
        
    except Exception as e:
        print(f"데이터베이스 초기화 오류: {e}")
        conn.rollback()
    finally:
        conn.close()

def save_result(db, result_data):
    """테스트 결과 저장"""
    try:
        database_url = get_database_url()
        
        # 한국 시간으로 현재 시간 설정 (UTC+9)
        import pytz
        kst = pytz.timezone('Asia/Seoul')
        current_time_kst = datetime.now(kst)
        
        print(f"=== 결과 저장 시작 ===")
        print(f"한국 시간: {current_time_kst}")
        print(f"저장할 데이터: {result_data}")
        
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            # PostgreSQL용 INSERT - 한국 시간으로 명시적 설정
            with db.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO test_results
                    (nickname, gender, teto_score, egen_score, result_type, answers, start_time, end_time, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, created_at
                ''', (
                    result_data['nickname'],
                    result_data['gender'],
                    result_data['tetoScore'],
                    result_data['egenScore'],
                    result_data['resultType'],
                    json.dumps(result_data.get('answers', [])),
                    result_data.get('startTime'),
                    result_data.get('endTime'),
                    current_time_kst  # 한국 시간으로 저장
                ))
                row = cursor.fetchone()
                result_id = row['id']
                saved_created_at = row['created_at']
                print(f"저장된 ID: {result_id}, 저장된 created_at: {saved_created_at}")
        else:
            # SQLite용 INSERT - 한국 시간
            cursor = db.execute('''
                INSERT INTO test_results
                (nickname, gender, teto_score, egen_score, result_type, answers, start_time, end_time, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                result_data['nickname'],
                result_data['gender'],
                result_data['tetoScore'],
                result_data['egenScore'],
                result_data['resultType'],
                json.dumps(result_data.get('answers', [])),
                result_data.get('startTime'),
                result_data.get('endTime'),
                current_time_kst.strftime('%Y-%m-%d %H:%M:%S')  # 한국 시간으로 저장
            ))
            result_id = cursor.lastrowid
            print(f"SQLite 저장된 ID: {result_id}")
        
        db.commit()
        print(f"=== 결과 저장 완료: {result_id} ===")
        return result_id
        
    except Exception as e:
        print(f"저장 오류: {e}")
        db.rollback()
        raise e

def get_all_results(db):
    """모든 테스트 결과 조회"""
    try:
        database_url = get_database_url()
        print("=== 결과 조회 시작 ===")
        
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            # PostgreSQL용 SELECT - 간단하게 처리
            with db.cursor() as cursor:
                cursor.execute('''
                    SELECT id, nickname, gender, teto_score, egen_score, result_type,
                           answers, start_time, end_time, created_at
                    FROM test_results
                    ORDER BY id DESC
                ''')
                rows = cursor.fetchall()
                print(f"PostgreSQL에서 조회된 rows: {len(rows)}")
                if rows:
                    print(f"첫 번째 row 원본: {dict(rows[0])}")
        else:
            # SQLite용 SELECT
            cursor = db.execute('''
                SELECT id, nickname, gender, teto_score, egen_score, result_type,
                       answers, start_time, end_time, created_at
                FROM test_results
                ORDER BY id DESC
            ''')
            rows = cursor.fetchall()
            print(f"SQLite에서 조회된 rows: {len(rows)}")
        
        results = []
        for row in rows:
            # created_at 처리 - 더 간단하게
            created_at_value = None
            raw_created_at = row.get('created_at') or row['created_at'] if hasattr(row, '__getitem__') else getattr(row, 'created_at', None)
            
            print(f"원본 created_at 값: {raw_created_at}, 타입: {type(raw_created_at)}")
            
            if raw_created_at:
                try:
                    if isinstance(raw_created_at, datetime):
                        # datetime 객체인 경우
                        created_at_value = raw_created_at.strftime('%Y-%m-%dT%H:%M:%S')
                    elif isinstance(raw_created_at, str):
                        # 문자열인 경우
                        created_at_value = raw_created_at
                    else:
                        created_at_value = str(raw_created_at)
                    
                    print(f"변환된 created_at: {created_at_value}")
                except Exception as e:
                    print(f"created_at 변환 오류: {e}")
                    created_at_value = str(raw_created_at) if raw_created_at else None
            
            result = {
                "id": row['id'],
                "nickname": row['nickname'],
                "gender": row['gender'],
                "teto_score": row['teto_score'],
                "egen_score": row['egen_score'],
                "result_type": row['result_type'],
                "answers": json.loads(row['answers']) if row['answers'] else [],
                "start_time": row['start_time'],
                "end_time": row['end_time'],
                "created_at": created_at_value
            }
            results.append(result)
        
        print(f"=== 결과 조회 완료: {len(results)}개 ===")
        return results
        
    except Exception as e:
        print(f"get_all_results 오류: {e}")
        raise e

def fix_null_created_at(db):
    """NULL이거나 UTC 시간인 created_at 필드를 한국 시간으로 업데이트"""
    try:
        database_url = get_database_url()
        
        # 한국 시간으로 현재 시간 설정
        import pytz
        kst = pytz.timezone('Asia/Seoul')
        current_time_kst = datetime.now(kst)
        
        print("=== created_at 한국 시간 수정 시작 ===")
        
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            with db.cursor() as cursor:
                # NULL인 레코드 수 확인
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE created_at IS NULL")
                null_count = cursor.fetchone()['count']
                print(f"NULL created_at 레코드 수: {null_count}")
                
                # UTC 시간으로 저장된 레코드들을 한국 시간으로 변환
                cursor.execute('''
                    SELECT id, created_at 
                    FROM test_results 
                    WHERE created_at IS NOT NULL
                ''')
                utc_records = cursor.fetchall()
                
                updated_count = 0
                for record in utc_records:
                    try:
                        utc_time = record['created_at']
                        if utc_time.tzinfo is None:
                            # naive datetime을 UTC로 간주하고 한국 시간으로 변환
                            utc_time = pytz.UTC.localize(utc_time)
                        
                        # 한국 시간으로 변환
                        kst_time = utc_time.astimezone(kst)
                        
                        cursor.execute('''
                            UPDATE test_results 
                            SET created_at = %s 
                            WHERE id = %s
                        ''', (kst_time, record['id']))
                        
                        updated_count += 1
                        print(f"ID {record['id']}: {utc_time} → {kst_time}")
                        
                    except Exception as e:
                        print(f"ID {record['id']} 변환 오류: {e}")
                
                # NULL인 레코드들을 현재 한국 시간으로 업데이트
                if null_count > 0:
                    cursor.execute('''
                        UPDATE test_results 
                        SET created_at = %s 
                        WHERE created_at IS NULL
                    ''', (current_time_kst,))
                
                print(f"UTC→KST 변환된 레코드 수: {updated_count}")
                print(f"NULL→KST 업데이트된 레코드 수: {null_count}")
                
        else:
            # SQLite용 - 간단한 NULL 처리만
            cursor = db.execute("SELECT COUNT(*) FROM test_results WHERE created_at IS NULL")
            null_count = cursor.fetchone()[0]
            print(f"NULL created_at 레코드 수: {null_count}")
            
            if null_count > 0:
                db.execute('''
                    UPDATE test_results 
                    SET created_at = ? 
                    WHERE created_at IS NULL
                ''', (current_time_kst.strftime('%Y-%m-%d %H:%M:%S'),))
                
                print(f"SQLite NULL→KST 업데이트 완료")
        
        db.commit()
        print("=== created_at 한국 시간 수정 완료 ===")
        
    except Exception as e:
        print(f"created_at 수정 오류: {e}")
        db.rollback()
        raise e

def get_detailed_stats(db):
    """상세한 통계 정보 조회"""
    try:
        database_url = get_database_url()
        
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            # PostgreSQL용 통계 쿼리
            with db.cursor() as cursor:
                # 전체 통계
                cursor.execute("SELECT COUNT(*) as count FROM test_results")
                total_results = cursor.fetchone()['count']
                
                # 성별별 통계
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE gender = 'male'")
                male_count = cursor.fetchone()['count']
                
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE gender = 'female'")
                female_count = cursor.fetchone()['count']
                
                # 결과 타입별 통계
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE result_type = 'legend_teto'")
                legend_teto_count = cursor.fetchone()['count']
                
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE result_type = 'teto'")
                teto_count = cursor.fetchone()['count']
                
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE result_type = 'balance'")
                balance_count = cursor.fetchone()['count']
                
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE result_type = 'egen'")
                egen_count = cursor.fetchone()['count']
                
                cursor.execute("SELECT COUNT(*) as count FROM test_results WHERE result_type = 'legend_egen'")
                legend_egen_count = cursor.fetchone()['count']
        else:
            # SQLite용 통계 쿼리
            total_results = db.execute("SELECT COUNT(*) FROM test_results").fetchone()[0]
            male_count = db.execute("SELECT COUNT(*) FROM test_results WHERE gender = 'male'").fetchone()[0]
            female_count = db.execute("SELECT COUNT(*) FROM test_results WHERE gender = 'female'").fetchone()[0]
            legend_teto_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type = 'legend_teto'").fetchone()[0]
            teto_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type = 'teto'").fetchone()[0]
            balance_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type = 'balance'").fetchone()[0]
            egen_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type = 'egen'").fetchone()[0]
            legend_egen_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type = 'legend_egen'").fetchone()[0]
        
        return {
            "total_tests": total_results,
            "male_count": male_count,
            "female_count": female_count,
            "legend_teto_count": legend_teto_count,
            "teto_count": teto_count,
            "balance_count": balance_count,
            "egen_count": egen_count,
            "legend_egen_count": legend_egen_count
        }
        
    except Exception as e:
        print(f"통계 조회 오류: {e}")
        return {
            "total_tests": 0,
            "male_count": 0,
            "female_count": 0,
            "legend_teto_count": 0,
            "teto_count": 0,
            "balance_count": 0,
            "egen_count": 0,
            "legend_egen_count": 0,
            "error": str(e)
        }

# 앱 시작 시 데이터베이스 초기화
if __name__ == "__main__":
    init_db()
