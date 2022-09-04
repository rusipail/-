PK => Primary Key(tueple을 고유하게 구별해주는 field)

## User
(field)
- id => (PK):String
- name:String
- picture:Boolean
- registered_at:Date
- email:String
- updated_at:Date
- status: '가입'|'탈퇴':Boolean

## Community
- id (PK):String
- like:Number
- who_like:Arr
- post:Object


## Post
- author = User.id(PK):String
- content:type / blob
- registerde_at:Date
- comment:Object
- picture or video:Boolean
- like:Number
- hate:Number

## comment
- id:String
- content:type blob
- who:String
- view:Arr
- like:Number
- hate:Number
- postId: Post.id

## room
- memberId:String
- member:Number
- chat:Object
- 

## Chat
- sender => User.id(PK):String
- recipient => User.id(PK):String
- date:Date


## Schedule
- school:String
- today:Date
- classname:String
- classes:String
