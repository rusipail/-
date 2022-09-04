모듈 나누고
- User 
- Post 
- Comment
- COmmit
- ...
- Sensor

엔드포인트(라우팅) 나누고
- GET /user/users: 모든 유저 정보 가져오기
- POST /user/user: body로 받은 유저 저장

- GET /post/posts: 게시글 전체 목록 조회
- POST /post/post: bod로받은 게시글 저장
- GET /post/:postId: 특정 게시글 조회

