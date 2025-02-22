import { Inter, Lusitana } from "next/font/google";

// Inter, Lusitana은 구글 폰트에서 제공하는 폰트임
// 구글폰트에서 제공하는 글꼴만 사용 가능
export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
