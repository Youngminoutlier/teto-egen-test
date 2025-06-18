// 카카오톡 인앱브라우저 감지
export const isKakaoTalkBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /KAKAOTALK/i.test(userAgent)
}

// 모바일 브라우저 감지
export const isMobileBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
}

// 외부 브라우저로 열기 안내
export const suggestExternalBrowser = () => {
  if (isKakaoTalkBrowser()) {
    const openInBrowser = confirm(
      '더 안정적인 테스트를 위해 외부 브라우저에서 열어보세요.\n' +
      '우측 상단 메뉴(⋮) → "다른 브라우저로 열기"를 클릭하세요.\n\n' +
      '그대로 진행하시겠습니까?'
    )
    return !openInBrowser // false면 중단, true면 계속
  }
  return false // 카카오톡이 아니면 중단하지 않음
}
