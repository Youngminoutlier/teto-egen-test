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
        
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            # PostgreSQL용 INSERT
            with db.cursor() as cursor:
                cursor.execute('''
                    INSERT INTO test_results
                    (nickname, gender, teto_score, egen_score, result_type, answers, start_time, end_time)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                ''', (
                    result_data['nickname'],
                    result_data['gender'],
                    result_data['tetoScore'],
                    result_data['egenScore'],
                    result_data['resultType'],
                    json.dumps(result_data.get('answers', [])),
                    result_data.get('startTime'),
                    result_data.get('endTime')
                ))
                result_id = cursor.fetchone()['id']
        else:
            # SQLite용 INSERT
            cursor = db.execute('''
                INSERT INTO test_results
                (nickname, gender, teto_score, egen_score, result_type, answers, start_time, end_time)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                result_data['nickname'],
                result_data['gender'],
                result_data['tetoScore'],
                result_data['egenScore'],
                result_data['resultType'],
                json.dumps(result_data.get('answers', [])),
                result_data.get('startTime'),
                result_data.get('endTime')
            ))
            result_id = cursor.lastrowid
        
        db.commit()
        return result_id
        
    except Exception as e:
        db.rollback()
        raise e

def get_all_results(db):
    """모든 테스트 결과 조회"""
    try:
        database_url = get_database_url()
        
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            # PostgreSQL용 SELECT
            with db.cursor() as cursor:
                cursor.execute('''
                    SELECT id, nickname, gender, teto_score, egen_score, result_type,
                           answers, start_time, end_time, 
                           created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul' as created_at
                    FROM test_results
                    ORDER BY created_at DESC
                ''')
                rows = cursor.fetchall()
        else:
            # SQLite용 SELECT
            cursor = db.execute('''
                SELECT id, nickname, gender, teto_score, egen_score, result_type,
                       answers, start_time, end_time, created_at
                FROM test_results
                ORDER BY created_at DESC
            ''')
            rows = cursor.fetchall()
        
        results = []
        for row in rows:
            # 날짜 형식 안전하게 처리
            created_at_iso = None
            if row['created_at']:
                try:
                    if isinstance(row['created_at'], str):
                        # 문자열인 경우 ISO 형식으로 변환
                        created_at_iso = datetime.fromisoformat(row['created_at'].replace('Z', '+00:00')).isoformat()
                    else:
                        # datetime 객체인 경우 ISO 형식으로 변환
                        created_at_iso = row['created_at'].isoformat()
                except:
                    created_at_iso = str(row['created_at'])
            
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
                "created_at": created_at_iso
            }
            results.append(result)
        
        return results
        
    except Exception as e:
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
