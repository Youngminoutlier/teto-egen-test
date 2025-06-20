from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from datetime import datetime

from .database import get_db, save_result, get_all_results, init_db
from .models import TestResult

app = FastAPI(
    title="테토/에겐 테스트 API",
    description="성별을 반영한 테스토스테론/에스트로겐 성향 테스트 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://teto-egen-test.pages.dev",
        "https://*.pages.dev",
        "https://*.cloudflare.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 앱 시작 시 데이터베이스 초기화
@app.on_event("startup")
async def startup_event():
    """앱 시작 시 데이터베이스 초기화"""
    try:
        init_db()
        print("데이터베이스 초기화가 완료되었습니다.")
    except Exception as e:
        print(f"데이터베이스 초기화 실패: {e}")

@app.get("/")
async def health_check():
    """헬스체크 엔드포인트"""
    return {
        "status": "ok",
        "message": "테토/에겐 테스트 API 서버가 정상 작동 중입니다.",
        "timestamp": datetime.now().isoformat(),
        "database": "PostgreSQL" if os.getenv('DATABASE_URL', '').startswith('postgres') else "SQLite"
    }

@app.get("/api/health")
async def api_health():
    """API 헬스체크"""
    return {
        "status": "healthy", 
        "service": "teto-egen-test",
        "database_connected": True
    }

@app.get("/api/questions")
async def get_questions():
    """테스트 질문 목록 반환 (클라이언트에서 관리하므로 간단히)"""
    return {
        "message": "질문 데이터는 클라이언트에서 관리됩니다.",
        "total_questions": 20
    }

@app.post("/api/submit-result")
async def submit_result(result: TestResult):
    """테스트 결과 저장 (통계용)"""
    try:
        db = get_db()
        result_id = save_result(db, result.dict())
        db.close()
        
        return {
            "success": True,
            "message": "결과가 저장되었습니다.",
            "result_id": result_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"결과 저장 실패: {str(e)}")

@app.get("/api/stats")
async def get_stats():
    """간단한 통계 정보 (선택사항)"""
    try:
        db = get_db()
        
        # PostgreSQL과 SQLite 호환 쿼리
        database_url = os.getenv('DATABASE_URL', '')
        if database_url.startswith('postgres://') or database_url.startswith('postgresql://'):
            with db.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) as count FROM test_results")
                total_results = cursor.fetchone()['count']
        else:
            cursor = db.execute("SELECT COUNT(*) FROM test_results")
            total_results = cursor.fetchone()[0]
        
        db.close()
        
        return {
            "total_tests": total_results,
            "message": "통계 정보"
        }
    except Exception as e:
        return {"total_tests": 0, "message": f"통계를 불러올 수 없습니다: {str(e)}"}

@app.get("/api/admin/results")
async def get_all_test_results():
    """모든 테스트 결과 조회 (관리자용)"""
    try:
        print("=== 관리자 결과 조회 시작 ===")
        db = get_db()
        
        # 먼저 NULL created_at 수정
        from .database import fix_null_created_at
        fix_null_created_at(db)
        
        results = get_all_results(db)
        db.close()
        
        print(f"조회된 결과 개수: {len(results)}")
        if results:
            print(f"첫 번째 결과 샘플: {results[0]}")
        
        return {
            "success": True,
            "results": results
        }
    except Exception as e:
        print(f"결과 조회 오류: {e}")
        raise HTTPException(status_code=500, detail=f"결과 조회 실패: {str(e)}")

@app.get("/api/admin/stats")
async def get_detailed_stats():
    """상세한 통계 정보 (관리자용)"""
    try:
        db = get_db()
        
        # get_detailed_stats 함수 사용
        from .database import get_detailed_stats
        stats = get_detailed_stats(db)
        
        db.close()
        
        return stats
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"통계 조회 실패: {str(e)}")

@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "요청한 엔드포인트를 찾을 수 없습니다."}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "서버 내부 오류가 발생했습니다."}
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
