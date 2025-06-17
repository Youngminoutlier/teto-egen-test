import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Result from './pages/Result'

const App = () => {
  const [testData, setTestData] = useState(() => {
    const saved = localStorage.getItem('tetoEgenTestData')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (testData) {
      localStorage.setItem('tetoEgenTestData', JSON.stringify(testData))
    }
  }, [testData])

  const resetTest = () => {
    setTestData(null)
    localStorage.removeItem('tetoEgenTestData')
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
              <Navigate to="/" />
            } 
          />
          <Route 
            path="/result" 
            element={
              testData && testData.completed ? 
              <Result testData={testData} onRestart={resetTest} /> : 
              <Navigate to="/" />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App