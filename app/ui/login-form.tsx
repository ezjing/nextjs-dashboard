"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  // ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";

export default function LoginForm() {
  // useSearchParams : 클라이언트 컴포넌트에서 URL의 쿼리 파라미터를 읽거나 수정하는 데 사용되는 훅
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  // useActionState(서버 액션 함수, 초기 상태) : 클라이언트 컴포넌트에서 form양식 검증
  // useActionState 기본 구조
  // const [state, formAction, isPending] = useActionState(action, initialState);
  // state → 서버 액션의 반환 값 (ex. 오류 메시지, 업데이트된 데이터 등)
  // formAction → 액션을 실행하는 함수 (submit 등에 사용)
  // isPending → 액션이 실행 중인지 여부 (로딩 상태 관리)
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined // 초기 상태(initialState)가 undefined → 로그인 시 초기 에러 메시지가 없음
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
