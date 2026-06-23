import { AuthFlow } from "@/components/auth/AuthFlow";

import { Suspense } from "react";

export default function AuthPage() {
  return (
    <Suspense>
      <AuthFlow />
    </Suspense>
  );
}
