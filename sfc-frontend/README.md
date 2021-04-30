# 프론트엔드

리액트 CRA eject 안한 기본 설정 + 리액트 라우터 + css

## 실행 방법

0. cd Shared-Finance-Calendar/sfc-frontend
1. npm install
2. npm run start : 자동으로 localhost:3001가 열립니다

## 라우팅

- Calendar(메인) : /
- Login: /login
- Register: /register
- Profile: /profile
- GroupInfo: /group

## 컴포넌트 제작 규칙

용도에 맞게 네이밍만 해주세요
components 폴더에서 용도에 맞는 폴더네이밍, 컴포넌트 작성 후 page에서 import

## 스타일링 규칙

- BEM 네이밍으로 해주세요(해당 클래스가 어디서 어떤 용도로 사용되는지 명확하게 작성)
- 예시) .login**title, .login**id-input 이렇게 안하면 나중에 css conflict 시에 찾기 힘듬
