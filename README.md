# PRAY2U(한남대 컴퓨터공학과 동아리 웹 서비스)

<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/f2bcbb54-915c-4d94-8170-1b47d31cbe88" width="400" height="400"/>


- 배포 URL : https://pray2u.com/
(현재는 백엔드 개발자의 사정으로 서버를 닫아둔 상태입니다)

<br>

## 프로젝트 소개

- 해당 프로젝트는 한남대 컴퓨터공학과 동아리원들을 위해 제작한 웹 서비스 입니다.
- 공지사항, TIL, 랭킹, SHOP, Event, MyPage, AdminPage로 이루어져 있습니다.
- github 활동을 장려하기 위해 github만으로 로그인이 가능하게 구현하였습니다.

<br>

## 팀원 구성

<div align="center">

| **이동복** | **박병근** | **최형순** |
| :------: | :------: | :------: |
| [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/b9efd48a-025c-408c-b0ac-bc737de8a71b" height=150 width=150> <br/> @Dongbok-Lee](https://github.com/Dongbok-Lee) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/dc9fa281-1359-4c2c-866b-f426b258ee0a" height=150 width=150> <br/> @Dejong1706](https://github.com/Dejong1706) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/af7226a4-6147-4e99-a617-63acbf05708b" height=150 width=150> <br/> @HS980924](https://github.com/HS980924) |

</div>

<br>

## 1. 개발 환경

- Front : React, Javascript, Scss, Tailwindcss, jwt, bootstrap, dayjs, react-calendar
- Back-end : MySQL, SpringBoot, jwt, Java
- 버전 및 이슈관리 : Github
- 협업 툴 : Discord
 
<br>

## 2. 역할 분담

### 🦸‍♂️이동복

- **기능**
    - 서버 API 제작
    - 서비스 배포

### 🍊박병근

- **UI**
    - 디자인 : 전체 UI/UX 디자인    
    - 페이지 : 메인, 공지사항, TIL, Ranking, Event, AdminPage
- **기능**
    - 게시글 작성, 랭킹 포인트 시각화, 일정 확인 및 관리, 관리자 권한(해지,부여), 아이템 등록 승인
      
### 👻최형순

- **UI**
    - 페이지 : MyPage, AdminPage, Shop
- **기능**
    - 로그인(git), 아이템 등록, 출석 체크, 개인 정보 변경, 아이템 구매 승인, 프로필 CRUD
<br>

## 3. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2023-02 ~ 2023-12

<br>

### 작업 관리

- Git과 Distcord를 이용하여 소통하며 내용을 공유하였습니다.
- 주 1~2회씩 만나 개발 방향과 전체적인 디자인, 기능에 관한 얘기들을 나누며 진행하였습니다.

<br>

## 4. 페이지별 기능

### [메인화면]
- 상단 배너
    - 로고 : 로고 클릭시 메인 화면으로 이동합니다.
    - 공지사항, 이벤트, TIL, SHOP, RANKING : 해당 영역 클릭시 페이지로 이동합니다.
    - 사용자 아이콘 : 로그아웃, Mypage, AdminPage(관리자 일 경우)을 확인 할 수 있습니다.
- 그림 이미지, 동아리 소개, 동아리 멤버 소개가 Fullpagescroll로 나타나져 있습니다. (비 로그인시 작동 그림 이미지만을 확인 할 수 있습니다)

| 메인화면 | 멤버 소개 |
|----------|----------|
|![Pray2U - Chrome 2023-12-19 오후 8_55_15](https://github.com/Dejong1706/MyBlog/assets/75114974/b80e28bc-dce6-4dc3-bb8b-6f394b4458b1)|![Pray2U - Chrome 2023-12-19 오후 8_55_19](https://github.com/Dejong1706/MyBlog/assets/75114974/cf5a7af9-b762-41d0-a813-3f1b323e8c1a)|


<br>

### [공지사항]
- 생성된 공지사항들을 확인할 수 있습니다.
- 공지사항 작성, 수정, 삭제기능이 존재합니다.

| 공지사항 |
|----------|
|![Pray2U - Chrome 2023-12-19 오후 8_50_59](https://github.com/Dejong1706/MyBlog/assets/75114974/bc3ab7a0-3817-4188-9204-2d6303594ab1)|

### [TIL]
- Today I Learn의 의미로 오늘의 학습한 자료들을 각각 업로드하는 페이지 입니다.
- 작성자의 이름을 검색하여 게시글을 확인 할 수 있습니다.
- TIL 작성, 수정, 삭제기능이 존재합니다.
- TIL의 글을 작성한 유저는 point를 획득합니다.

| TIL |
|----------|
|![Pray2U - Chrome 2023-12-19 오후 8_53_19](https://github.com/Dejong1706/MyBlog/assets/75114974/6d915f8f-5bca-457e-8aa9-78001878d3d0)|

<br>

### [Ranking]
- 출석, TIL 작성으로 얻은 point의 순위를 나타내는 페이지입니다.
- point가 많은 순으로 내림차순 되어 보여집니다.

| Ranking |
|----------|
|![Pray2U - Chrome 2023-12-19 오후 8_53_35](https://github.com/Dejong1706/MyBlog/assets/75114974/03fd2692-313d-4d5c-a5af-7aaf7ba8e88b)|

<br>

### [이벤트]
- react-calendar로 제작하였습니다.
- title, content, 시간을 설정한 뒤 원하는 날짜를 선택하면 해당 날짜에 일정이 작성됩니다.
- 일정이 존재하는 날짜는 하늘색 점으로 표시하였습니다.

| 이벤트 |
|----------|
|![Pray2U - Chrome 2023-12-19 오후 9_46_07](https://github.com/Dejong1706/MyBlog/assets/75114974/fa553216-587d-4698-a11b-186db478c07a)|

<br>

### [My Page]
- 프로필 : (유저 이미지, 전화번호, 이메일) 변경, 회원 탈퇴, Github 잔디 확인
- 출석 관리 : 달력에 현재 날짜와 클릭한 달력 날짜가 일치할 경우에만 출석 버튼 활성, 출석 성공시 버튼 "출석 완료"로 변경 
- MY TIL : 로그인한 유저가 작성한 TIL 확인
- MY SHOP : 로그인한 유저가 등록한 아이템, 혹은 구매한 아이템 확인 가능(아이템은 point로 구매 가능)
  
| 프로필 | 출석관리 |
|----------|----------|
|![Pray2U - Chrome 2023-12-19 오후 8_53_51](https://github.com/Dejong1706/MyBlog/assets/75114974/2f2bea9c-26ea-443c-b312-db88d0d5a4d0)|![Pray2U - Chrome 2023-12-19 오후 8_53_51](https://github.com/Dejong1706/MyBlog/assets/75114974/5d815375-8813-47d0-970e-413dd90f58c4)|

### [관리자]
- 유저관리 : 가입되어 있는 유저들의 정보 확인 가능, 관리자 권한 (부여,박탈) 기능
- 아이템 관리 : 사용자들이 올린 아이템들의 승인, 거절
- 주문 승인 : 아이템 구매요청 승인, 거절

| 유저관리 | 아이템관리 |
|----------|----------|
|![Pray2U - Chrome 2023-12-19 오후 8_54_01](https://github.com/Dejong1706/MyBlog/assets/75114974/a38d0979-7515-4d53-acb2-1b7b5ae581ef)|![Pray2U - Chrome 2023-12-19 오후 8_54_36](https://github.com/Dejong1706/MyBlog/assets/75114974/1e06c8a6-dece-4410-bd15-cb32ce6708f0)|

<br>

## 5. 개선 목표

- 반응형 디자인 적용
- css 통일
    


