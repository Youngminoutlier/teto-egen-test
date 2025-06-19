export const QUESTIONS = [
  {
    id: 1,
    text: "지하철에서 하나 남은 자리에 앉으려고 하는데 다른 사람도 앉으러 오고 있어. 어떻게 할 거야?",
    options: [
      { text: "빨리 가서 먼저 앉는 편임", value: "teto", score: 3 },
      { text: "적당한 속도로 걸으면서 상황 보는 편임", value: "neutral", score: 0 },
      { text: "그 사람한테 양보하고 그냥 서서 간다", value: "egen", score: 3 }
    ]
  },
  {
    id: 2,
    text: "친구가 \"오늘 머리 어때?\"라고 물어봤는데 솔직히 별로야. 뭐라고 대답할 거야?",
    options: [
      { text: "\"왜 이렇게 잘랐어 ㅋㅋ 솔직히 별로임\" 직설적으로 말함", value: "teto", score: 2 },
      { text: "\"음... 나쁘지 않은데? 애매하게 말함\"", value: "neutral", score: 0 },
      { text: "\"미쳤다 너무 예뻐! 너한테 잘 어울려\" 일단 칭찬부터 함", value: "egen", score: 2 }
    ]
  },
  {
    id: 3,
    text: "썸타는 사람이 이틀째 연락이 없어. 나의 대응은?",
    options: [
      { text: "먼저 연락해서 \"뭐해? 바빠?\" 선톡 날리는 편", value: "teto", score: 3 },
      { text: "하루 더 기다려보고 자연스럽게 연락해야지", value: "neutral", score: 0 },
      { text: "혹시 귀찮게 했나.. 마음 접는 편", value: "egen", score: 3 }
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
      { text: "\"제가 주문한 건 이게 아닌데요?\" 바로 직원 호출", value: "teto", score: 2 },
      { text: "\"잘못 나왔네; 바꿔달라고 할까?\" 같이 온 친구한테 물어봄", value: "neutral", score: 0 },
      { text: "실수한 것 같지만 조용히 그냥 먹기", value: "egen", score: 2 }
    ]
  },
  {
    id: 7,
    text: "밤에 배고픈데 야식으로 뭘 먹을지 개고민됨..",
    options: [
      { text: "\"일단 시켜! 내일부터 운동 더 하면 되지 ㅋ\"", value: "teto", score: 3 },
      { text: "일단 냉장고 열어보고 있는 거 아무거나 먹음", value: "neutral", score: 0 },
      { text: "\"샐러드.. 아니 치킨 ..? 음 샐러드..?\" 계속 고민함", value: "egen", score: 3 }
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
    text: "너 혼자 사는데 어제부터 새벽에 위층에서 너무 쿵쿵거려",
    options: [
      { text: "빗자루로 천장 두드리며 맞대응 들어가야지;", value: "teto", score: 3 },
      { text: "관리사무소에 민원 넣음", value: "neutral", score: 0 },
      { text: "\"곧 그만하시겠지 ..\" 하며 에어팟 낌", value: "egen", score: 3 }
    ]
  },
  {
    id: 10,
    text: "단톡방에서 정치 얘기로 논쟁이 벌어지고 있어. 나의 선택은?",
    options: [
      { text: "내 의견 확실히 표현하고 토론 참여함.", value: "teto", score: 2 },
      { text: "읽씹이나 안읽씹하고 다른 주제 전환될 때까지 기다림", value: "neutral", score: 0 },
      { text: "모두의 의견을 존중하며 중재하고 다른 주제로 화제 전환", value: "egen", score: 2 }
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
      { text: "의도했던 것처럼 자연스럽게 춤추면서 일어남 ㅋ", value: "teto", score: 2 },
      { text: "빨리 일어나서 무릎 털고 자연스럽게 가던 길 가기", value: "neutral", score: 0 },
      { text: "얼굴 빨개져서 앞만 보고 후다닥 도망가기", value: "egen", score: 2 }
    ]
  },
  {
    id: 14,
    text: "시험 봤는데 생각보다 잘 본 것 같아. 친구들한테 뭐라고 할 거야?",
    options: [
      { text: "\"이번에 셤 개잘본듯 ㅋㅋ\" 솔직하게 말함", value: "teto", score: 2 },
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
      { text: "\"근데 이 영화는 안 보면 후회해 ㄹㅇ\" 일단 내가 보고 싶은 영화 보자고 주장함", value: "teto", score: 2 },
      { text: "\"리뷰 좀 봐볼까?\" 하고 친구랑 같이 고민해봄", value: "neutral", score: 0 },
      { text: "그냥 친구가 보고 싶어하는 걸로 양보함", value: "egen", score: 2 }
    ]
  },
  {
    id: 17,
    text: "연애 중, 애인과 갈등이 생겼을 때 나의 행동은?",
    options: [
      { text: "바로 문제점 얘기하고 해결 방안 찾음. 싸움은 싸움이고 해결은 해결!", value: "teto", score: 3 },
      { text: "일단 감정적으로 격해지지 않도록 노력하며 상황을 지켜봄", value: "neutral", score: 0 },
      { text: "일단 상대방 감정부터 살핌. 분위기 안 좋으면 내가 맞춰주는 편", value: "egen", score: 3 }
    ]
  },
  {
    id: 18,
    text: "모임에서 분위기가 어색해졌어. 갑자기 조용해진 상황. 어떻게 할 거야?",
    options: [
      { text: "\"갑자기 왜케 조용해?\" 하고 분위기 깨기", value: "teto", score: 2 },
      { text: "조용히 핸드폰 보면서 상황 지켜보기", value: "neutral", score: 0 },
      { text: "\"음악 틀까?\" 하고 자연스러운 분위기 전환 시도", value: "egen", score: 2 }
    ]
  },
  {
    id: 19,
    text: "나의 평소 패션 스타일은 주로 어떤 느낌에 가까워?",
    options: [
      { text: "깔끔하고 편하면 장땡! 시간 낭비 싫어", value: "teto", score: 2 },
      { text: "유행을 따르기보다는 무난하고 깔끔한 기본 스타일", value: "neutral", score: 0 },
      { text: "오늘 기분이나 만나는 사람에 맞춰 신경 써서 입음", value: "egen", score: 2 }
    ]
  },
  {
    id: 20,
    text: "친구한테만 말했던 비밀을 다른 사람들이 알고 있어. 그 친구가 말한 게 확실해. 어떻게 할 거야?",
    options: [
      { text: "바로 그 친구한테 \"왜 말했어?\" 따지는 편", value: "teto", score: 2 },
      { text: "일단 상황 파악하고 나중에 얘기하는 편", value: "neutral", score: 0 },
      { text: "속상하지만.. 그냥 넘어가는 편", value: "egen", score: 2 }
    ]
  }
]
