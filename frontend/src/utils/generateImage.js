export const generateResultImage = (resultData) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 인스타그램 스토리 사이즈
  canvas.width = 1080
  canvas.height = 1920

  const { nickname, gender, result } = resultData
  const { tetoScore, egenScore, resultType } = result

  // 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  if (tetoScore > egenScore) {
    gradient.addColorStop(0, '#667eea')  // 테토 블루
    gradient.addColorStop(1, '#764ba2')
  } else if (egenScore > tetoScore) {
    gradient.addColorStop(0, '#f093fb')  // 에겐 핑크
    gradient.addColorStop(1, '#f5576c')
  } else {
    gradient.addColorStop(0, '#667eea')  // 밸런스
    gradient.addColorStop(0.5, '#f093fb')
    gradient.addColorStop(1, '#764ba2')
  }
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 반투명 오버레이
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 텍스트 설정
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 10

  // 메인 타이틀
  ctx.font = 'bold 120px Arial'
  ctx.fillText('테토/에겐 테스트', canvas.width/2, 300)

  // 결과 타이틀
  ctx.font = 'bold 100px Arial'
  ctx.fillText('나는', canvas.width/2, 500)
  
  // 결과 타입 (더 크게)
  ctx.font = 'bold 140px Arial'
  const resultTitle = getResultTitle(resultType, gender)
  ctx.fillText(resultTitle, canvas.width/2, 680)

  // 닉네임
  ctx.font = 'bold 80px Arial'
  ctx.fillText(`${nickname}`, canvas.width/2, 800)

  // 점수 표시
  ctx.font = 'bold 70px Arial'
  ctx.fillText(`테토 ${tetoScore}%`, canvas.width/2, 1000)
  ctx.fillText(`에겐 ${egenScore}%`, canvas.width/2, 1100)

  // 원형 차트 그리기
  drawPieChart(ctx, canvas.width/2, 1350, 200, tetoScore, egenScore)

  // 하단 텍스트
  ctx.font = '50px Arial'
  ctx.fillText('당신도 테스트해보세요!', canvas.width/2, 1600)
  
  ctx.font = '40px Arial'
  ctx.fillText('teto-egen-test.com', canvas.width/2, 1700)

  return canvas
}

const drawPieChart = (ctx, centerX, centerY, radius, tetoScore, egenScore) => {
  const total = tetoScore + egenScore
  if (total === 0) return

  // 테토 부분
  const tetoAngle = (tetoScore / total) * 2 * Math.PI
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + tetoAngle)
  ctx.closePath()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(102, 126, 234, 0.8)'
  ctx.lineWidth = 8
  ctx.stroke()

  // 에겐 부분
  const egenAngle = (egenScore / total) * 2 * Math.PI
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, -Math.PI / 2 + tetoAngle, -Math.PI / 2 + tetoAngle + egenAngle)
  ctx.closePath()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(240, 147, 251, 0.8)'
  ctx.lineWidth = 8
  ctx.stroke()

  // 중앙 원
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()
}

const getResultTitle = (resultType, gender) => {
  const titles = {
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
  
  return titles[gender][resultType] || '알 수 없음'
}