from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class AnswerOption(BaseModel):
    text: str
    value: str  # 'teto', 'egen', 'neutral'
    score: int

class Answer(BaseModel):
    questionId: int
    selectedOption: AnswerOption
    value: str
    score: int

class TestResult(BaseModel):
    nickname: str = Field(..., min_length=2, max_length=8)
    gender: str = Field(..., regex="^(male|female)$")
    tetoScore: int = Field(..., ge=0, le=100)
    egenScore: int = Field(..., ge=0, le=100)
    resultType: str
    answers: Optional[List[Answer]] = None
    startTime: Optional[str] = None
    endTime: Optional[str] = None

class TestStats(BaseModel):
    total_tests: int
    teto_percentage: float
    egen_percentage: float
    balance_percentage: float
    male_count: int
    female_count: int