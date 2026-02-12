'use client'

/**
 * CreaTI Logo — "Terminal C" concept
 * 
 * The C is shaped like a terminal prompt chevron (>)
 * merged with the letter C — coding meets creativity.
 * A spark pixel in Electric Blue accents the top-right corner.
 */

interface LogoIconProps {
  size?: number
  variant?: 'dark' | 'light' | 'color'
  className?: string
}

/**
 * Icon-only logo mark (the C> chevron + spark)
 */
export function LogoIcon({ size = 36, variant = 'color', className = '' }: LogoIconProps) {
  const bgColor = variant === 'light' ? '#ffffff' : '#0a1628'
  const chevronColor = variant === 'dark' ? '#0a1628' : '#ffffff'
  const sparkColor = '#0066ff'
  const sparkGlow = variant === 'light' ? 'rgba(0,102,255,0.3)' : 'rgba(0,102,255,0.5)'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CreaTI logo"
    >
      {/* Background rounded square */}
      <rect width="100" height="100" rx="22" fill={bgColor} />

      {/* C-chevron: a C that morphs into > at the openings */}
      {/* 
        Top arm: starts wide then angles inward (like > top)
        Body: smooth C curve on left side
        Bottom arm: angles inward then goes wide (like > bottom)
      */}
      <path
        d="M62 24 L38 24 C26 24 18 34 18 50 C18 66 26 76 38 76 L62 76 L50 62 L40 62 C34 62 30 57 30 50 C30 43 34 38 40 38 L50 38 Z"
        fill={chevronColor}
      />

      {/* Spark pixel — prominent, top-right */}
      <rect x="66" y="16" width="18" height="18" rx="4" fill={sparkColor} />
      
      {/* Spark glow effect */}
      <rect x="66" y="16" width="18" height="18" rx="4" fill={sparkColor} filter="url(#spark-glow)" />
      
      {/* Second smaller spark — cascade effect */}
      <rect x="72" y="42" width="10" height="10" rx="2.5" fill={sparkColor} opacity="0.5" />

      {/* Glow filter */}
      <defs>
        <filter id="spark-glow" x="58" y="8" width="34" height="34" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor={sparkGlow} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

interface LogoFullProps {
  height?: number
  variant?: 'dark' | 'light'
  className?: string
  showTagline?: boolean
}

/**
 * Full logo: icon + "CreaTI" wordmark
 */
export function LogoFull({ height = 36, variant = 'dark', className = '' }: LogoFullProps) {
  const textColor = variant === 'dark' ? '#152238' : '#ffffff'
  const accentColor = '#0066ff'
  const iconVariant = variant === 'dark' ? 'color' : 'light'
  const scale = height / 36

  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ height }}>
      <LogoIcon size={height} variant={iconVariant as 'color' | 'light'} />
      <svg
        width={Math.round(110 * scale)}
        height={height}
        viewBox="0 0 110 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CreaTI"
      >
        {/* "Creati" wordmark — clean geometric sans */}
        {/* C */}
        <path d="M10.5 7.5C4.7 7.5 0.5 12 0.5 18s4.2 10.5 10 10.5c3.2 0 5.8-1.3 7.5-3.5l-2.8-2.2c-1.1 1.3-2.7 2.1-4.7 2.1-3.8 0-6.2-3-6.2-6.9s2.4-6.9 6.2-6.9c2 0 3.6 0.8 4.7 2.1l2.8-2.2C16.3 8.8 13.7 7.5 10.5 7.5z" fill={textColor} />
        {/* r */}
        <path d="M23.5 13.5v-0.3c0-0.1 0-0.2 0-0.3h-3.8v15.6h3.8v-8.3c0-2.8 1.5-4.5 3.8-4.5h0.5v-3.7c-2 0-3.5 0.8-4.3 1.5z" fill={textColor} />
        {/* e */}
        <path d="M37.2 12.7c-4 0-7 3.2-7 8s2.8 8 7.2 8c2.5 0 4.5-1 5.8-2.8l-2.4-2c-0.8 1-2 1.6-3.3 1.6-2.2 0-3.7-1.3-4-3.5h10.3c0.1-0.5 0.1-1 0.1-1.5 0-4.5-2.7-7.8-6.7-7.8zm-3.3 6.3c0.3-2 1.7-3.3 3.5-3.3 1.9 0 3.1 1.3 3.3 3.3h-6.8z" fill={textColor} />
        {/* a */}
        <path d="M52 12.7c-2.2 0-4 0.8-5 2.3v-2h-3.5v15.5h3.8v-8.7c0-2.5 1.5-3.8 3.5-3.8 0.8 0 1.5 0.2 2 0.5l1-3.3c-0.6-0.3-1.2-0.5-1.8-0.5z" fill={textColor} />
        {/* T — emphasized, slightly bolder */}
        <path d="M56.5 8h14v3.5h-5v17h-4v-17h-5V8z" fill={textColor} />
        {/* I — with accent dot */}
        <path d="M74 12.9h3.8v15.6H74V12.9z" fill={textColor} />
        {/* Dot on i — Electric Blue accent */}
        <circle cx="75.9" cy="8.5" r="2.5" fill={accentColor} />

        {/* .mx suffix */}
        <text
          x="82"
          y="28"
          fontFamily="'Satoshi', 'Inter', system-ui, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill={accentColor}
        >
          .mx
        </text>
      </svg>
    </div>
  )
}
