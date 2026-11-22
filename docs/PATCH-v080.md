# PATCH v0.8.0 — 신규 직업 5종 (배달기사·정령술사)

- 기준: `~/workspace/goals/workplace-fantasy-card-roguelite/files/new-jobs-design-20261122.md`
- 소스 HEAD: `f5c84215` (aldol2678/dualjob main)
- 적용: `v080-patch.py` → `v080-patch2.py` → `v080-patch3.py` (순서대로, 각 스크립트는 앵커 1회 일치를 assert)
- 버전: 0.7.0 → 0.8.0 (헤더·가이드·백업 gameVersion·release-about·`scripts/build.py` 매니페스트)
- 빌드: `python3 scripts/build.py` → `output/dualjob.html` SHA-256
  `fa8ee88118068e1438ec1667c1fbf2f5ee63e1724418d53ffe1bcd7368ad2450` (6,412,747 B)

## 추가 내용

| 항목 | 수 | 비고 |
|---|---|---|
| 베이스 직업 | 2 | 배달기사(courier, 주문서) · 정령술사(spirit, 정령) |
| 융합 직업 | 5 | 저승 배달원 · 연금 배달원 · 정령 배달부 · 정령 세무사 · 식령 요리사 |
| 카드 | 32 | 베이스 11+11, 융합 2×5. 전부 `release=8` (확장 전용) |
| 자원 | 2 | 주문서(order, 상한 12) · 정령(spirit, 상한 3) |
| 전문화 | 10 | 융합별 2택1 (3구역 사내 전문교육) |
| 유물 | 11 | 일반 4 + 직업 2(배달 일지·정령 피리) + 융합 5 |
| 총계 | — | 카드 56→88, 유물 20→31, 직업 4→9 |

## 설계안 대비 적용 (adaptations)

- **스케일링 규칙:** 설계안의 평탄 수치 + 자원 소모 비용인 경우, 실제 소모량에 비례해 스케일하고 전부 소모 시 설계 수치와 같아지게 했다 (예: 배달 완료 도장 피해 5+소모량, 최대 7). 카드 설명 문구도 공식에 맞게 수정.
- **정령 계약서:** "미수금/저주/시약 중 1종 +1 (선택)" — 카드 사용에 선택 UI가 없어, 융합 상대 직업의 자원으로 확정 지급 (회계사→미수금, 흑마법사→저주, 연금술사→시약, 요리사→재료, 배달기사→주문서).
- **시작 덱 축소:** 설계안 10장 시작 덱은 융합 16장이 되므로, 배달기사 6장·정령술사 5장으로 줄여 기존 11–12장 융합 덱 패턴 유지.
- **살아있는 코스요리:** "정령 2기 이상이면 피해 +4" 판정이 카드 자체 정령 +1 이후라, 직전 정령 1기면 이미 발동.
- **영웅 초상:** 2026-11-22 14:31 연결 완료 — 신규 5종 초상 추가, `heroMarkup` 폴백 해제. 아래 "초상 연결" 절 참조. 카드 아트는 기존 아트 재사용.
- **유물 11종:** 설계안은 베이스별 2~3종 제안. 풀 균일성을 위해 일반 4 + 직업 2 + 융합 5로 구성 — 모든 직업의 `eligibleRelics`가 19종으로 동일 (직업 제한 유물 4종이 구직업만 매칭돼 신직업 풀이 16~17종으로 줄던 문제를 patch2로 해결).

## 구현 중 발견·수정된 버그 (신규 QA가 잡음)

1. **`tryAutoDual`이 주문서/정령 겸직 지급을 누락** (patch3): 지급 체인이 미수금/저주/재료/시약만 처리해, 신직업 겸직이 발동 표시만 하고 자원을 안 줌. `order(n)`/`spirit(n)` 분기 추가.
2. **신직업 유물 풀 축소** (patch2): 위 표 참조. 직업 유물 2종 + 융합 유물 5종 추가로 9직업 모두 19종으로 균일화.

## 검증

