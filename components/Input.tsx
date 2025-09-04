'use client'
// Campo de input com label e mensagem de erro
import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        ref={ref}
        className={`rounded border px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
)
Input.displayName = 'Input'
