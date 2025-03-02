import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // Credentials : OAuth(Google, GitHub 등) 같은 외부 로그인이 아니라, 자체 로그인 시스템을 구축할 때 사용하는 방식
    Credentials({
      // authorize : 백엔드에서 이메일/비밀번호 검증 로직을 실행하는 함수
      async authorize(credentials) {
        const parsedCredentials = z // z :zod 라이브러리로 로그인 입력값을 검증
          .object({ email: z.string().email(), password: z.string().min(6) }) // object : 입력값이 이메일 형식인지 & 비밀번호가 최소 6자 이상인지 체크
          .safeParse(credentials); // safeParse : 이 값이 위에서 정의한 스키마와 맞는지 검사. 결과는 { success: true, data } 또는 { success: false, error } 형식으로 반환

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password); // compare : 내부적으로 입력값을 다시 해싱(암호화)하여 저장된 해시(암호화)값과 비교. 반환타입 boolean

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
