from fastapi import APIRouter, HTTPException, Depends
from .models import TestResult, TestStats
from .database import get_db, save_result, get_stats

router = APIRouter()

@router.post("/submit-result", response_model=dict)
async def submit_test_result(result: TestResult):
    """테스트 결과 제출"""
    try:
        db = get_db()
        result_id = save_result(db, result.dict())
        db.close()
        
        return {
            "success": True,
            "message": "결과가 성공적으로 저장되었습니다.",
            "result_id": result_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats", response_model=dict)
async def get_test_stats():
    """테스트 통계 조회"""
    try:
        db = get_db()
        stats = get_stats(db)
        db.close()
        
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))