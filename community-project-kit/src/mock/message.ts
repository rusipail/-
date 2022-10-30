import assets from '../lib/assets'

export const messageMockData = [{
    profile: assets.html,
    recipient: '방준현',
    lastMessage: 'dlwndks',
    Messages: [
      {
        who:"recipient",
        message:"hello",
        time: '오후 12시 40분',
      },
      {
        who:"me",
        message:"hi",
        time: '오후 12시 38분',
      }
    ]
  },
  {
    profile: assets.question_mark,
    recipient: '변동윤',
    lastMessage: '동하~',
    Messages: [
      {
        who:"recipient",
        message:"hello",
        time: '오후 12시 40분',
      },
      {
        who:"me",
        message:"hi",
        time: '오후 12시 38분',
      }
    ]
  },
  {
    profile: assets.css,
    recipient: '한결쌤',
    lastMessage: '쌤 이거 모르겠어요',
    Messages: [
      {
        who:"recipient",
        message:"hello",
        time: '오후 12시 40분',
      },
      {
        who:"me",
        message:"hi",
        time: '오후 12시 38분',
      }
    ]
  }
]