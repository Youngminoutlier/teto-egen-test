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
        
        // 결과 텍스트와 URL을 하나의 메시지로 합치기
        const resultTypeKorean = getResultTypeKorean(testData.result.resultType, testData.gender)
        const shareText = `나는 ${resultTypeKorean}! 테토 ${testData.result.tetoScore}% vs 에겐 ${testData.result.egenScore}% 🧪

너도 테스트해보셈 ㅋ ➡️ ${window.location.origin}`

        // Web Share API 지원 확인 (모바일)
        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: '테토/에겐 테스트 결과',
              text: shareText,
              files: [file]
              // url을 별도로 전달하지 않고 text에 포함
            })
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.error('공유 실패:', err)
              fallbackShare(canvas, shareText)
            }
          }
        } else {
          // 폴백: 이미지 다운로드 + 텍스트 복사
          fallbackShare(canvas, shareText)
        }
        
        setIsSharing(false)
      }, 'image/png')
    } catch (error) {
      console.error('이미지 생성 실패:', error)
      setIsSharing(false)
    }
  }

  const fallbackShare = async (canvas, shareText) => {
    try {
      // 이미지 다운로드
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'teto-egen-result.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // 클립보드에 텍스트 복사 (URL 포함)
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        alert('결과 이미지가 다운로드되고 텍스트가 복사되었습니다!\n카카오톡에 붙여넣기 하세요.')
      } else {
        // 클립보드 API가 지원되지 않는 경우
        const textArea = document.createElement('textarea')
        textArea.value = shareText
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('결과 이미지가 다운로드되고 텍스트가 복사되었습니다!\n카카오톡에 붙여넣기 하세요.')
      }
    } catch (error) {
      console.error('폴백 공유 실패:', error)
      alert('공유에 실패했습니다. 다시 시도해주세요.')
    }
  }

  // 결과 타입을 한글로 변환하는 함수
  const getResultTypeKorean = (resultType, gender) => {
    const types = {
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
    return types[gender]?.[resultType] || '알 수 없음'
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
