import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

const TestQuestion = ({ question, questionNumber, totalQuestions, onAnswer, isLoading }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswerSelect = (answerIndex) => {
    if (isLoading) return

    setSelectedAnswer(answerIndex)
    
    // 햅틱 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // 답변 저장하고 다음 질문으로
    setTimeout(() => {
      onAnswer({
        questionId: question.id,
        selectedOption: question.options[answerIndex],
        value: question.options[answerIndex].value,
        score: question.options[answerIndex].score
      })
      setSelectedAnswer(null)
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        {/* 진행률 표시 */}
        <ProgressBar current={questionNumber} total={totalQuestions} />
        
        {/* 질문 카드 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">
              {questionNumber} / {totalQuestions}
            </div>
            <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
              {question.text}
            </h2>
          </div>

          {/* 답변 선택지 */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isLoading || selectedAnswer !== null}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 touch-feedback ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-700 transform scale-95'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${
                  isLoading || selectedAnswer !== null
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="text-center">
            <div className="loading-pulse text-gray-500">
              다음 질문 준비 중...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestQuestion