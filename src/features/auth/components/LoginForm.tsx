"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LoginInput, SocialProvider } from "../schemas";
import { loginSchema } from "../schemas";
import Button from "../../../shared/components/Button/Button";
import InputField from "../../../shared/components/Input/Input";
import { Field } from "../../../shared/components/Input/Field";

type LoginFormProps = {
  onSubmit?: (values: LoginInput) => Promise<void> | void;
  initialValues?: Partial<LoginInput>;
  showSocial?: boolean;
  isLoading?: boolean;
};

export default function LoginForm({
  onSubmit,
  initialValues,
  showSocial = true,
  isLoading = false,
}: LoginFormProps) {
  const [values, setValues] = useState<LoginInput>({
    identifier: initialValues?.identifier ?? "",
    password: initialValues?.password ?? "",
    remember: initialValues?.remember ?? false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loading = isLoading || isSubmitting;

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
      if (onSubmit) await onSubmit(parsed.data);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={submitHandler} noValidate>
      <Field
        label="Email or Phone no."
        name="identifier"
        value={values.identifier}
        onChange={(v) => setField("identifier", v)}
        onBlur={() => validateField("identifier", values.identifier)}
        placeholder="Enter email"
        autoComplete="off"
        error={errors.identifier}
        disabled={loading}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={(v) => setField("password", v)}
        onBlur={() => validateField("password", values.password)}
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password}
        disabled={loading}
      />

      <Button
        size="sm"
        variant="primary"
        className="inline-flex mt-10 w-full items-center justify-center rounded-2xl bg-themePrimary dark:bg-themePrimary/8! px-4 py-3 font-medium text-white shadow-sm transition-colors hover:bg-purple-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner />
            Logging in…
          </span>
        ) : (
          "Log in"
        )}
      </Button>
    </form>
  );
}

function Spinner() {
  return (
    <span
      aria-label="Loading"
      className="inline-block size-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
    />
  );
}

export function LoginFormSkeleton() {
  return (
    <div
      className="space-y-5"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="space-y-1">
        <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="h-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-10 animate-pulse rounded-full bg-gray-200" />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <div className="h-3 w-24 rounded bg-gray-200" />
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="h-12 w-full animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}
