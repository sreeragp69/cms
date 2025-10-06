import React, { useEffect } from "react";
import { CalendarDays } from "lucide-react";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  required?: boolean;
  error?: string;
}

const InputField = ({
  label,
  type,
  placeholder,
  id,
  name,
  onChange,
  value,
  required = false,
  error,
}: InputFieldProps) => {
  // Initialize flatpickr for date inputs
//   useEffect(() => {
//     if (type === "date") {
//       const flatPickr = flatpickr(`#${id}`, {
//         mode: "single",
//         static: true,
//         monthSelectorType: "static",
//         dateFormat: "Y-m-d",
//         defaultDate: value ? new Date(value) : undefined,
//         onChange: (selectedDates) => {
//           if (selectedDates.length > 0) {
//             const event = {
//               target: {
//                 value: selectedDates[0].toISOString().split('T')[0],
//                 name,
//                 id
//               }
//             } as React.ChangeEvent<HTMLInputElement>;
//             onChange(event);
//           }
//         },
//       });

//       return () => {
//         if (!Array.isArray(flatPickr)) {
//           flatPickr.destroy();
//         }
//       };
//     }
//   }, [type, id, name, onChange, value]);

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-600  mb-2 block"
      >
        {label}
        {required && <span className="text-red-500"> * </span>}
      </label>

      <div className="relative placeholder:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600  w-full px-4 py-3.5 bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md 
          border rounded-xl 
          text-gray-700 dark:text-gray-200 cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
          flex items-center justify-between
          transition-all duration-300 ease-in-out
      hover:shadow-md h-14">
        <input
          id={id}
          name={name}
          type={type === "date" ? "text" : type}
          placeholder={placeholder}
          onChange={type === "date" ? undefined : onChange}
          value={value || ""}
          className="flex-1 bg-transparent border-0 px-4 text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 focus:outline-none dark:text-white  rounded-md"
          required={required}
          readOnly={type === "date"}
        />
        {/* {type === "date" && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <CalendarDays className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
        )} */}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
