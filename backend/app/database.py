import sqlite3
import os
from datetime import datetime
import json

DATABASE_URL = "test_results.db"

def get_db():
    """데이터베이스 연결"""
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """데이터베이스 초기화"""
    conn = get_db()
    
    # 테스트 결과 테이블 생성
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
    conn.close()

def save_result(db, result_data):
    """테스트 결과 저장"""
    try:
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
        
        db.commit()
        return cursor.lastrowid
    except Exception as e:
        db.rollback()
        raise e

def get_all_results(db):
    """모든 테스트 결과 조회"""
    try:
        cursor = db.execute('''
            SELECT id, nickname, gender, teto_score, egen_score, result_type, 
                   answers, start_time, end_time, created_at
            FROM test_results 
            ORDER BY created_at DESC
        ''')
        
        results = []
        for row in cursor.fetchall():
            result = {
                "id": row[0],
                "nickname": row[1],
                "gender": row[2],
                "teto_score": row[3],
                "egen_score": row[4],
                "result_type": row[5],
                "answers": json.loads(row[6]) if row[6] else [],
                "start_time": row[7],
                "end_time": row[8],
                "created_at": row[9]
            }
            results.append(result)
        
        return results
    except Exception as e:
        raise e

def get_stats(db):
    """통계 정보 조회"""
    try:
        # 전체 테스트 수
        total = db.execute("SELECT COUNT(*) FROM test_results").fetchone()[0]
        
        # 성별별 통계
        male_count = db.execute("SELECT COUNT(*) FROM test_results WHERE gender = 'male'").fetchone()[0]
        female_count = db.execute("SELECT COUNT(*) FROM test_results WHERE gender = 'female'").fetchone()[0]
        
        # 결과 타입별 통계
        teto_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type LIKE '%teto%'").fetchone()[0]
        egen_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type LIKE '%egen%'").fetchone()[0]
        balance_count = db.execute("SELECT COUNT(*) FROM test_results WHERE result_type = 'balance'").fetchone()[0]
        
        return {
            "total_tests": total,
            "male_count": male_count,
            "female_count": female_count,
            "teto_count": teto_count,
            "egen_count": egen_count,
            "balance_count": balance_count
        }
    except Exception as e:
        return {"error": str(e)}

# 앱 시작 시 데이터베이스 초기화
init_db()
