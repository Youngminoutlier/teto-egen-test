export const QUESTIONS = [
  {
    id: 1,
    text: "지하철에서 하나 남은 자리에 앉으려고 하는데 다른 사람도 앉으러 오고 있어. 어떻게 할 거야?",
    options: [
      { text: "빨리 가서 먼저 앉기", value: "teto", score: 3 },
      { text: "적당한 속도로 걸으면서 상황 보기", value: "neutral", score: 0 },
      { text: "그 사람한테 양보하고 그냥 서서 가겠음", value: "egen", score: 3 }
    ]
  },
  {
    id: 2,
    text: "친구가 \"오늘 머리 어때?\"라고 물어봤는데 솔직히 별로야. 뭐라고 대답할 거야?",
    options: [
      { text: "\"솔직히 구린데? ㅋㅋ 돈 버렸네\"", value: "teto", score: 2 },
      { text: "\"음... 나쁘지 않은데?\"", value: "neutral", score: 0 },
      { text: "\"미쳤다 너무 예뻐! 너한테 잘 어울려\"", value: "egen", score: 2 }
    ]
  },
  {
    id: 3,
    text: "썸타는 사람이 이틀째 연락이 없어. 나의 대응은?",
    options: [
      { text: "먼저 연락해서 \"뭐해? 바빠?\" 직진 어택", value: "teto", score: 3 },
      { text: "하루 더 기다려보고 자연스럽게 연락", value: "neutral", score: 0 },
      { text: "혹시 귀찮게 했나.. 마음 접기", value: "egen", score: 3 }
    ]
  },
  {
    id: 4,
    text: "길에서 전 애인을 마주쳤어. 상대방도 나를 봤어. 어떻게 할 거야?",
    options: [
      { text: "당당하게 \"오 안녕?\" 하고 먼저 인사", value: "teto", score: 3 },
      { text: "애매하게 눈인사만 하고 지나가기", value: "neutral", score: 0 },
      { text: "못 본 척하고 다른 길로 슬금슬금", value: "egen", score: 3 }
    ]
  },
  {
    id: 5,
    text: "새로운 헬스장에 등록했어. 첫날 어떻게 행동할 거야?",
    options: [
      { text: "일단 무거운 걸로 시작해서 존재감 어필", value: "teto", score: 3 },
      { text: "적당히 여기저기 둘러보며 파악하기", value: "neutral", score: 0 },
      { text: "구석에서 조용히 가벼운 것부터 시작", value: "egen", score: 3 }
    ]
  },
  {
    id: 6,
    text: "음식점에서 주문한 거랑 다른 음식이 나왔어. 근데 그것도 맛있어 보여. 어떻게 할 거야?",
    options: [
      { text: "\"제가 주문한 건 이게 아닌데요?\" 바로 정정 요청", value: "teto", score: 2 },
      { text: "\"잘못 나왔네; 바꿔달라고 할까?\" 같이 먹는 친구한테 물어보기", value: "neutral", score: 0 },
      { text: "실수한 것 같지만 조용히 그냥 먹기", value: "egen", score: 2 }
    ]
  },
  {
    id: 7,
    text: "친구가 내 SNS 사진에 \"살 왜케 빠졌어?\"라고 댓글 달았어. 사실 안 뺐는데? 보정한 건뎅?",
    options: [
      { text: "\"보정빨이야 ㅋㅋ\" 솔직 답변", value: "teto", score: 3 },
      { text: "\"그런가? ㅎㅎ\" 애매하게 넘어가기", value: "neutral", score: 0 },
      { text: "\"헤헤 ㅎㅎ 고마워\" 고마워하며 넘어가기", value: "egen", score: 3 }
    ]
  },
  {
    id: 8,
    text: "친구가 연애 고민상담을 하는데 솔직히 답이 뻔해. 어떻게 반응할 거야?",
    options: [
      { text: "\"그냥 헤어져. 시간 낭비임 ;;\" 직설적 조언", value: "teto", score: 2 },
      { text: "\"음.. 네 생각은 어때?\" 되묻기", value: "neutral", score: 0 },
      { text: "\"힘들겠다... 더 얘기해봐 ㅠㅠ\" 공감하며 들어주기", value: "egen", score: 2 }
    ]
  },
  {
    id: 9,
    text: "치킨 시켜먹는데 다리만 남았어. 다리를 집었는데 친구랑 손이 겹쳤어. 어떻게 할 거야?",
    options: [
      { text: "\"내가 먼저 집었음 ㅋ\" 하고 가져가기", value: "teto", score: 3 },
      { text: "가위바위보나 제비뽑기 제안", value: "neutral", score: 0 },
      { text: "\"너가 먹어\" 하고 양보하기", value: "egen", score: 3 }
    ]
  },
  {
    id: 10,
    text: "단톡방에서 민감한 주제로 논쟁이 벌어지고 있어. 나의 선택은?",
    options: [
      { text: "내 의견 확실히 표현하고 토론 참여", value: "teto", score: 2 },
      { text: "적당히 중립적인 의견 하나 던지기", value: "neutral", score: 0 },
      { text: "읽씹이나 안읽씹하고 나중에 다른 주제로 화제 전환", value: "egen", score: 2 }
    ]
  },
  {
    id: 11,
    text: "주말에 침대에 누워있는데 친구가 \"놀러나오자\"고 해. 솔직히 귀찮아.",
    options: [
      { text: "\"귀찮은딩? ㅋ\" 솔직하게 말하고 다음에 만나자고 하기", value: "teto", score: 2 },
      { text: "\"오늘은 좀...\" 애매하게 거절하기", value: "neutral", score: 0 },
      { text: "귀찮지만 그래도 친구가 원하니까 나가기", value: "egen", score: 2 }
    ]
  },
  {
    id: 12,
    text: "배달음식 주문했는데 1시간 넘게 안 와. 배고프고 짜증나. 어떻게 할 거야?",
    options: [
      { text: "배달앱으로 \"언제 와요?\" 문의하기", value: "teto", score: 3 },
      { text: "좀 더 기다려보고 너무 늦으면 연락하기", value: "neutral", score: 0 },
      { text: "오겄지 하고 그냥 기다리면서 과자로 배 달래기", value: "egen", score: 3 }
    ]
  },
  {
    id: 13,
    text: "길에서 넘어졌는데 사람들이 쳐다봐. 어떻게 반응할 거야?",
    options: [
      { text: "의도한 것처럼 자연스럽게 춤추면서 일어나기", value: "teto", score: 2 },
      { text: "빨리 일어나서 무릎 털고 자연스럽게 가던 길 가기", value: "neutral", score: 0 },
      { text: "얼굴 빨개져서 앞만 보고 후다닥 도망가기", value: "egen", score: 2 }
    ]
  },
  {
    id: 14,
    text: "시험 봤는데 생각보다 잘 본 것 같아. 친구들한테 뭐라고 할 거야?",
    options: [
      { text: "\"이번에 셤 개잘본듯 ㅋㅋ\" 솔직하게", value: "teto", score: 2 },
      { text: "\"그럭저럭...?\" 애매하게 답하기", value: "neutral", score: 0 },
      { text: "\"망했어ㅠㅠ\" 겸손하게(?) 답하기", value: "egen", score: 2 }
    ]
  },
  {
    id: 15,
    text: "엘리베이터에서 닫힘 버튼을 눌렀는데 뛰어오는 사람이 보여. 어떻게 할 거야?",
    options: [
      { text: "이미 늦었어~ 다음 거 타라고 생각하기", value: "teto", score: 3 },
      { text: "어쩔 수 없다고 생각하며 열림 버튼 누르기", value: "neutral", score: 0 },
      { text: "급하게 열림 버튼 누르고 잡아주며 기다려주기", value: "egen", score: 3 }
    ]
  },
  {
    id: 16,
    text: "친구랑 영화 보는데 내가 보고 싶었던 거랑 친구가 보고 싶은 게 달라. 어떻게 할 거야?",
    options: [
      { text: "\"근데 이 영화는 안 보면 후회함 ㄹㅇ\" 내가 보고 싶은 영화 보자고 주장하기", value: "teto", score: 2 },
      { text: "\"리뷰 좀 봐볼까?\" 하고 친구랑 같이 골라보기", value: "neutral", score: 0 },
      { text: "그냥 친구가 보고 싶어하는 걸로 양보하기", value: "egen", score: 2 }
    ]
  },
  {
    id: 17,
    text: "친구랑 약속했는데 30분째 안 와. 연락도 안 받고 있어. 어떻게 할 거야?",
    options: [
      { text: "계속 전화하고 \"어디야? 언제 와?\" 메시지 보내기", value: "teto", score: 2 },
      { text: "그냥 기다리면서 핸드폰 보기", value: "neutral", score: 0 },
      { text: "\"괜찮어 천천히 와\" 메시지 보내고 기다리기", value: "egen", score: 2 }
    ]
  },
  {
    id: 18,
    text: "모임에서 분위기가 어색해졌어. 갑자기 조용해진 상황. 어떻게 할 거야?",
    options: [
      { text: "\"갑자기 왜케 조용해?\" 하고 분위기 깨기", value: "teto", score: 3 },
      { text: "조용히 핸드폰 보면서 상황 지켜보기", value: "neutral", score: 0 },
      { text: "\"음악 틀까?\" 하고 분위기 전환 시도", value: "egen", score: 3 }
    ]
  },
  {
    id: 19,
    text: "인스타 스토리에 뭘 올릴지 고민이야. 어떤 걸 선택할 거야?",
    options: [
      { text: "내 일상 자랑하는 멋있는 사진", value: "teto", score: 2 },
      { text: "무난한 음식 사진이나 풍경", value: "neutral", score: 0 },
      { text: "친구들이나 다른 사람들이 나온 재밌는 사진", value: "egen", score: 2 }
    ]
  },
  {
    id: 20,
    text: "드디어 마지막 질문이야! 이 테스트 어땠어?",
    options: [
      { text: "꿀잼! 빨리 결과 보고 싶어", value: "teto", score: 2 },
      { text: "그럭저럭 괜찮네, 결과가 궁금하긴 해", value: "neutral", score: 0 },
      { text: "재밌었어~ 친구들도 해보라고 해야지", value: "egen", score: 2 }
    ]
  }
]
