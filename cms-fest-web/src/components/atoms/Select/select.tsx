/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from "react";

import style from "./Select.module.css";

interface Props {
  className?: string;
  name: string;
  value: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  options: { text: string; value: string }[];
  onChange: (value: string) => void;
  helperText?: string | any;
}

export const SelectComponent: React.FC<Props> = ({ className = "", name, value, options, label, onChange, required = false, helperText, disabled = false }) => {
  return (
    <div className={`${className} mb-6`}>
      {label && <label className="text-sm">{label}</label>}
      <select
        className={`w-full h-[36px] leading-5 relative py-2 px-4 text-slate-800 bg-white border border-t-0 border-r-0 border-l-0 border-gray-500 overflow-x-auto focus:outline-none focus:border-slate-400 focus:ring-0 ${style["custom-select"]}`}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        {disabled && <option value={""}>Selecione uma opção</option>}
        {!disabled && (
          <>
            {options.map((opt: any, index: number) => (
              <option key={index} value={opt?.value}>
                {opt?.text}
              </option>
            ))}
          </>
        )}
      </select>
      {helperText && <p className="text-sm leading-normal mt-1 ml-1 text-red-800 dark:text-red-500">{helperText}</p>}
    </div>
  );
};