| 체크 | 결과 |
|---|---|
| `qa/release70-expansion-check.cjs` | ALL 9 groups PASS (320 케이스) |
| `qa/release23-balance-check.cjs` | ALL 7 groups PASS |
| `qa/release80-new-jobs-check.cjs` (신규) | ALL 9 groups PASS (278 전문화 투영 케이스) |
| `qa/release21-training-check.cjs` | ALL 18 groups PASS |
| `qa/release24-replay-check.cjs` | ALL 8 groups PASS |
| `qa/release15-mobile-journey-check.cjs` | 실행 불가 — `output/dual_job_original_cards_v0_6_11.html` 참조 파일이 클론에 없음 (v0.8.0과 무관한 기존 결핍) |

- 저장 호환: 구버전(classic, campaignId 없음·contentRevision 20·order/spirit 없음) 실행이 sanitize 후 order/spirit 0으로 로드됨. `contentRevision` 21 유지, 저장 `version` 4 유지.
- 모바일 390px: 코드 수준 확인만 — 직업 선택 그리드는 2열 자동 흐름(9개 타일 5행), 주문서/정령 표시는 기존 `.res-pill` 공용 컴포넌트(`jobbarMarkup`이 `JOB_GUIDE.resources`를 일반 루프로 렌더). 실기기·Steel 라이브 검증 미확인.
- 사람 플레이 재미·밸런스 체감: 미확인 (자동 QA는 재미 검증이 아님 — AGENTS.md 기준).

## 배포 금지

라이브 배포·프로덕션 배포·GitHub 푸시 금지. `main` 변경은 Vercel 자동 배포를 유발하므로, 배포는 알돌 승인 후 별도 진행.

## 초상 연결 (2026-11-22 14:31, 알돌 "이제 게임연결해줘")
- 신규 초상 5종을 `src/assets/asset-<sha256[:16]>.webp`로 추가, `UI_PORTRAITS` + `PORTRAIT_VIEWS`("0 0 256 256")에 연결. 기존 4종과 같은 `hero_<real>_<fantasy>` 키.
  - hero_courier_warlock asset-4def6a42f1f598c5 / hero_courier_alchemist asset-ba9d5cd845016090 / hero_courier_spirit asset-fe92a7c8e72357cd / hero_accountant_spirit asset-c3132feaf6c0ba5b / hero_chef_spirit asset-87d7a566c58fce50
- 원본 1600px → 256×256 투명 WebP 변환. 첫 변환이 피부·흰 모자를 반투명으로 만들던 문제는 배경만 지우는 floodfill로 재생성해 해결.
- 빌드 후 output/dualjob.html 6,492,925B SHA 7302e1fd6e612824293ebe92135ce5bf5b75f796361582f511872da3e3e43b57 (이전 6,412,747B fa8ee881…에서 +80,178B). hero 키 5종 각 2회 포함 확인. QA release80 9/9 + release70 9/9 PASS 재확인.
- 미확인: 브라우저 실렌더 초상 표시, Steel 라이브 검증, 실기기.

## A안 적용 — 초상 크기 통일 + 타일 콤팩트 (2026-11-22 16:20, 알돌 "A로 가자")
- 원인: 신규 5종만 PORTRAIT_VIEWS가 "0 0 256 256" 정사각형이라 타일 박스(45×70)에 45×45로만 그려짐. 기존 4종은 세로 긴 크롭(예 181×220)이라 45×55로 채움.
- 수정: 신규 5종 viewBox를 세로 긴 크롭으로 교체 — 저승 "19 1 216 254"·연금 "20 1 216 254"·정령 배달부 "11 1 234 254"(옆 정령 보존 위해 넓게)·정령 세무사 "24 1 207 254"·식령 "22 1 212 254". 초상 파일 자체는 그대로.
- 타일 콤팩트: 데스크톱 min-height 140→128px·gap 12→10px, 모바일(≤700px) min-height 132→112px·padding 10px 8px→8px·gap 8→6px·이름/설명/레벨 간격 축소, 초상 박스 45×70 유지. 5행 기준 모바일 약 110px 절약.
- 빌드 output/dualjob.html 6,534,365B SHA e5e063fa… (정정: 14:31 보고한 6,492,925는 문자 수였고 실제 바이트는 6,534,307B였음. 이번 빌드는 +58B). QA release80·70 9/9 PASS 재확인.
- 프리뷰 재배포: Pages dualjob 브랜치 v080, https://v080.dualjob.pages.dev (game-4f468dec… 일치, 라이브 무변경).
- 미확인: Steel 시각 확인 — 다른 세션 샌드스타 라이브 QA가 16:19부터 9222 사용 중이라 병렬 금지로 보류. 끝나면 프로브 재실행.

