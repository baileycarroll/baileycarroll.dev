"use client";
import React from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AdminFormProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default function AdminForm({
  title,
  children,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  loading = false,
  showCloseButton = false,
  onClose
}: AdminFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-neutral-800/50 backdrop-blur-xl border border-primary/20 rounded-lg shadow-xl"
    >
      {/* Form Header */}
      <div className="flex items-center justify-between p-6 border-b border-primary/20">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700/50 transition-colors"
            aria-label="Close form"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={onSubmit} className="p-6">
        <div className="space-y-6">
          {children}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-primary/20">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-700/50 border border-neutral-600 rounded-lg hover:bg-neutral-600/50 hover:border-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelLabel}
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-lg hover:bg-primary/90 hover:border-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {submitLabel}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// Form Field Components
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  helpText?: string;
}

export function FormField({ label, children, error, required, helpText }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {helpText && (
        <p className="text-xs text-neutral-400">{helpText}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

interface FormInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function FormInput({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  disabled = false,
  required = false 
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`w-full px-3 py-2 bg-neutral-700/50 border rounded-lg text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        error ? 'border-red-400' : 'border-neutral-600'
      }`}
    />
  );
}

interface FormTextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({ 
  placeholder, 
  value, 
  onChange, 
  error, 
  disabled = false,
  required = false,
  rows = 4
}: FormTextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      rows={rows}
      className={`w-full px-3 py-2 bg-neutral-700/50 border rounded-lg text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-vertical ${
        error ? 'border-red-400' : 'border-neutral-600'
      }`}
    />
  );
}

interface FormSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function FormSelect({ 
  value, 
  onChange, 
  options, 
  placeholder,
  error, 
  disabled = false,
  required = false 
}: FormSelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`w-full px-3 py-2 bg-neutral-700/50 border rounded-lg text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        error ? 'border-red-400' : 'border-neutral-600'
      }`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
