import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserInput = ({ onStartTest }) => {
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!nickname.trim() || !gender) {
      alert('닉네임과 성별을 모두 입력해주세요!')
      return
    }

    if (nickname.length < 2 || nickname.length > 8) {
      alert('닉네임은 2-8자로 입력해주세요!')
      return
    }

    setIsLoading(true)

    // 햅틱 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // 테스트 데이터 초기화
    const testData = {
      nickname: nickname.trim(),
      gender,
      answers: [],
      currentQuestion: 0,
      completed: false,
      startTime: new Date().toISOString()
    }

    onStartTest(testData)
    
    setTimeout(() => {
      navigate('/test')
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <form onSubmit={handleSubmit}>
        {/* 닉네임 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            닉네임 (2-8자)
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="예: 테토영민"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            maxLength={8}
            disabled={isLoading}
          />
        </div>

        {/* 성별 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            성별
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`p-4 rounded-lg border-2 transition-all touch-feedback ${
                gender === 'male'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={isLoading}
            >
              <div className="text-2xl mb-1">👨</div>
              <div className="font-medium">남성</div>
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`p-4 rounded-lg border-2 transition-all touch-feedback ${
                gender === 'female'
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={isLoading}
            >
              <div className="text-2xl mb-1">👩</div>
              <div className="font-medium">여성</div>
            </button>
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          type="submit"
          disabled={!nickname.trim() || !gender || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-blue-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all touch-feedback"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loading-pulse mr-2">⏳</div>
              테스트 시작 중...
            </div>
          ) : (
            '🚀 테스트 시작하기'
          )}
        </button>
      </form>
    </div>
  )
}

export default UserInput
