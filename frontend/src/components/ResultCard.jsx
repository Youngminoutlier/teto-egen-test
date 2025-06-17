import React from 'react'
import { getResultText } from '../utils/resultTexts'

const ResultCard = ({ testData }) => {
  const { nickname, gender, result } = testData
  const { resultType, tetoScore, egenScore } = result
  
  const resultText = getResultText(resultType, gender, nickname)

  const getGradientClass = () => {
    if (tetoScore > egenScore) {
      return 'result-gradient-teto'
    } else if (egenScore > tetoScore) {
      return 'result-gradient-egen'
    } else {
      return 'result-gradient-balance'
    }
  }

  return (
    <div className={`rounded-2xl p-6 text-white ${getGradientClass()}`}>
      {/* 메인 결과 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {nickname}는 {resultText.title}이야!
        </h2>
        <p className="text-lg opacity-90 leading-relaxed">
          {resultText.description}
        </p>
      </div>

      {/* 특징 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">🔥 주요 특징</h3>
        <ul className="space-y-2">
          {resultText.traits.map((trait, index) => (
            <li key={index} className="text-sm opacity-90">
              • {trait}
            </li>
          ))}
        </ul>
      </div>

      {/* 추천 활동 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">💡 추천 활동</h3>
        <ul className="space-y-2">
          {resultText.activities.map((activity, index) => (
            <li key={index} className="text-sm opacity-90">
              • {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* 연애 스타일 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">💕 연애 스타일</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          {resultText.loveStyle}
        </p>
      </div>

      {/* 직업 적성 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">💼 직업 적성</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          {resultText.jobFit}
        </p>
      </div>

      {/* 마무리 멘트 */}
      <div className="bg-white bg-opacity-20 rounded-lg p-4">
        <p className="text-sm leading-relaxed">
          {resultText.finalComment}
        </p>
      </div>
    </div>
  )
}

export default ResultCard