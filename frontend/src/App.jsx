import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Result from './pages/Result'

const App = () => {
  const [testData, setTestData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // localStorage에서 데이터 복원 - 더 안전하게
  useEffect(() => {
    const restoreTestData = () => {
      try {
        const saved = localStorage.getItem('tetoEgenTestData')
        if (saved) {
          const parsedData = JSON.parse(saved)
          console.log('복원된 테스트 데이터:', parsedData)
          setTestData(parsedData)
        }
      } catch (error) {
        console.error('localStorage 데이터 복원 실패:', error)
        localStorage.removeItem('tetoEgenTestData')
      } finally {
        setIsLoading(false)
      }
    }

    // 약간의 지연을 두고 복원 (카카오톡 인앱브라우저 대응)
    setTimeout(restoreTestData, 100)
  }, [])

  // 테스트 데이터 저장 - 더 안전하게
  useEffect(() => {
    if (testData) {
      try {
        localStorage.setItem('tetoEgenTestData', JSON.stringify(testData))
        console.log('테스트 데이터 저장됨:', testData)
      } catch (error) {
        console.error('localStorage 저장 실패:', error)
      }
    }
  }, [testData])

  const resetTest = () => {
    setTestData(null)
    localStorage.removeItem('tetoEgenTestData')
  }

  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <Routes>
          <Route 
            path="/" 
            element={<Home onStartTest={setTestData} />} 
          />
          <Route 
            path="/test" 
            element={
              testData && !testData.completed ? 
              <Test testData={testData} setTestData={setTestData} /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/result" 
            element={
              testData && testData.completed ? 
              <Result testData={testData} onRestart={resetTest} /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/admin" 
            element={<Admin />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
