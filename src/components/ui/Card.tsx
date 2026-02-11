import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-gray-100 p-6 transition-all duration-300',
        hover && 'hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 hover:border-gray-200',
        className
      )}
    >
      {children}
    </div>
  )
}
