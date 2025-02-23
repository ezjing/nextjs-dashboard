"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  // useSearchParams : 클라이언트 컴포넌트에서 URL의 쿼리 파라미터를 읽거나 수정하는 데 사용되는 훅
  const searchParams = useSearchParams();
  // usePathname : 현재 페이지의 경로 (path)를 반환하는 훅
  const pathname = usePathname();
  // useRouter : Next.js의 라우팅 기능을 다룰 수 있는 훅
  // push: 새로운 URL로 이동
  // replace: 현재 페이지를 새로운 URL로 바꿈
  // query: 쿼리 파라미터 가져오기
  // pathname: 현재 페이지 경로 가져오기
  const { replace } = useRouter();

  // function handleSearch(term: string) {
  //   console.log(`Searching... ${term}`);

  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }

  // 디바운싱 : 사용자가 입력을 멈춘 후 특정 시간(300ms)이 지난 후에만 코드를 실행
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // value : 통제 가능(useState처럼 상태 관리할때 사용)
        // defaultValue : 통제 불가
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
