import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TestQuestion from '../components/TestQuestion'
import { QUESTIONS } from '../utils/questions'
import { calculateResult } from '../utils/calculateResult'
import { submitTestResult } from '../utils/api'

const Test = ({ testData, setTestData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(testData.currentQuestion)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleAnswer = async (answer) => {
    setIsLoading(true)

    // 답변 저장
    const newAnswers = [...testData.answers, answer]
    const nextQuestion = currentQuestion + 1

    if (nextQuestion >= QUESTIONS.length) {
      // 테스트 완료 - 결과 계산
      const result = calculateResult(newAnswers, testData.gender)
      
      const completedTestData = {
        ...testData,
        answers: newAnswers,
        currentQuestion: nextQuestion,
        completed: true,
        result,
        endTime: new Date().toISOString()
      }

      // 즉시 localStorage에 저장 (카카오톡 대응)
      try {
        localStorage.setItem('tetoEgenTestData', JSON.stringify(completedTestData))
        console.log('결과 데이터 즉시 저장됨')
      } catch (error) {
        console.error('localStorage 저장 실패:', error)
      }

      // 상태 업데이트
      setTestData(completedTestData)

      // 백엔드 저장 (비동기, 실패해도 상관없음)
      submitTestResult(completedTestData).catch(error => {
        console.warn('서버 저장 실패:', error)
      })

      // 결과 페이지로 이동 - 조금 더 긴 지연
      setTimeout(() => {
        console.log('결과 페이지로 이동 시도')
        navigate('/result')
      }, 1500) // 1.5초로 증가

    } else {
      // 다음 질문으로
      const updatedTestData = {
        ...testData,
        answers: newAnswers,
        currentQuestion: nextQuestion
      }
      
      // 중간 상태도 저장
      try {
        localStorage.setItem('tetoEgenTestData', JSON.stringify(updatedTestData))
      } catch (error) {
        console.error('중간 저장 실패:', error)
      }
      
      setTestData(updatedTestData)
      setCurrentQuestion(nextQuestion)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {currentQuestion < QUESTIONS.length ? (
        <TestQuestion
          question={QUESTIONS[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={QUESTIONS.length}
          onAnswer={handleAnswer}
          isLoading={isLoading}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">🧪</div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                테스트 완료!
              </h2>
              <p className="text-gray-600 mb-6 font-medium">
                {testData.nickname}님의 결과를 분석하고 있어요...
              </p>
              <div className="loading-pulse">
                <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Test
