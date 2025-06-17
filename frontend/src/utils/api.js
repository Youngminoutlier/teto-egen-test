const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const submitTestResult = async (testData) => {
  try {
    console.log('API 호출 URL:', `${API_BASE_URL}/api/submit-result`);
    console.log('전송 데이터:', {
      nickname: testData.nickname,
      gender: testData.gender,
      tetoScore: testData.result.tetoScore,
      egenScore: testData.result.egenScore,
      resultType: testData.result.resultType,
      answers: testData.answers,
      startTime: testData.startTime,
      endTime: testData.endTime
    });

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

    console.log('응답 상태:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 오류 응답:', errorText);
      throw new Error(`결과 저장 실패: ${response.status}`);
    }

    const result = await response.json();
    console.log('API 성공 응답:', result);
    return result;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

export const getAllResults = async () => {
  try {
    console.log('결과 조회 API 호출:', `${API_BASE_URL}/api/admin/results`);
    const response = await fetch(`${API_BASE_URL}/api/admin/results`);
    
    if (!response.ok) {
      throw new Error('결과 조회 실패');
    }
    
    const result = await response.json();
    console.log('조회된 결과:', result);
    return result;
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
