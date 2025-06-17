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

      setTestData(completedTestData)

      // 백엔드에 결과 저장 (실패해도 계속 진행)
      try {
        await submitTestResult(completedTestData);
        console.log('결과가 서버에 저장되었습니다.');
      } catch (error) {
        console.warn('서버 저장 실패 (로컬 저장은 정상):', error);
      }

      // 결과 페이지로 이동 (약간의 지연 후)
      setTimeout(() => {
        navigate('/result')
      }, 1000)
    } else {
      // 다음 질문으로
      const updatedTestData = {
        ...testData,
        answers: newAnswers,
        currentQuestion: nextQuestion
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
              <p className="text-gray-600 mb-6">
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
