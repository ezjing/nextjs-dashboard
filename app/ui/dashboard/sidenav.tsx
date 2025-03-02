import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            // "use server"는 해당 action 함수만 서버에서 실행된다는 의미(컴포넌트 전체가 서버 액션이 되는 건 아님)
            // action 속성 안에 있는 익명 함수(async () => {}) 내부에 "use server"가 선언
            // 이 함수만 서버 액션(Server Action)으로 동작
            // 폼 자체나 컴포넌트 전체는 클라이언트 컴포넌트로 유지
            // signOut는 클라이언트 컴포넌트에서 발생하는 이벤트에 쓰이는 함수이므로 서버액션 사용해야함
            // signOut이 선언된 auth.ts는 서버액션이 아니므로 사용하는 form action에서 서버액션으로 동작시킨것
            "use server"; 
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
