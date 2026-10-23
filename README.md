# 겸직금지! · DualJob

현실 직업과 판타지 직업을 조합하는 카드 로그라이트입니다. 네 가지 융합 직업으로 아홉 구역을 돌파하고 인사부장 마왕에게 퇴사를 통보하세요.

**[게임 플레이](https://dualjob.aldol.app/)** · 공개 테스트 v0.6.20

## 실행

Python 3가 있으면 별도 패키지 설치 없이 웹 배포본과 단일 HTML을 만들 수 있습니다.

```sh
python3 scripts/build.py
python3 -m http.server 8000 --directory dist
```

브라우저에서 `http://localhost:8000`을 여세요. `output/dualjob.html`은 에셋을 포함한 단일 HTML입니다.

## 구성

| 경로 | 용도 |
| --- | --- |
| `src/index.html` | 페이지 진입점과 공유 메타데이터 |
| `src/assets/game.js` | 게임 규칙, UI, 저장·백업 |
| `src/assets/styles.css` | 반응형 화면과 연출 |
| `src/assets/` | 이미지·폰트·아이콘 |
| `scripts/build.py` | 해시 파일명 배포본·단일 HTML 생성 |
| `qa/` | 카드·전투·지도·저장 회귀 검사 |
| `licenses/` | 포함된 폰트의 라이선스 전문 |
| `docs/` | 배포·검증 범위와 에셋 안내 |

수정은 `src/`에서 진행합니다. `dist/`와 `output/`은 생성 결과이며 커밋하지 않습니다. 테스트 제어 훅은 `qa/debug-hook.js`에 분리되어 공개 게임 배포본에는 들어가지 않습니다.

## 검증

Node.js 24와 Python 3를 기준으로 확인했습니다.

```sh
python3 scripts/build.py
npm ci --prefix qa
node qa/release15-check.cjs
node qa/release15-card-regression.cjs output/dualjob-debug.html
node qa/release15-combat-flow-check.cjs output/dualjob-debug.html
node qa/release15-mobile-journey-check.cjs output/dualjob-debug.html
node qa/release15-web-check.cjs
node qa/release16-content-check.cjs
node qa/release18-mobile-check.cjs
node qa/release19-content-check.cjs
node qa/release20-save-recovery-check.cjs
```

자동 검사는 JSDOM을 사용하므로 실제 모바일 터치·전체화면·브라우저별 렌더링 검증을 대체하지 않습니다. 자동 실행 GitHub Actions는 설정하지 않았습니다.

## 저장

진행 상황은 현재 브라우저에 저장됩니다. 서버 계정이나 클라우드 저장은 없습니다. 메뉴의 **저장 및 백업**에서 JSON을 내보내고 가져올 수 있습니다. 기기·브라우저·도메인 또는 시크릿/격리 브라우저 컨텍스트를 바꾸면 저장이 공유되지 않습니다. 직접 JSON 백업을 옮겨야 합니다. 동일 출처의 저장이 손상됐을 때에만 브라우저 내부 보조 복구본으로 이어하기를 시도합니다. 실제 플레이 기록이나 백업 파일은 이 저장소에 올리지 마세요.

## 배포

Vercel의 `dualjob` 프로젝트와 연결되어 있으며, `main`에 반영된 변경은 운영 주소로 자동 배포됩니다. 빌드 명령은 `python3 scripts/build.py`, 배포 폴더는 `dist/`입니다. 배포 절차는 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)를 참고하세요.

## 라이선스와 크레딧

이 저장소는 공개되어 있지만 프로젝트 코드·게임 아트에 대한 별도 재사용 라이선스는 아직 선택하지 않았습니다. MIT 등의 허용적 라이선스를 부여한 저장소로 간주하지 마세요. 포함된 외부 폰트에는 [licenses/](licenses/)의 각 라이선스가 적용됩니다. 게임 내부 규칙 화면에도 폰트 고지가 있습니다.

캐릭터·카드·배경·홍보 이미지 제작에 AI 이미지 생성 도구를 사용했습니다. 브랜드는 ALDOL입니다. 공유용 홍보 이미지는 실제 플레이 스크린샷과 구분됩니다.

버그 제보에는 사용 기기·브라우저·재현 순서와 화면을 적어 주세요. 개인 저장 기록이나 민감한 정보는 공개 이슈에 첨부하지 마세요.
