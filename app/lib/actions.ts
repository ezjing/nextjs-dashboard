// 서버 액션(Server Action)은 서버에서 실행됨(개발자 도구가 아니라 서버 터미널에서 console 출력됨)
// createInvoice(formData) 같은 서버 액션은 서버에서 실행되어야 하는데, "use server"를 생략하면 클라이언트에서 실행하려다가 오류가 발생
//  Next.js는 기본적으로 모든 함수가 클라이언트에서 실행된다고 가정함
// 서버 전용 코드는 "use server", 클라이언트 전용 코드는 "use client"
// "use client" → 클라이언트 컴포넌트 (인터랙션, 상태 관리 필요할 때)
// "use server" → 서버 액션 (DB 쿼리, API 요청 같은 서버 전용 작업)
// 아무것도 없으면? → 기본적으로 서버 컴포넌트 (성능 최적화됨)

// 서버 액션이 필요한 경우
// 서버 액션은 클라이언트 컴포넌트에서 발생하는 이벤트(예: 버튼 클릭, 폼 제출 등)에 의해 서버에서 실행될 필요가 있는 로직을 처리하는 데 사용됩니다.

// 서버 액션이 아닌 경우
// 서버 액션을 사용하지 않아도 되는 경우는 서버에서 이미 처리된 데이터(예: 페이지 접속하자마자 실행하는 이벤트)를 클라이언트가 가져오는 경우입니다.
"use server";

import { z } from "zod"; // Zod : 타입 검증 및 스키마 유효성 검사를 위한 JavaScript/TypeScript 라이브러리
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  // z.coerce : 문자열을 숫자로 강제 변환하고 숫자 유형의 유효성을 검사
  // .gt(0, {}) : 숫자가 0보다 커야 한다는 조건
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }), // 열거형 'pending' 또는 'paid' 중 하나의 값만 허용
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true }); // FormSchema에서 id와 date 필드를 제외한 새로운 스키마(createInvoice에서 두 필드 사용안함함)
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// prevState : useActionState 후크에서 전달된 상태를 포함함
export async function createInvoice(prevState: State, formData: FormData) {
  // safeParse : success 또는 error 필드 중 하나의 객체를 반환
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId") || "",
    amount: formData.get("amount") || "",
    status: formData.get("status") || "",
  });
  // parse : Zod 스키마에 맞게 검증하고, 검증된 데이터를 반환(정확한 타입인게 보증됨)
  // const { customerId, amount, status } = CreateInvoice.parse({
  //   customerId: formData.get("customerId"),
  //   amount: formData.get("amount"),
  //   status: formData.get("status"),
  // });
  console.log("validatedFields: ", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100; // 금액을 센트로 저장
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices"); // 특정 경로의 캐시된 데이터를 갱신(새로고침)하는 역할, 리디렉트 후에도 이전 데이터가 유지될 가능성이 있음. 그러므로 최신 데이터를 확실히 반영하기 위해 revalidatePath()를 쓰고 redirect()를 사용
  redirect("/dashboard/invoices"); // 특정 페이지로 강제 이동(리디렉트) 하는 역할(캐시를 갱신하고 리다이렉트 해야함 revalidatePath() 선행 후 redirect() 사용)
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error("Failed to Delete Invoice");

  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}
