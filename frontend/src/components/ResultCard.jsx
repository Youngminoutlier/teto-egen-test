import React from 'react'
import { getResultText } from '../utils/resultTexts'
import { addParticle } from '../utils/koreanUtils'

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

  // '녀'로 끝나는지 확인하는 함수
  const getEndingParticle = (title) => {
    return title.endsWith('녀') ? '야' : '이야'
  }

  // description을 문장별로 나누는 함수
  const formatDescription = (description) => {
    // 문장 끝 기호들로 분리 (마침표, 느낌표, 물음표 등)
    const sentences = description.split(/(?<=[.!?])\s+/)
    return sentences.map((sentence, index) => (
      <span key={index}>
        {sentence}
        {index < sentences.length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className={`rounded-2xl p-6 text-white ${getGradientClass()}`}>
      {/* 메인 결과 */}
      <div className="text-center mb-6">
        {/* 첫 번째 제목 - 줄바꿈 방지를 위한 텍스트 크기 조절 */}
        <h2 className="font-bold mb-2 result-card-title leading-tight" 
            style={{
              fontSize: `${Math.min(1.5, 20 / (addParticle(nickname) + ' ' + resultText.title + getEndingParticle(resultText.title) + '!').length * 0.8)}rem`
            }}>
          {addParticle(nickname)} {resultText.title}{getEndingParticle(resultText.title)}!
        </h2>
        
        {/* 두 번째 설명 - 문장별 줄바꿈 */}
        <p className="text-base opacity-95 leading-relaxed result-card-text">
          {formatDescription(resultText.description)}
        </p>
      </div>

      {/* 특징 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 result-section-title">🔥 주요 특징</h3>
        <ul className="space-y-2">
          {resultText.traits.map((trait, index) => (
            <li key={index} className="text-sm opacity-95 result-card-text leading-relaxed">
              • {trait}
            </li>
          ))}
        </ul>
      </div>

      {/* 추천 활동 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 result-section-title">💡 추천 활동</h3>
        <ul className="space-y-2">
          {resultText.activities.map((activity, index) => (
            <li key={index} className="text-sm opacity-95 result-card-text leading-relaxed">
              • {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* 연애 스타일 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 result-section-title">💕 연애 스타일</h3>
        <p className="text-sm opacity-95 leading-relaxed result-card-text">
          {formatDescription(resultText.loveStyle)}
        </p>
      </div>

      {/* 직업 적성 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 result-section-title">💼 직업 적성</h3>
        <p className="text-sm opacity-95 leading-relaxed result-card-text">
          {formatDescription(resultText.jobFit)}
        </p>
      </div>

      {/* 마무리 멘트 */}
      <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
        <p className="text-sm leading-relaxed result-card-text">
          {formatDescription(resultText.finalComment)}
        </p>
      </div>
    </div>
  )
}

export default ResultCard
