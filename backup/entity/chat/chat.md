1. Member table

- roomNo, int, not null, FK
- userId, FK 


2. Room
- no, int, not null, PK(auto increment)
- title
- createdAt


3. Chat 
- no, int, PK(auto increment)
- roomNo, FK
- userID, FK
- type, 'TEXT' | 'picture'
- createdAt


4. Friend
- userId, FK
- friendId, FK