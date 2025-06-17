export const calculateResult = (answers, gender) => {
  let tetoScore = 0
  let egenScore = 0
  let totalQuestions = answers.length

  // 점수 계산
  answers.forEach(answer => {
    if (answer.value === 'teto') {
      tetoScore += answer.score
    } else if (answer.value === 'egen') {
      egenScore += answer.score
    }
  })

  // 최대 점수로 정규화 (백분율)
  const maxPossibleScore = totalQuestions * 3 // 최대 점수는 질문당 3점
  const tetoPercentage = Math.round((tetoScore / maxPossibleScore) * 100)
  const egenPercentage = Math.round((egenScore / maxPossibleScore) * 100)
  
  // 밸런스 조정 (총합이 100%가 되도록)
  const total = tetoPercentage + egenPercentage
  const adjustedTetoPercentage = total > 0 ? Math.round((tetoPercentage / total) * 100) : 50
  const adjustedEgenPercentage = 100 - adjustedTetoPercentage

  // 결과 타입 결정
  let resultType
  if (adjustedTetoPercentage >= 80) {
    resultType = gender === 'male' ? 'legend_teto' : 'legend_teto'
  } else if (adjustedTetoPercentage >= 60) {
    resultType = gender === 'male' ? 'teto' : 'teto'
  } else if (adjustedTetoPercentage >= 40) {
    resultType = gender === 'male' ? 'balance' : 'balance'
  } else if (adjustedEgenPercentage >= 60) {
    resultType = gender === 'male' ? 'egen' : 'egen'
  } else {
    resultType = gender === 'male' ? 'legend_egen' : 'legend_egen'
  }

  return {
    tetoScore: adjustedTetoPercentage,
    egenScore: adjustedEgenPercentage,
    resultType,
    gender
  }
}

export const RESULT_TYPES = {
  male: {
    'legend_teto': '레전드테토남',
    'teto': '테토남',
    'balance': '밸런스남',
    'egen': '에겐남',
    'legend_egen': '레전드에겐남'
  },
  female: {
    'legend_teto': '레전드테토녀',
    'teto': '테토녀',
    'balance': '밸런스녀',
    'egen': '에겐녀',
    'legend_egen': '레전드에겐녀'
  }
}

export const getResultTitle = (resultType, gender) => {
  return RESULT_TYPES[gender][resultType] || '알 수 없음'
}