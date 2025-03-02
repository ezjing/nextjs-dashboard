import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    // pages 객체의 옵션
    signIn: "/login", // signIn: 사용자가 로그인되지 않았을 때 이동할 로그인 페이지를 설정(/longin)
    // signOut: "/logout", // 로그아웃 페이지를 /logout으로 설정
    // error: "/auth/error", // 인증 에러 페이지를 /auth/error로 설정
    // verifyRequest: "/auth/verify", // 이메일 로그인 인증 페이지
    // newUser: "/welcome", // 새 유저가 처음 로그인하면 /welcome으로 이동
  },
  callbacks: { 
    // authorized : Next.js Middleware에서 실행되는 콜백 함수로, 요청이 실행되기 전에 호출됨. 요청이 특정 페이지에 접근할 권한이 있는지를 검증하는 데 사용
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // !!(이중 부정 연산자) : 값을 명확하게 true 또는 false로 변환하는 역할(undefined, null, 0, "" false 그 외 true)
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // 로그인하지 않았다면 로그인 페이지로 리디렉트
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // providers : 로그인 옵션을 나열하는 배열. Google, GitHub, Credentials(이메일+비밀번호) 같은 로그인 방식을 추가할 수 있음
} satisfies NextAuthConfig; 
// satisfies : TypeScript에서 특정 타입을 만족하는지 검사하는 기능(타입 안전성을 제공)
// 유니언 타입(예: "light" | "dark")을 사용할 때, 실제로 어떤 값을 가질지 정확히 알고 싶다면 satisfies를 사용하는 게 유용
// 예를 들어, "light" | "dark"의 경우 실제로 "light"만 사용할 예정이라면, satisfies를 사용해서 타입을 더 명확하게 설정할 수 있음

// 예시)
// const myConfig = {
//   theme: "light",
//   debug: true,
// } satisfies Config;

// console.log(myConfig.theme); // "light" (타입이 그대로 유지됨)

// satisfies를 사용하면, myConfig.theme은 "light"로 구체적으로 타입이 고정되기 때문에 
// "light" | "dark"라는 유니언 타입이 아니라, "light"라는 값 하나로만 인식