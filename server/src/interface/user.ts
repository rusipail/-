export class User {
    id: string
    name: string
    email: string
    picture: string
    registered_at: Date
    status: '가입' | '탈퇴'
    type: 'general' | 'vip'
}