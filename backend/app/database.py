import os
import json
from datetime import datetime
from sqlalchemy import create_engine, text, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 환경에 따른 DATABASE_URL 설정
DATABASE_URL = os.environ.get('DATABASE_URL')

if not DATABASE_URL:
    # 로컬 개발환경용 SQLite
    DATABASE_URL = 'sqlite:///./test_results.db'
elif DATABASE_URL.startswith('postgres://'):
    # Render.com PostgreSQL URL 수정
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

# SQLAlchemy 엔진 생성
if DATABASE_URL.startswith('sqlite'):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 테이블 모델 정의
class TestResult(Base):
    __tablename__ = "test_results"
    
    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    teto_score = Column(Integer, nullable=False)
    egen_score = Column(Integer, nullable=False)
    result_type = Column(String, nullable=False)
    answers = Column(String)  # JSON string
    start_time = Column(String)
    end_time = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

def get_db():
    """데이터베이스 세션 생성"""
    db = SessionLocal()
    try:
        return db
    finally:
        pass  # 세션은 호출하는 곳에서 닫아야 함

def init_db():
    """데이터베이스 테이블 생성"""
    try:
        Base.metadata.create_all(bind=engine)
        print("데이터베이스 테이블이 생성되었습니다.")
    except Exception as e:
        print(f"데이터베이스 초기화 오류: {e}")

def save_result(db, result_data):
    """테스트 결과 저장"""
    try:
        db_result = TestResult(
            nickname=result_data['nickname'],
            gender=result_data['gender'],
            teto_score=result_data['tetoScore'],
            egen_score=result_data['egenScore'],
            result_type=result_data['resultType'],
            answers=json.dumps(result_data.get('answers', [])),
            start_time=result_data.get('startTime'),
            end_time=result_data.get('endTime')
        )
        
        db.add(db_result)
        db.commit()
        db.refresh(db_result)
        
        return db_result.id
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_all_results(db):
    """모든 테스트 결과 조회"""
    try:
        results = db.query(TestResult).order_by(TestResult.created_at.desc()).all()
        
        result_list = []
        for result in results:
            result_dict = {
                "id": result.id,
                "nickname": result.nickname,
                "gender": result.gender,
                "teto_score": result.teto_score,
                "egen_score": result.egen_score,
                "result_type": result.result_type,
                "answers": json.loads(result.answers) if result.answers else [],
                "start_time": result.start_time,
                "end_time": result.end_time,
                "created_at": result.created_at.isoformat() if result.created_at else None
            }
            result_list.append(result_dict)
        
        return result_list
    except Exception as e:
        raise e
    finally:
        db.close()

def get_detailed_stats(db):
    """상세한 통계 정보 조회"""
    try:
        # 전체 통계
        total_results = db.query(TestResult).count()
        
        # 성별별 통계
        male_count = db.query(TestResult).filter(TestResult.gender == 'male').count()
        female_count = db.query(TestResult).filter(TestResult.gender == 'female').count()
        
        # 결과 타입별 통계
        legend_teto_count = db.query(TestResult).filter(TestResult.result_type == 'legend_teto').count()
        teto_count = db.query(TestResult).filter(TestResult.result_type == 'teto').count()
        balance_count = db.query(TestResult).filter(TestResult.result_type == 'balance').count()
        egen_count = db.query(TestResult).filter(TestResult.result_type == 'egen').count()
        legend_egen_count = db.query(TestResult).filter(TestResult.result_type == 'legend_egen').count()
        
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
        raise e
    finally:
        db.close()

# 앱 시작 시 데이터베이스 초기화
init_db()
