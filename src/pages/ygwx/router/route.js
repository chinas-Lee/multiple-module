const MeetingSignUp = resolve => require(['../view/meeting-sign-up'], resolve)

const Route = [
  {
    path: '/meeting-sign-up',
    name: 'MeetingSignUp',
    component: MeetingSignUp,
    meta: {
      title: '会议申请'
    }
  }
]

export default Route
