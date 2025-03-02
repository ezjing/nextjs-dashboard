## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

파일명	역할	실행 위치
page.tsx |	해당 경로의 페이지를 렌더링 |	서버 & 클라이언트
layout.tsx |	여러 페이지에서 공유하는 레이아웃을 정의 |	서버
loading.tsx |	페이지가 로딩될 때 보여줄 UI (Suspense와 유사) |	서버 & 클라이언트
error.tsx |	해당 경로에서 발생한 에러를 처리하는 페이지 |	클라이언트
not-found.tsx |	404 (페이지 없음) 처리	| 서버
template.tsx |	layout.tsx와 유사하지만, 새롭게 상태를 유지하도록 함 |	서버
default.tsx |	특정 경로가 선택되지 않았을 때 기본적으로 보여줄 UI	| 서버
head.tsx |	해당 페이지의 <head> 부분을 설정 (SEO 메타 태그 등)	| 서버

컴포넌트 | 역할 | 실행 환경 | 설명
<Link> | 클라이언트 측 내비게이션 제공 | 클라이언트 | 전체 페이지 새로고침 없이 이동
<Image> | 최적화된 이미지 렌더링 | 클라이언트 | Lazy Loading, WebP 변환 지원
<Script> | 외부 스크립트 로드 최적화 | 클라이언트 | strategy 속성으로 로드 방식 제어
<Head> | <head> 태그 설정 | 서버 | SEO 및 메타 태그 적용
<Suspense> | 데이터 로딩 중 대체 UI 표시 | 서버 & 클라이언트 | React의 Suspense와 동일
<ErrorBoundary> | 에러 감지 및 대체 UI 표시 | 클라이언트 | error.tsx와 함께 사용 가능
<NotFound> | 404 페이지 처리 | 서버 | not-found.tsx와 함께 사용 가능
<Redirect> | 특정 경로로 리디렉션 | 클라이언트 | next/navigation에서 사용
<Dynamic> | 동적 컴포넌트 로딩 지원 | 서버 & 클라이언트 | next/dynamic을 활용
<Refresh> | 개발 환경에서 핫 리로딩 지원 | 클라이언트 | 자동 새로고침 기능 제공
<Boundary> | 에러 경계를 설정 | 클라이언트 | useError와 함께 사용 가능
<Metadata> | SEO 및 메타데이터 설정 | 서버 | next/metadata에서 사용
<Theme> | 다크 모드 및 테마 관리 | 클라이언트 | next/theme 활용 가능
<Viewport> | 뷰포트 관련 최적화 | 클라이언트 | 특정 요소가 뷰포트에 들어올 때 처리
<Template> | 페이지 상태 유지 | 서버 | layout.tsx와 유사하지만, 새로운 상태 유지
<Loading> | 페이지 로딩 시 UI 표시 | 서버 & 클라이언트 | loading.tsx에서 사용
<Default> | 특정 경로가 선택되지 않았을 때 기본 UI 표시 | 서버 | default.tsx에서 사용
