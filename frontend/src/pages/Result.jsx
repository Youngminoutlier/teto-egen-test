import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultChart from '../components/ResultChart'
import ResultCard from '../components/ResultCard'
import ShareButton from '../components/ShareButton'
+ import { addParticle } from '../utils/koreanUtils'

const Result = ({ testData, onRestart }) => {
  const navigate = useNavigate()

  useEffect(() => {
    // 결과 페이지 진입 시 햅틱 피드백
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100])
    }
  }, [])

  const handleRestart = () => {
    onRestart()
    navigate('/')
  }

  if (!testData || !testData.result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">결과를 불러올 수 없습니다.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md w-full mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎉 테스트 완료!
          </h1>
          <p className="text-gray-600">
            {testData.nickname}님의 결과가 나왔어요
          </p>
        </div>

        {/* 결과 차트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <ResultChart 
            tetoScore={testData.result.tetoScore}
            egenScore={testData.result.egenScore}
            size={250}
          />
        </div>

        {/* 결과 상세 */}
        <div className="mb-6">
          <ResultCard testData={testData} />
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          {/* 공유 버튼 */}
          <ShareButton testData={testData} />
          
          {/* 다시하기 버튼 */}
          <button
            onClick={handleRestart}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-lg text-lg hover:border-gray-400 hover:bg-gray-50 transition-all touch-feedback"
          >
            🔄 다시 테스트하기
          </button>
          
          {/* 홈으로 버튼 */}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-all touch-feedback"
          >
            🏠 홈으로 돌아가기
          </button>
        </div>

        {/* 하단 설명 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>친구들과 함께 테스트해보고</p>
          <p>서로의 결과를 비교해보세요! 🤝</p>
+         <p className="mt-4 text-xs text-gray-400">
+           만든 사람 : @0_min._.00
+         </p>
        </div>
      </div>
    </div>
  )
}

export default Result
