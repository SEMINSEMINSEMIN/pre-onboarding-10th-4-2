# 📚 사전 과제: "Toodos"

<br/>

## 작업 내역 요약

- 구현 목표인 "문서화"를 위해, [Create Issue Branch](https://github.com/marketplace/actions/create-issue-branch#license) 이용했습니다.
- 자동화의 내용은 다음과 같습니다.
  - 이슈가 생성될 때마다 이슈에 설정된 라벨/issue-이슈번호의 이름의 브랜치와, 이슈에 적은 내용, 라벨, Assignees 등을 복사한 풀리퀘스트가 자동으로 생성되도록 설정했습니다. 이때 Assignees를 지정해야 GitHub Action이 작동합니다.
  - 브랜치에 대한 PR이 merge 되면 이슈가 자동으로 이슈가 close 됩니다.
- issue 번호와 커밋의 연관을 더 잘 알기 위해 커밋 메시지 뒤에 `#이슈번호`를 달았습니다.

## 미구현 사항

- 지금은 드롭다운이 항상 보이는 상태입니다. 드롭다운을 숨기는 건 아직 구현하지 못했습니다.
- 테스트 코드 작성은 하지 못했습니다.

## 개선 사항

추천 검색어 드롭다운 관련 컴포넌트 구조

- Main
  - InputTodo
    - TodoDropDown
      - TodoDropList
        - TodoHighLighted

무한 스크롤 등 기능 구현에 집중하다보니, 컴포넌트 구조나 최적화에 대해 제대로 고민하지 못하고 코드를 짰습니다.

일단 컴포넌트 구조가 깊고 서로 연관돼 있는 state가 많고, 필요없는 state도 있을 수도 있어서 이 부분에 대해 리팩토링이 필요해 보입니다.

<br>

---

<br>

프론트엔드 채용 면접에 앞서 `사전 과제`가 있습니다.
인터뷰에서 수정 및 구현 작업해주신 내용에 대해 질문을 드릴 예정입니다. 면접에서 편하게 답변을 해주시면 됩니다.

> **Note** > _설명하시는 코드를 함께 볼 수 있도록 google meet에서 **화면 공유 준비**를 부탁드립니다._

## 🎯 목표

본 과제는 개발자의 하루 일과 중 가장 기본적인 업무인 **코드 리뷰** 및 **기능 구현**입니다. 해당 리포지토리는 *Toodos*라는 이름을 가진 `To-do 리스트` 앱입니다. 코드 리뷰를 통해 다른 개발자들과 협업하는 스타일과 기존 코드를 리팩토링하는 방식을 파악하고자 합니다. 또한 기능 명세서와 디자인 가이드를 통해 새로운 기능을 어떻게 구현하시는지 파악하기 위해 준비했습니다.

## 🏠 Toodos 구조

`Toodos` 앱의 폴더 구조입니다.

> **Warning** > _**별도로 전달 받으신 api token을 `.env` 파일에 추가 부탁드립니다.**_

```javascript
src
 ┣ api
 ┃  ┗ index.js
 ┃  ┗ todo.js
 ┣ components
 ┃  ┣ Header.js
 ┃  ┣ InputTodo.js
 ┃  ┣ TodoItem.js
 ┃  ┗ TodoList.js
 ┣ hooks
 ┃  ┗ useFocus.js
 ┣ pages
 ┃  ┗ Main.js
 ┣ App.css
 ┣ App.js
 ┗ index.js
.env // <--- YOU NEED THIS!

```

<br/>

---

<br>

✨ 아래 3가지 `코드 리뷰`와 `기능 구현`, `문서화` 태스크를 수행 부탁드립니다.

## 👀 코드 리뷰

1. 작성된 코드의 작동 방법을 익히신 후, 개선이 필요하다고 판단되는 부분이 있다면 수정해주세요.
2. 더 나은 프로젝트 구조나, 패턴, 에러 처리, 스타일링, 테스팅 방법 등 자유롭게 작업해주세요.

## 🛠 기능 구현

사용자가 input에 타이핑을 하면 아래에 제공된 search api를 통해 받은 아이템들이 dropdown에 보여질 수 있도록 `InputTodo`에 추천 기능을 구현해주시면 됩니다.

1. 디자인 가이드(Figma)를 참고해서 InputTodo의 디자인 수정 및 dropdown을 새로 만들어주세요.
2. Bootstrap이나 Ant Design, tailwindcss와 같은 UI kit는 사용하지 않고 구현해 주세요.
3. Input에 `500ms`로 debounce를 적용해주세요.
4. Dropdown에 추천된 아이템들이 처음에 10개가 나올 수 있도록 하고, 아이템이 더 있으면 무한 스크롤로 최대 10개씩 받아올 수 있도록 구현해주세요.
5. Dropdown에서 아이템 하나를 선택하면, input의 value는 초기화가 되고 아이템이 리스트에 추가되도록 구현해주세요.

### 권장

- TypeScript를 적용해주시면 좋습니다.
- Jest나 Cypress 등을 사용한 테스트 코드를 작성해주시면 더욱 좋습니다.

## 📜 문서화

1. 작업의 주제와 성격에 따라 [GitHub PR](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)을 생성 후, 개발된 내용을 정리 부탁드립니다. (완료된 내용은 merge 해주셔도 좋습니다.)
2. 개발이 모두 완료되면 [GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)에 전반적으로 수정된 사항과 그렇게 개발된 이유를 작성 부탁드립니다.

<br/>

---

<br/>

### 🔍 API

#### HTTP

- API: `https://interview-api.labnote.co/api`
- RESOURCE: `{ GET } /search`

#### Parameters

| Name  | Required | Type     | Default | Description             |
| ----- | -------- | -------- | ------- | ----------------------- |
| q     | yes      | `string` | -       | input에서 검색하는 단어 |
| page  | no       | `number` | `1`     | 받아올 페이지 번호      |
| limit | no       | `number` | `10`    | 받아올 최대 사이즈 값   |

#### Responses

| Status | Messsage              | data                                   |
| ------ | --------------------- | -------------------------------------- |
| 200    | Ok                    | 응답 데이터 (See Payload result)       |
| 400    | Bad Request           | `details`: 상세 validation 에러 메시지 |
| 401    | You are unauthorized. | `(인증 실패, 토큰 필요)`               |
| 500    | Internal Server Error | `(서버측 에러)`                        |

<br/>

### Payload result

| Field    | Type       | Description                            |
| -------- | ---------- | -------------------------------------- |
| `q`      | `string`   | 쿼리 키워드                            |
| `page`   | `number`   | 현재 페이지 번호                       |
| `limit`  | `number`   | per page 사이즈                        |
| `result` | `string[]` | `limit`이 적용되어 `q`로 필터된 리스트 |
| `qty`    | `number`   | `result`의 길이                        |
| `total`  | `number`   | `q`로 필터된 총 `result` 길이          |

#### Sample

```javascript
// Request
`{ GET } https://interview-api.labnote.co/api/search?q=lorem&page=1&limit=10`

// Response (JSON)
{
  "opcode": 200,
  "message": "OK",
  "data": {
    "q": "lorem",
    "page": 1,
    "limit": 10,
    "result": [
      "Maecenas in lorem sit amet felis volutpat dapibus vulputate at dui.",
      "Nam porta lorem ut turpis pellentesque, et efficitur felis ullamcorper.",
      "Duis fringilla turpis vel lorem eleifend, sit amet hendrerit velit gravida.",
      "Cras in felis eget augue cursus placerat ac eget lorem.",
      "Sed id orci quis mi porttitor pulvinar cursus eget lorem.",
      "Fusce tincidunt lorem ac purus elementum, ut fermentum lacus mollis.",
      "Nam commodo lorem ac posuere dignissim.",
      "Etiam eu elit finibus enim consequat scelerisque aliquam vulputate lorem.",
      "Donec in lorem id eros ornare aliquam ut a nisi.",
      "Donec efficitur nulla eget lorem sollicitudin, in blandit massa dictum."
    ],
    "qty": 10,
    "total": 19
  }
}
```

<br/>

---

<br/>

## 💻 로컬 설치 및 실행방법

1. Clone this repo:

```bash
git clone ...
```

2. Install dependencies & packages

```bash
npm i
# OR
yarn
```

3. Run application

```bash
npm run start
# OR
yarn start
```
