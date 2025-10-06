
import { useState } from "react";
import { Field } from "../../../shared/components/Input/Field";
import type { LoginInput } from "../schemas";
import { loginSchema } from "../schemas";
import Button from "../../../shared/components/Button/Button";
import { WavyBackground } from "../../../shared/components/ui/wavy-background";

export default function LoginPage() {

  const [values, setValues] = useState<LoginInput>({
    identifier: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loading = isSubmitting;

  const fieldSchemas = {
    identifier: loginSchema.pick({ identifier: true }),
    password: loginSchema.pick({ password: true }),
  };

  function setField<K extends keyof LoginInput>(key: K, val: LoginInput[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function validateField<K extends keyof typeof fieldSchemas>(
    key: K,
    val: string
  ) {
    const result = fieldSchemas[key].safeParse({ [key]: val } as any);
    setErrors((prev) => ({
      ...prev,
      [key]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  }

  const handleLogin = async (values: LoginInput) => {
    // TODO: replace with real dispatch/API call
    // await dispatch(loginThunk(values))
    await new Promise((r) => setTimeout(r, 1200));
    // handle success/error toasts here
  };

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof LoginInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const pathKey = issue.path[0] as keyof LoginInput;
        nextErrors[pathKey] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      await handleLogin(parsed.data);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex  flex-col w-full items-center justify-center ">
     
      <div className="w-full  space-y-8  p-8 ">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hello!
            <span className="block mt-1">Welcome Back</span>
          </h1>
        </header>

        <form onSubmit={submitHandler} className="space-y-6">
          <Field
            label="Email or Username"
            name="identifier"
            value={values.identifier}
            onChange={(e) => setField("identifier", e.target.value)}
            error={errors.identifier}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={(e) => setField("password", e.target.value)}
            error={errors.password}
          />

        

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-InputTextDark! hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

     
      </div>
    </div>
  );
}
