export const generateResultImage = (resultData) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 인스타그램 스토리 사이즈
  canvas.width = 1080
  canvas.height = 1920

  const { nickname, gender, result } = resultData
  const { tetoScore, egenScore, resultType } = result

  // 배경 그라데이션 - 더 세련된 색상
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  if (tetoScore > egenScore) {
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(0.5, '#764ba2')
    gradient.addColorStop(1, '#4c51bf')
  } else if (egenScore > tetoScore) {
    gradient.addColorStop(0, '#f093fb')
    gradient.addColorStop(0.5, '#f5576c')
    gradient.addColorStop(1, '#e91e63')
  } else {
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(0.3, '#764ba2')
    gradient.addColorStop(0.7, '#f093fb')
    gradient.addColorStop(1, '#f5576c')
  }
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 반투명 오버레이와 노이즈 효과
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 텍스트 설정
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetY = 4

  // 상단 로고/제목 영역
  drawTopSection(ctx, canvas)
  
  // 메인 결과 영역
  drawMainResult(ctx, canvas, nickname, resultType, gender)
  
  // 점수 표시 영역
  drawScoreSection(ctx, canvas, tetoScore, egenScore)
  
  // 원형 차트
  drawModernChart(ctx, canvas.width/2, 1200, 180, tetoScore, egenScore)
  
  // 하단 CTA 영역
  drawBottomSection(ctx, canvas)

  return canvas
}

// 상단 섹션
const drawTopSection = (ctx, canvas) => {
  // 작은 아이콘들
  ctx.font = '60px Arial'
  ctx.fillText('🧪', canvas.width/2 - 80, 180)
  ctx.fillText('⚡', canvas.width/2, 180)
  ctx.fillText('💕', canvas.width/2 + 80, 180)
  
  // 메인 타이틀
  ctx.font = 'bold 72px Pretendard, Arial'
  ctx.fillText('테토/에겐 테스트', canvas.width/2, 280)
}

// 메인 결과 섹션
const drawMainResult = (ctx, canvas, nickname, resultType, gender) => {
  // 배경 카드
  ctx.shadowBlur = 30
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.roundRect(80, 380, canvas.width - 160, 300, 30)
  ctx.fill()
  
  ctx.shadowBlur = 0
  
  // "나는" 텍스트
  ctx.font = 'bold 80px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillText('나는', canvas.width/2, 480)
  
  // 결과 타입 (메인)
  ctx.font = 'bold 110px Pretendard, Arial'
  ctx.fillStyle = 'white'
  const resultTitle = getResultTitle(resultType, gender)
  ctx.fillText(resultTitle, canvas.width/2, 590)
  
  // 닉네임
  ctx.font = 'bold 70px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.fillText(nickname, canvas.width/2, 660)
}

// 점수 섹션
const drawScoreSection = (ctx, canvas, tetoScore, egenScore) => {
  const leftX = canvas.width/2 - 200
  const rightX = canvas.width/2 + 200
  const y = 900
  
  // 테토 점수 카드
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.roundRect(leftX - 120, y - 80, 240, 120, 20)
  ctx.fill()
  
  ctx.font = 'bold 45px Pretendard, Arial'
  ctx.fillStyle = '#8B93FF'
  ctx.fillText('테토', leftX, y - 25)
  ctx.font = 'bold 60px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(`${tetoScore}%`, leftX, y + 35)
  
  // 에겐 점수 카드
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.roundRect(rightX - 120, y - 80, 240, 120, 20)
  ctx.fill()
  
  ctx.font = 'bold 45px Pretendard, Arial'
  ctx.fillStyle = '#FF8FB3'
  ctx.fillText('에겐', rightX, y - 25)
  ctx.font = 'bold 60px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(`${egenScore}%`, rightX, y + 35)
  
  // VS 텍스트
  ctx.font = 'bold 50px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillText('VS', canvas.width/2, y + 10)
}

// 모던한 원형 차트
const drawModernChart = (ctx, centerX, centerY, radius, tetoScore, egenScore) => {
  const total = tetoScore + egenScore
  if (total === 0) return

  // 배경 원
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.fill()

  // 테토 부분
  const tetoAngle = (tetoScore / total) * 2 * Math.PI
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + tetoAngle)
  ctx.closePath()
  
  const tetoGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
  tetoGradient.addColorStop(0, 'rgba(139, 147, 255, 0.9)')
  tetoGradient.addColorStop(1, 'rgba(102, 126, 234, 0.7)')
  ctx.fillStyle = tetoGradient
  ctx.fill()

  // 에겐 부분
  const egenAngle = (egenScore / total) * 2 * Math.PI
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, -Math.PI / 2 + tetoAngle, -Math.PI / 2 + tetoAngle + egenAngle)
  ctx.closePath()
  
  const egenGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
  egenGradient.addColorStop(0, 'rgba(255, 143, 179, 0.9)')
  egenGradient.addColorStop(1, 'rgba(240, 147, 251, 0.7)')
  ctx.fillStyle = egenGradient
  ctx.fill()

  // 중앙 흰색 원
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()
  
  // 중앙 아이콘
  ctx.font = 'bold 60px Arial'
  ctx.fillStyle = '#666'
  ctx.fillText('🧪', centerX, centerY + 15)
}

// 하단 섹션
const drawBottomSection = (ctx, canvas) => {
  // CTA 배경
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.roundRect(100, 1450, canvas.width - 200, 200, 25)
  ctx.fill()
  
  // CTA 텍스트
  ctx.font = 'bold 65px Pretendard, Arial'
  ctx.fillStyle = 'white'
  ctx.fillText('당신도 테스트해보세요!', canvas.width/2, 1520)
  
  // 이모지 장식
  ctx.font = '50px Arial'
  ctx.fillText('✨ 🎯 ✨', canvas.width/2, 1580)
  
  // URL
  ctx.font = 'bold 50px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillText('teto-egen-test.com', canvas.width/2, 1630)
  
  // 하단 장식
  ctx.font = '40px Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('• • •', canvas.width/2, 1750)
  
  // 제작자 크레딧
  ctx.font = '35px Pretendard, Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.fillText('made by @0_min._.00', canvas.width/2, 1820)
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
