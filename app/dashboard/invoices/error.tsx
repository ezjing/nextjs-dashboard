"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  // Error는 JavaScript 내장 객체로, 모든 에러의 기본 타입(new Error("에러 메시지")를 생성할 때 사용)
  // Error 타입에 { digest?: string } 속성을 추가(digest는 Next.js에서 제공하는 고유한 에러 식별자)
  // digest를 사용하면 서버(서버 컴포넌트, 서버 액션)에서 발생하는 에러를 서버 로그에서 해당 에러의 원인을 추적
  error: Error & { digest?: string };
  // reset은 함수 타입이고, 매개변수를 받지 않고 void를 반환하는 함수
  // Next.js의 에러 페이지(에러 바운더리)에서 제공하는 리셋 함수로, 에러 상태를 초기화하는 역할
  // "다시 시도" 같은 로직에 사용
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
