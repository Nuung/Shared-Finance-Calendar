# SFC(Shared-Finance-smart Calendar)
> 우리은행 해커톤, 딥러닝 기반의 금융 공유 캘린더

## Getting Start
1. node v12 ↑
2. npm v6 ↑
3. mongodb install and set up!
    - create 유저 부분
    - 러닝 포트 설정 부분 ( + 접근 가능 Ip 설정 )
    - 알아서 잘 하실 수 있다고 믿어 의심치 않습니다!
4. .env file 
    - 제가 전달해드리겠습니다!

```
git clone https://github.com/Nuung/Shared-Finance-Calendar.git
cd Shared-Finance-Calendar/sfc-backend
npm install 
npm run db:init

# db init을 했으면 collection -> schema 생성 -> insert data one 까지
# 자동으로 해줍니다! error 없으면 mongodb에서 데이터 체크하면 됩니다!
npm start

``` 

- 이제 postman, insomnia 등의 request tool로
    - **GET: localhost:3000/api/test**
    - **GET: localhost:3000/api/test/test**
    - **POST: localhost:3000/api/test** body: { "data": "any thing" }

## Tech
- one
- two
