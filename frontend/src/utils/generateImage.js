export const generateResultImage = (resultData) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 인스타그램 스토리 사이즈
  canvas.width = 1080
  canvas.height = 1920

  const { nickname, gender, result } = resultData
  const { tetoScore, egenScore, resultType } = result

  // 더 세련된 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  if (tetoScore > egenScore) {
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(0.5, '#764ba2')
    gradient.addColorStop(1, '#2D3748')
  } else if (egenScore > tetoScore) {
    gradient.addColorStop(0, '#f093fb')
    gradient.addColorStop(0.5, '#f5576c')
    gradient.addColorStop(1, '#2D3748')
  } else {
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(0.3, '#764ba2')
    gradient.addColorStop(0.7, '#f093fb')
    gradient.addColorStop(1, '#2D3748')
  }
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 미묘한 패턴 오버레이
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.02})`
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, 2 * Math.PI)
    ctx.fill()
  }

  // 텍스트 설정
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'

  // 상단 로고/제목 영역 - 더 미니멀하게
  drawTopSection(ctx, canvas)
  
  // 메인 결과 영역 - 카드 스타일로 개선
  drawMainResult(ctx, canvas, nickname, resultType, gender)
  
  // 점수 표시 영역 - 더 깔끔하게
  drawScoreSection(ctx, canvas, tetoScore, egenScore)
  
  // 미니멀한 차트
  drawMinimalChart(ctx, canvas.width/2, 1200, 160, tetoScore, egenScore)
  
  // 하단 CTA 영역 - 더 세련되게
  drawBottomSection(ctx, canvas)

  return canvas
}

// 상단 섹션 - 더 미니멀하게
const drawTopSection = (ctx, canvas) => {
  // 심플한 아이콘
  ctx.font = '50px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillText('🔥', canvas.width/2 - 50, 160)
  ctx.fillText('🌸', canvas.width/2 + 50, 160)
  
  // 메인 타이틀 - 더 심플한 폰트
  ctx.font = 'bold 64px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText('테토 · 에겐 테스트', canvas.width/2, 240)
  
  // 서브타이틀 - 크기와 위치 조정
  ctx.font = '40px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.fillText('나의 성향은?', canvas.width/2, 310)
}

// 메인 결과 섹션 - 더 세련된 카드
const drawMainResult = (ctx, canvas, nickname, resultType, gender) => {
  // 메인 카드 배경
  ctx.shadowBlur = 40
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.roundRect(80, 380, canvas.width - 160, 280, 25)
  ctx.fill()
  
  ctx.shadowBlur = 0
  
  // 결과 타입에 따른 색상 결정
  const resultTitle = getResultTitle(resultType, gender)
  let textColor = '#2D3748' // 기본 색상
  
  if (resultType.includes('teto')) {
    textColor = '#4C51BF' // 테토 계열 - 깊은 보라
  } else if (resultType.includes('egen')) {
    textColor = '#D53F8C' // 에겐 계열 - 깊은 핑크
  } else if (resultType === 'balance') {
    textColor = '#2D3748' // 밸런스 - 기본 회색
  }
  
  // 결과 타입 (메인) - 강조, 크기 증가, 폰트 웨이트 증가
  ctx.font = '900 100px Pretendard, Arial'
  ctx.fillStyle = textColor
  ctx.fillText(resultTitle, canvas.width/2, 500)
  
  // 구분선
  ctx.strokeStyle = 'rgba(45, 55, 72, 0.2)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(200, 540)
  ctx.lineTo(canvas.width - 200, 540)
  ctx.stroke()
  
  // 닉네임
  ctx.font = 'bold 48px Pretendard, Arial'
  ctx.fillStyle = '#4A5568'
  ctx.fillText(`${nickname}님`, canvas.width/2, 600)
}

// 점수 섹션 - 더 깔끔한 디자인
const drawScoreSection = (ctx, canvas, tetoScore, egenScore) => {
  const centerY = 900
  const spacing = 320  // 280에서 320으로 증가
  
  // 테토 점수
  drawScoreCard(ctx, canvas.width/2 - spacing/2, centerY, '🔥', '테토', tetoScore, '#667eea')
  
  // VS 텍스트
  ctx.font = 'bold 40px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillText('VS', canvas.width/2, centerY + 10)
  
  // 에겐 점수
  drawScoreCard(ctx, canvas.width/2 + spacing/2, centerY, '🌸', '에겐', egenScore, '#f093fb')
}

// 개별 점수 카드
const drawScoreCard = (ctx, centerX, centerY, emoji, label, score, color) => {
  // 카드 배경 - 높이 증가
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.roundRect(centerX - 100, centerY - 100, 200, 160, 15)
  ctx.fill()
  
  // 이모지
  ctx.font = '32px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(emoji, centerX, centerY - 45)
  
  // 라벨
  ctx.font = 'bold 28px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(label, centerX, centerY - 5)
  
  // 점수
  ctx.font = 'bold 36px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(`${score}%`, centerX, centerY + 40)
}

// 미니멀한 차트
const drawMinimalChart = (ctx, centerX, centerY, radius, tetoScore, egenScore) => {
  const total = tetoScore + egenScore
  if (total === 0) return

  // 배경 원 (얇은 테두리)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius + 3, 0, 2 * Math.PI)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.lineWidth = 6
  ctx.stroke()

  // 테토 부분
  const tetoAngle = (tetoScore / total) * 2 * Math.PI
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + tetoAngle)
  ctx.strokeStyle = '#667eea'
  ctx.lineWidth = 12
  ctx.stroke()

  // 에겐 부분
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, -Math.PI / 2 + tetoAngle, -Math.PI / 2 + tetoAngle + (egenScore / total) * 2 * Math.PI)
  ctx.strokeStyle = '#f093fb'
  ctx.lineWidth = 12
  ctx.stroke()

  // 중앙 흰색 원
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.fill()
  
  // 중앙 아이콘
  ctx.font = '48px Arial'
  ctx.fillStyle = '#4A5568'
  if (tetoScore > egenScore) {
    ctx.fillText('🔥', centerX, centerY + 12)
  } else if (egenScore > tetoScore) {
    ctx.fillText('🌸', centerX, centerY + 12)
  } else {
    ctx.fillText('⚖️', centerX, centerY + 12)
  }
}

// 하단 섹션 - 더 세련되게
const drawBottomSection = (ctx, canvas) => {
  // CTA 카드 - 높이 증가
  ctx.shadowBlur = 30
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.roundRect(80, 1420, canvas.width - 160, 260, 20)
  ctx.fill()
  
  ctx.shadowBlur = 0
  
  // CTA 텍스트
  ctx.font = 'bold 52px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText('당신도 테스트해보세요!', canvas.width/2, 1500)
  
  // 장식 아이콘 - 간격 조정
  ctx.font = '36px Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillText('✨ 🎯 ✨', canvas.width/2, 1560)
  
  // URL - 간격 조정
  ctx.font = 'bold 40px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillText('teto-egen-test.com', canvas.width/2, 1620)
  
  // 하단 크레딧
  ctx.font = '28px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('made by @0_min._.00', canvas.width/2, 1750)
}

// roundRect 함수 추가 (Canvas API에 없는 경우)
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    this.beginPath()
    this.moveTo(x + radius, y)
    this.lineTo(x + width - radius, y)
    this.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.lineTo(x + width, y + height - radius)
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.lineTo(x + radius, y + height)
    this.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.lineTo(x, y + radius)
    this.quadraticCurveTo(x, y, x + radius, y)
    this.closePath()
  }
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
