import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-')
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500',
          'transition-all duration-200',
          error && 'border-red-300 focus:ring-red-500/20 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-')
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm',
          'placeholder:text-gray-400 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500',
          'transition-all duration-200',
          error && 'border-red-300 focus:ring-red-500/20 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
