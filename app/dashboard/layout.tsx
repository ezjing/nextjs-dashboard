import SideNav from "@/app/ui/dashboard/sidenav";

// ppr(점진적 부분 렌더링) : Suspense내부의 컴포넌트에서 통신할 필요 없이 바로 부모인 page.tsx 같은 곳에서 통신해도 됨
// - 기존 방식 : 모든 데이터를 가져온 후 전체 페이지 렌더링
// - ppr : 정적 데이터 먼저 렌더링. 이후 동적 데이터 로드
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
