import React, { useState } from 'react'
import { generateResultImage } from '../utils/generateImage'

const ShareButton = ({ testData }) => {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)

    try {
      // 결과 이미지 생성
      const canvas = generateResultImage(testData)
      
      // 이미지를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'teto-egen-result.png', { type: 'image/png' })
        
        const shareText = `나는 ${testData.result.resultType}! 테토 ${testData.result.tetoScore}% / 에겐 ${testData.result.egenScore}% 🧪`
        const shareUrl = window.location.origin

        // Web Share API 지원 확인 (모바일)
        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: '테토/에겐 테스트 결과',
              text: shareText,
              files: [file],
              url: shareUrl
            })
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.error('공유 실패:', err)
              fallbackShare(canvas, shareText, shareUrl)
            }
          }
        } else {
          // 폴백: 이미지 다운로드 + 텍스트 복사
          fallbackShare(canvas, shareText, shareUrl)
        }
        
        setIsSharing(false)
      }, 'image/png')
    } catch (error) {
      console.error('이미지 생성 실패:', error)
      setIsSharing(false)
    }
  }

  const fallbackShare = async (canvas, shareText, shareUrl) => {
    try {
      // 이미지 다운로드
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'teto-egen-result.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // 클립보드에 텍스트 복사
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        alert('결과 이미지가 다운로드되고 링크가 복사되었습니다!')
      } else {
        alert('결과 이미지가 다운로드되었습니다!')
      }
    } catch (error) {
      console.error('폴백 공유 실패:', error)
      alert('공유에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-blue-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all touch-feedback"
    >
      {isSharing ? (
        <div className="flex items-center justify-center">
          <div className="loading-pulse mr-2">📱</div>
          공유 준비 중...
        </div>
      ) : (
        '📱 결과 공유하기'
      )}
    </button>
  )
}

export default ShareButton