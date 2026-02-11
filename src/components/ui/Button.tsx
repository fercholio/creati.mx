import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200',
    secondary:
      'bg-white text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }

  const cls = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
