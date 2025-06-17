const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const submitTestResult = async (testData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/submit-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: testData.nickname,
        gender: testData.gender,
        tetoScore: testData.result.tetoScore,
        egenScore: testData.result.egenScore,
        resultType: testData.result.resultType,
        answers: testData.answers,
        startTime: testData.startTime,
        endTime: testData.endTime
      }),
    });

    if (!response.ok) {
      throw new Error('결과 저장 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    if (!response.ok) {
      throw new Error('통계 조회 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('통계 조회 오류:', error);
    throw error;
  }
};

export const getAllResults = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/results`);
    if (!response.ok) {
      throw new Error('결과 조회 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('결과 조회 오류:', error);
    throw error;
  }
};

export const getDetailedStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/stats`);
    if (!response.ok) {
      throw new Error('상세 통계 조회 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('상세 통계 조회 오류:', error);
    throw error;
  }
};
