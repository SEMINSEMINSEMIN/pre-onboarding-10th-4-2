# 📚 사전 과제: "Toodos"

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
