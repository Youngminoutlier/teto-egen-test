import React, { useState, useEffect } from 'react';
import { getStats } from '../utils/api';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // 간단한 비밀번호 확인 (실제로는 더 보안적인 방법 사용)
    if (password === 'president0min') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('통계 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">관리자 로그인</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full p-3 border rounded-lg mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">테토/에겐 테스트 통계</h1>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">전체 테스트 수</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total_tests}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">남성 참여자</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.male_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">여성 참여자</h3>
              <p className="text-3xl font-bold text-pink-600">{stats.female_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">테토 성향</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.teto_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">에겐 성향</h3>
              <p className="text-3xl font-bold text-pink-600">{stats.egen_count}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">밸런스</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.balance_count}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={fetchStats}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          새로고침
        </button>
      </div>
    </div>
  );
};

export default Admin;
