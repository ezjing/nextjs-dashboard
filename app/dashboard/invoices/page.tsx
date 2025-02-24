import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";

export default async function Page(props: {
  // searchParams: URL의 쿼리 스트링에서 추출된 값들 (예: /dashboard/invoices?id=123에서 id)
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search>는 클라이언트 컴포넌트이므로 클라이언트에서 쿼리 파라미터를 읽기 위해 useSearchParams() 훅을 사용 */}
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/* <Suspense>의 key : key값이 바뀔 때마다 새로운 데이터를 강제 로드할 수 있도록 만들어주는 역할 */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {/* <Table>은 서버 컴포넌트로 자체적으로 데이터를 가져오므로, searchParams(URL의 쿼리 스트링) prop을 해당 컴포넌트로 전달 */}
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
