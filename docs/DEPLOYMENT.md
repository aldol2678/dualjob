# 배포

- 운영 주소: https://dualjob.aldol.app/
- 호스팅: Vercel 정적 사이트
- 버전: v0.6.15
- 저장소: https://github.com/aldol2678/dualjob
- 자동 배포: `main` → Vercel Production → https://dualjob.aldol.app/
- 빌드 명령: `python3 scripts/build.py`
- 배포 폴더: `dist/`
- 설치 명령: 없음 (Python 표준 라이브러리만 사용)

`python3 scripts/build.py`로 만든 `dist/`가 배포 단위입니다. `src/`, `qa/`, 플레이 백업은 배포하지 않습니다. Vercel 설정은 루트 `vercel.json`에서 복사합니다.

운영 파일은 해시가 포함된 JS·CSS·에셋 이름을 사용합니다. HTML은 `no-cache`, 에셋은 장기 캐시입니다. 변경 후에는 새 해시 파일과 이를 참조하는 HTML을 함께 배포하세요.

도메인 변경 시 `src/index.html`의 canonical·OG URL·공유 이미지 주소를 수정합니다. `src/robots.txt`는 현재 검색 허용 상태입니다.

2026-10-22 배포에서 HTTPS HTTP 200, 에셋 36개 해시 일치, 존재하지 않는 경로 404를 확인했습니다. 실제 클라우드 Chrome에서 카드 사용, 새로고침 후 이어하기, JSON 다운로드·파일 가져오기·복원도 확인했습니다. Android/iPhone 실기기의 터치와 전체화면은 별도 확인이 필요합니다.

저장 형식 `dualJobSave_v1`에 진행·누적 기록·설정을 함께 보관합니다. 구버전 저장 키를 보존하지만, 구버전으로 롤백하면 오래된 기록이 보일 수 있습니다. 운영 업데이트 전에 백업 기능과 새 저장 형식의 호환성을 확인하세요.

## 변경 반영

로컬 빌드와 관련 회귀 검사를 통과한 변경을 `main`에 반영합니다. Vercel의 해당 커밋 배포가 `Ready`인지 확인한 뒤 운영 주소와 변경 기능을 확인하세요. 빌드가 실패하면 기존 성공 배포가 유지되므로, 단순 푸시 성공을 배포 완료로 보지 않습니다. GitHub Actions는 별도로 설정하지 않았으며 게임 회귀 검사는 현재 수동 실행합니다.
