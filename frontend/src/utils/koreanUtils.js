// 한글 조사 처리 함수
export const getParticle = (word, hasJongseong, noJongseong) => {
  if (!word) return hasJongseong;
  
  const lastChar = word.charAt(word.length - 1);
  
  // 한글인지 확인
  if (lastChar >= '가' && lastChar <= '힣') {
    // 한글의 경우 받침 여부 확인
    const code = lastChar.charCodeAt(0) - 0xAC00;
    const hasJongseongValue = code % 28 !== 0;
    return hasJongseongValue ? hasJongseong : noJongseong;
  }
  
  // 영어, 숫자, 특수문자의 경우 발음 기준으로 판단
  const lastCharLower = lastChar.toLowerCase();
  
  // 영어 자음으로 끝나는 경우 (받침 있음으로 처리)
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
  // 영어 모음으로 끝나는 경우 (받침 없음으로 처리)
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  
  if (consonants.includes(lastCharLower)) {
    return hasJongseong;
  } else if (vowels.includes(lastCharLower)) {
    return noJongseong;
  }
  
  // 숫자의 경우
  const numberEndings = {
    '0': true, '1': false, '2': true, '3': true, '4': true, 
    '5': true, '6': true, '7': false, '8': false, '9': true
  };
  
  if (numberEndings.hasOwnProperty(lastChar)) {
    return numberEndings[lastChar] ? hasJongseong : noJongseong;
  }
  
  // 기타 특수문자는 받침 있음으로 처리
  return hasJongseong;
};

export const addParticle = (nickname) => {
  return nickname + getParticle(nickname, '이는', '는');
};
