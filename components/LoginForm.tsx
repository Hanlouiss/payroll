"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-block" disabled={pending}>
      {pending ? "Memproses..." : "Login"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, null);

  return (
    <form action={formAction}>
      {state?.error && <p className="error">{state.error}</p>}
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" required autoComplete="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required autoComplete="current-password" />
      <SubmitButton />
    </form>
  );
}
