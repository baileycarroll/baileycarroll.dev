"use client";
import React from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

// Custom styles for date input to override browser defaults
const dateInputStyles = `
  .date-input {
    color-scheme: dark;
  }
  
  .date-input::-webkit-calendar-picker-indicator {
    filter: invert(1);
    opacity: 0.6;
    cursor: pointer;
  }
  
  .date-input::-webkit-datetime-edit-fields-wrapper {
    color: rgb(229 229 229);
  }
  
  .date-input::-webkit-datetime-edit {
    color: rgb(229 229 229);
  }
  
  .date-input::-webkit-datetime-edit-text {
    color: rgb(229 229 229);
  }
  
  .date-input::-webkit-datetime-edit-month-field {
    color: rgb(229 229 229);
  }
  
  .date-input::-webkit-datetime-edit-day-field {
    color: rgb(229 229 229);
  }
  
  .date-input::-webkit-datetime-edit-year-field {
    color: rgb(229 229 229);
  }
`;

interface DateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helpText?: string;
  min?: string;
  max?: string;
  className?: string;
}

export default function DateSelector({
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  label,
  helpText,
  min,
  max,
  className = ""
}: DateSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputElement = (
    <>
      <style dangerouslySetInnerHTML={{ __html: dateInputStyles }} />
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          className={`date-input w-full px-3 py-2 pl-10 bg-neutral-700/50 border rounded-lg text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-red-400' : 'border-neutral-600'
          } ${className}`}
        />
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </>
  );

  // If label is provided, wrap in FormField structure
  if (label) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-200">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {inputElement}
        {helpText && (
          <p className="text-xs text-neutral-400">{helpText}</p>
        )}
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }

  // Otherwise return just the input
  return (
    <>
      {inputElement}
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </>
  );
}

// Convenience component that matches FormField pattern
interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  helpText?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export function DateField({
  label,
  value,
  onChange,
  error,
  required,
  helpText,
  disabled,
  min,
  max
}: DateFieldProps) {
  return (
    <DateSelector
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      helpText={helpText}
      disabled={disabled}
      min={min}
      max={max}
    />
  );
}
