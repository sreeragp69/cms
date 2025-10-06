import { AnimatePresence, motion } from "framer-motion";

type FieldProps = {
  label: string;
  name: "identifier" | "password";
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: "text" | "password" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
};
export function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  autoComplete,
  disabled,
}: FieldProps) {
  const describedBy = error ? `${name}-error` : undefined;
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <motion.input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="w-full rounded-xl border  border-gray-200 dark:border-InputTextDark dark:bg-InputBGDark/10 bg-white px-4 py-3 text-gray-900 dark:text-white dark:placeholder:-InputTextDark/10 outline-none focus:ring-themePrimary/10 ring-3 ring-transparent placeholder:text-gray-400 focus:border-themePrimary/40  focus:bg-InputBGDark focus:ring-3 disabled:bg-InputBGDark"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        whileFocus={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${name}-error`}
            key="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-sm text-red-800"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}