## hybrid 타이틀 히어로 (2026-11-22 16:28, 알돌 "hybrid로 메인화면 레이아웃을 바꾸자" + "일러스트타이틀도 저 기준으로 따로 뽑자")
- MOTUK Title Studio로 hybrid/cinematic/poster 3종 생성(모바일·금색 #ffcb77·메뉴 출근하기/저장 및 백업/게임 소개 · 문의). 프로젝트 `files/title/project-*.json`, 프리뷰 SVG `files/title/title-*.svg`. 단, 모툭은 배치 스케치만 주고 배경은 공용 샘플이라 일러스트는 따로 생성.
- 일러스트 타이틀 아트: 초상과 같은 스타일로 생성(원본 2288×1056, 글자 없음). 왼쪽은 달 뜬 빈 밤하늘(타이틀 자리), 오른쪽은 던전 게이트+마왕 실루엣+서류가방 든 직장인. 게임용 1280×591로 축소해 `src/assets/asset-ba30806f65565193.webp`(113,696B) 추가.
- 메인화면 적용: 기존 journey-intro를 `.title-hero`로 교체 — 일러스트 배경+왼쪽 어둡게 그라데이션, 세리프 큰 타이틀 "겸직금지!" + 금색 "Dual Job!" + 태그라인, 메뉴 3종 세로 배치(출근하기 금색 primary·나머지 다크). 하단 release-links 중복 제거. mast·직업 그리드·하단 독은 유지.
- 모바일 수정: 배경 위치 68%→100%로 바꿔 직장인 얼굴이 잘리지 않게 함(1차 프로브에서 얼굴 반 잘림 확인).
- 빌드 output/dualjob.html 6,687,366B SHA 9106777e… (webp 84종). QA release80·70 9/9 PASS. 프리뷰 v080 재배포, Steel 프로브 초상 9/9·에러 0·실패 요청 0·가로 넘침 0, 데스크톱+모바일 스크린샷 육안 확인.
- 주의: 히어로가 300px쯤 추가돼 직업 9타일은 이제 폰 한 화면에 안 들어감(타이틀 먼저, 아래로 스크롤해 직업 선택 — 타이틀 화면으로서는 정상). 라이브 미배포.

## 메인화면/직업선택 분리 (2026-11-22 16:35, 알돌 "출근하기 대신 새게임/이어하기 넣고 바로 직업선택창으로 이어지는 구조로, 메인화면은 딱 메인화면만")
- renderTitle을 careerOpen 플래그로 분기: 메인 화면은 히어로만(타이틀+메뉴 4종: 새 게임 gold primary·이어하기·저장 및 백업·게임 소개 · 문의 + 전적 한 줄). 이어하기는 저장된 도전이 없으면 disabled(신규 브라우저 기준). 저장된 도전이 있으면 상단에 도전 정보 배너 표시(버튼은 메뉴의 이어하기로 통합).
- 새 게임 → 직업선택 화면(← 메인으로·9타일 그리드·직업 자세히·하단 독 출근하기). 출근하기·이어하기·가져오기를 누르면 careerOpen을 false로 되돌려 다음에 타이틀로 돌아올 때 메인 화면이 뜸.
- Steel 프로브도 분리 구조에 맞게 갱신(probe-dualjob-v080-portraits.mjs): 메인 메뉴 확인→새 게임 실제 마우스 클릭→초상 9/9→← 메인으로 복귀 확인→모바일 재확인.
- 빌드 output/dualjob.html 6,687,927B SHA 5c1ee0ba…, QA release80·70 9/9 PASS. 프리뷰 v080 재배포, Steel: 메인 메뉴 4종·이어하기 disabled·메인에 타일 0개·직업 화면 초상 9/9·← 메인으로 복귀·에러 0·실패 요청 0·가로 넘침 0, 데스크톱+모바일 스크린샷 육안 확인. 라이브 미배포.

## 메인으로 버튼 (2026-11-22 16:39, 알돌 "게임에서 메인화면 가는 UI가 없어")
- 원인: 도전 중에는 ☰ 메뉴·마스트 어디에도 메인으로 가는 버튼이 없었음(엔딩 화면의 "직업 선택으로"만 메인으로 감).
- 추가: ☰ 게임 메뉴에 "메인으로" 버튼(도전 재시작 바로 앞). 누르면 진행을 저장한 채 메인으로 나가고, 메인 화면에 도전 정보 배너가 뜨며 이어하기가 활성화됨. 이어하기를 누르면 나가기 직전 화면(맵/전투)으로 그대로 복귀. 엔딩 화면 버튼은 실제 도착지가 메인이라 라벨을 "직업 선택으로"→"메인으로"로 정정.
- 구현 주의: 첫 버전은 toTitle 핸들러를 클릭 디스패치의 `if(modal)return;` 뒤에 둬서 메뉴 모달이 열린 상태에서는 아예 안 먹혔음. Steel 프로브가 30초 타임아웃으로 잡아냄. 핸들러를 모달 가드 앞으로 옮겨 해결.
- Steel 프로브 분리: 루프 검증은 별도 스크립트 `probe-dualjob-v080-totitle-loop.mjs`로 분리(합치면 세션이 길어져 무효 실행 발생). 1차 무효 실행은 낡은 ws-proxy가 9222를 점유한 도플갱어 세션이었음(AGENTS.md 교훈대로 포트 확인 후 재실행).
- 빌드 output/dualjob.html 6,688,205B SHA 0eca08d2…. 프리뷰 v080 재배포, Steel 루프 검증 PASS(새 게임→출근→맵→☰ 메뉴→메인으로→이어하기 활성·배너 확인→이어하기→맵 복귀, 19.5초·에러 0·실패 요청 0). 라이브 미배포.

## 라이브 배포 v0.8.0 (2026-11-22 16:52, 알돌 "이제 라이브 올려줘")
- Cloudflare Pages 프로덕션 배포(ddd91aaf, branch main) — `pages deploy <dist> --project-name dualjob` (브랜치 미지정 = 프로덕션). 105파일, 신규 업로드 0건(프리뷰와 동일 내용).
- 라이브 확인: dualjob.aldol.app 200·1,932B(배포 전 1,898B), game-3b8f3cf767532990.js 200·310,835B·SHA 3b8f3cf7… 로컬 dist와 바이트 일치, title-hero·v0.8.0·toTitle·newGame 마커 포함. browser.open 텍스트 사본은 배포 직전 크롤이라 v0.7.0으로 보였음(캐시, 직접 curl 2회로 새 파일 확인).
- Steel 라이브 시각 확인은 배포 시점에 다른 세션 QA가 9222 포트 사용 중이라 보류 — 라이브 파일이 프리뷰 검증 통과한 빌드와 바이트 동일.
- GitHub main에는 아직 안 올림(푸시하면 Vercel 프로덕션 자동 배포됨 — 알돌 결정 필요). 롤백 대상: 이전 라이브 v0.7.0.

## 호스팅 이관: Vercel → Cloudflare Pages (2026-11-22 17:00, 알돌 지시)
- Vercel `dualjob` 프로젝트의 GitHub 연결 해제(대시보드에서 Remove Connection 확인) — 이후 main 푸시는 Vercel 배포를 유발하지 않음. 프로젝트 자체는 삭제 안 함.
- 배포는 Cloudflare Pages Git 연결로 이관(새 프로젝트 `dualjob-git`, Pages가 main 푸시 시 직접 빌드·배포; 기존 직접 업로드 프로젝트 `dualjob`은 도메인 이동 후 정리 예정). GitHub Actions 경유안은 폐기: 시크릿 설정에 필요한 Cloudflare 대시보드 로그인이 Turnstile에 막혀 토큰을 만들 수 없었고(알돌 직접 입력까지 실패), API로 만든 토큰은 값이 화면에서 가려져 GitHub에 넣을 수 없었음. 워크플로 파일 삭제. `vercel.json` 삭제, build.py의 vercel.json 복사 제거, README/AGENTS.md/docs/DEPLOYMENT.md의 Vercel 언급을 Cloudflare로 교체.
- 위쪽 "푸시하면 Vercel 프로덕션 자동 배포됨" 메모 2건은 이관 전 상태 기록으로, 이관 이후에는 적용되지 않음.
