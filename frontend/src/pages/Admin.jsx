import React, { useState, useEffect } from 'react';
import { getDetailedStats, getAllResults } from '../utils/api';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [selectedResult, setSelectedResult] = useState(null);

  const handleLogin = () => {
    if (password === 'president0min') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, resultsData] = await Promise.all([
        getDetailedStats(),
        getAllResults()
      ]);
      setStats(statsData);
      setResults(resultsData.results || []);
    } catch (error) {
      console.error('데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const getResultTypeKorean = (resultType, gender) => {
    const types = {
      male: {
        'legend_teto': '레전드테토남',
        'teto': '테토남',
        'balance': '밸런스남',
        'egen': '에겐남',
        'legend_egen': '레전드에겐남'
      },
      female: {
        'legend_teto': '레전드테토녀',
        'teto': '테토녀',
        'balance': '밸런스녀',
        'egen': '에겐녀',
        'legend_egen': '레전드에겐녀'
      }
    };
    return types[gender]?.[resultType] || resultType;
  };

  const ResultDetailModal = ({ result, onClose }) => {
    if (!result) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">결과 상세보기</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 기본 정보 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">기본 정보</h3>
                <div className="space-y-2">
                  <p><strong>닉네임:</strong> {result.nickname}</p>
                  <p><strong>성별:</strong> {result.gender === 'male' ? '남성' : '여성'}</p>
                  <p><strong>결과:</strong> {getResultTypeKorean(result.result_type, result.gender)}</p>
                  <p><strong>테토 점수:</strong> {result.teto_score}%</p>
                  <p><strong>에겐 점수:</strong> {result.egen_score}%</p>
                </div>
              </div>

              {/* 시간 정보 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">시간 정보</h3>
                <div className="space-y-2">
                  <p><strong>테스트 시작:</strong> {formatDate(result.start_time)}</p>
                  <p><strong>테스트 완료:</strong> {formatDate(result.end_time)}</p>
                  <p><strong>결과 저장:</strong> {formatDate(result.created_at)}</p>
                  <p><strong>소요 시간:</strong> {
                    result.start_time && result.end_time ? 
                    `${Math.round((new Date(result.end_time) - new Date(result.start_time)) / 1000)}초` : 
                    '-'
                  }</p>
                </div>
              </div>
            </div>

            {/* 답변 상세 */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">답변 상세</h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                {result.answers && result.answers.length > 0 ? (
                  <div className="space-y-3">
                    {result.answers.map((answer, index) => (
                      <div key={index} className="border-b pb-2">
                        <p className="font-medium">질문 {answer.questionId}:</p>
                        <p className="text-sm text-gray-600 ml-4">
                          선택: {answer.selectedOption?.text} 
                          ({answer.value}, {answer.score}점)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">답변 데이터가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">🔐 관리자 로그인</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">📊 테토/에겐 테스트 관리자</h1>
            <button
              onClick={fetchData}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              🔄 새로고침
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'stats'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📈 통계
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'results'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 결과 목록
            </button>
          </div>
        </div>

        {/* 통계 탭 */}
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">전체 테스트</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total_tests}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">남성 참여자</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.male_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">여성 참여자</h3>
              <p className="text-3xl font-bold text-pink-600">{stats.female_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">밸런스</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.balance_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">레전드테토</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.legend_teto_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">테토</h3>
              <p className="text-3xl font-bold text-blue-500">{stats.teto_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">에겐</h3>
              <p className="text-3xl font-bold text-pink-500">{stats.egen_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">레전드에겐</h3>
              <p className="text-3xl font-bold text-pink-700">{stats.legend_egen_count}</p>
            </div>
          </div>
        )}

        {/* 결과 목록 탭 */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">테스트 결과 목록 ({results.length}개)</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">닉네임</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">성별</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">결과</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">점수</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">완료 시간</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상세</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.nickname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.gender === 'male' ? '👨 남성' : '👩 여성'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getResultTypeKorean(result.result_type, result.gender)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        테토 {result.teto_score}% / 에겐 {result.egen_score}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(result.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedResult(result)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                        >
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {results.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  아직 테스트 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 결과 상세 모달 */}
        <ResultDetailModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      </div>
    </div>
  );
};

export default Admin;
