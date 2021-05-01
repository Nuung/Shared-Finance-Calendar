# SFC(Shared-Finance-smart Calendar)
> 우리은행 해커톤, 딥러닝 기반의 금융 공유 캘린더

## Getting Start

### 1. version
- node v12 ↑, npm v6 ↑

### 2. DB
- mongodb install and set up!
    - create 유저 부분
    ```bash
    mongo ( go to mongo shell )
    use admin
    db.createUser({ user:"닷env파일과 맞춰 주세요!", pwd:"닷env파일과 맞춰 주세요!", roles:["root"]})
    exit
    그리고 본인 OS에 맞게 리스타트!
    ```
    - 러닝 포트 설정 부분 ( + 접근 가능 Ip 설정 ): 
    optional한 설정으로, mongodb.conf의 port와 bind.ip 설정

### 3. ENV (환경변수)
- .env file : 제가 전달해드리겠습니다!

```bash
git clone https://github.com/Nuung/Shared-Finance-Calendar.git
cd Shared-Finance-Calendar/sfc-backend
npm install 
npm run db:init

# db init을 했으면 collection -> schema 생성 -> insert data one 까지
# 자동으로 해줍니다! error 없으면 mongodb에서 데이터 체크하면 됩니다!
npm start

``` 

### 4. TEST:  postman, insomnia 등의 request tool로
- **GET: localhost:3000/api/test**
- **GET: localhost:3000/api/test/test**
- **POST: localhost:3000/api/test** body: { "data": "any thing" }

### 5. [front-end react 세팅하기!](https://github.com/Nuung/Shared-Finance-Calendar/tree/master/sfc-frontend)

---

## Tech
- one
- two
