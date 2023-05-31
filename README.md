# 📚 사전 과제: "Toodos"
현재 서버에서 서비스를 중단한 상태이고 토큰이 공개 불가능이기 때문에 웹사이트 동작 확인이 어렵습니다.

## 문서화

- 구현 목표인 "문서화"를 위해, [Create Issue Branch](https://github.com/marketplace/actions/create-issue-branch#license) 이용했습니다.
- 자동화의 내용은 다음과 같습니다.
  - 이슈가 생성될 때마다 이슈에 설정된 라벨/issue-이슈번호의 이름의 브랜치와, 이슈에 적은 내용, 라벨, Assignees 등을 복사한 풀리퀘스트가 자동으로 생성되도록 설정했습니다. 이때 Assignees를 지정해야 GitHub Action이 작동합니다.
  - 브랜치에 대한 PR이 merge 되면 이슈가 자동으로 이슈가 close 됩니다.
- issue 번호와 커밋의 연관을 더 잘 알기 위해 커밋 메시지 뒤에 `#이슈번호`를 달았습니다.

