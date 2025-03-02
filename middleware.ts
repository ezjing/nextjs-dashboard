import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // matcher : Next.js에서 미들웨어가 적용될 경로를 지정하는 옵션(미들웨어가 특정 경로에만 적용되도록 필터링)
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // 미들웨어가 /api, /static, /image, .png 파일 확장자가 포함된 경로에는 적용되지 않도록 설정
};
// 미들웨어 사용 장점 
// 미들웨어가 인증을 확인할 때 까지 보호된 경로가 렌더링되지 않으므로 보안과 성능이 향상됨
