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
