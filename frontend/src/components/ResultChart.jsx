import React, { useEffect, useRef } from 'react'

const ResultChart = ({ tetoScore, egenScore, size = 200 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 20

    // Canvas 초기화
    ctx.clearRect(0, 0, size, size)

    // 배경 원
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#f3f4f6'
    ctx.fill()

    // 테토 부분 (파란색)
    const tetoAngle = (tetoScore / 100) * 2 * Math.PI
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + tetoAngle)
    ctx.closePath()
    ctx.fillStyle = '#667eea'
    ctx.fill()

    // 에겐 부분 (핑크색)
    const egenAngle = (egenScore / 100) * 2 * Math.PI
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, -Math.PI / 2 + tetoAngle, -Math.PI / 2 + tetoAngle + egenAngle)
    ctx.closePath()
    ctx.fillStyle = '#f093fb'
    ctx.fill()

    // 중앙 흰색 원 (도넛 모양)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()

    // 중앙 텍스트
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('VS', centerX, centerY + 5)

  }, [tetoScore, egenScore, size])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="mb-4"
      />
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium">테토 {tetoScore}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
          <span className="text-sm font-medium">에겐 {egenScore}%</span>
        </div>
      </div>
    </div>
  )
}

export default ResultChart