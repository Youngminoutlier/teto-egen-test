import React from 'react'
import UserInput from '../components/UserInput'

const Home = ({ onStartTest }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 메인 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
            테토/에겐 테스트
          </h1>
          <p className="text-gray-600 text-lg">
            나는 테토남? 에겐녀?<br />
            성향 테스트로 알아보자! 🧪
          </p>
        </div>

        {/* 특징 카드들 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium text-blue-800">테토 성향</div>
            <div className="text-xs text-blue-600">적극적, 도전적</div>
          </div>
          <div className="bg-pink-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">💝</div>
            <div className="text-sm font-medium text-pink-800">에겐 성향</div>
            <div className="text-xs text-pink-600">공감적, 협력적</div>
          </div>
        </div>

        {/* 입력 폼 */}
        <UserInput onStartTest={onStartTest} />

        {/* 하단 설명 */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>⏱️ 약 3분 소요 • 📱 모바일 최적화</p>
          <p className="mt-2">친구들과 함께 테스트해보세요!</p>
        </div>
      </div>
    </div>
  )
}

export default Home