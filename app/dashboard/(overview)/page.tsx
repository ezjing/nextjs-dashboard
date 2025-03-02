import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  // request waterfall : 이전 요청이 데이터를 반환한 후에만 시작(fetchLogic1() => fetchLogic2()... 순서)
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* 데이터를 불러오는 컴포넌트를 Suspense로 감싸고 감싼 컴포넌트 안에서 데이터를 불러오게함 */}
        {/* 한 컴포넌트에서 모든 데이터를 불러오는게 아니고 각 컴포넌트에서 불러오기 때문에 먼저 불러오는 순서대로 화면에 표시됨 */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <Suspense> : 데이터가 로딩될 때, 대신 표시할 UI를 지정 */}
        {/* 스트리밍 이라고도 함 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
