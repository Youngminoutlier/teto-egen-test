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

  // 결과 타입 결정 - 더 엄격한 밸런스 기준
  let resultType
  if (adjustedTetoPercentage >= 80) {
    resultType = 'legend_teto'  // 테토 80% 이상
  } else if (adjustedTetoPercentage >= 65) {
    resultType = 'teto'         // 테토 65-79%
  } else if (adjustedTetoPercentage >= 45 && adjustedTetoPercentage <= 55) {
    resultType = 'balance'      // 테토 45-55% (차이 10% 이내)
  } else if (adjustedEgenPercentage >= 65) {
    resultType = 'egen'         // 에겐 65% 이상 (= 테토 35% 미만)
  } else if (adjustedEgenPercentage >= 80) {
    resultType = 'legend_egen'  // 에겐 80% 이상
  } else {
    // 45% 미만 55% 초과 65% 미만인 애매한 구간
    if (adjustedTetoPercentage > 55) {
      resultType = 'teto'       // 테토 56-64%
    } else {
      resultType = 'egen'       // 에겐 56-64%
    }
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
