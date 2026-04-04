type Props = {
  className?: string
  size?: number
}

export default function ClinicLogo({ className = "", size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Wings - left outer */}
      <path d="M30 20 C22 15 8 17 3 11 C7 5 20 9 30 17" fill="#c9973a" opacity="0.85" />
      {/* Wings - left inner */}
      <path d="M30 20 C24 13 12 9 5 7 C10 2 22 7 30 17" fill="#c9973a" opacity="0.45" />
      {/* Wings - right outer */}
      <path d="M30 20 C38 15 52 17 57 11 C53 5 40 9 30 17" fill="#c9973a" opacity="0.85" />
      {/* Wings - right inner */}
      <path d="M30 20 C36 13 48 9 55 7 C50 2 38 7 30 17" fill="#c9973a" opacity="0.45" />

      {/* Staff */}
      <line x1="30" y1="16" x2="30" y2="70" stroke="#1a3a5c" strokeWidth="3" strokeLinecap="round" />

      {/* Left snake */}
      <path
        d="M30 24 C21 29 21 37 30 40 C39 43 39 51 30 56 C21 61 21 67 28 69"
        stroke="#1a3a5c"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right snake */}
      <path
        d="M30 24 C39 29 39 37 30 40 C21 43 21 51 30 56 C39 61 39 67 32 69"
        stroke="#c9973a"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left snake head */}
      <ellipse cx="22" cy="24" rx="3" ry="2" fill="#1a3a5c" transform="rotate(-30 22 24)" />
      {/* Left snake tongue */}
      <path d="M19.5 23 L17 21.5 M19.5 23 L17 24.5" stroke="#c9973a" strokeWidth="0.8" strokeLinecap="round" />

      {/* Right snake head */}
      <ellipse cx="38" cy="24" rx="3" ry="2" fill="#c9973a" transform="rotate(30 38 24)" />
      {/* Right snake tongue */}
      <path d="M40.5 23 L43 21.5 M40.5 23 L43 24.5" stroke="#1a3a5c" strokeWidth="0.8" strokeLinecap="round" />

      {/* Orb / knob at top */}
      <circle cx="30" cy="16" r="4.5" fill="#c9973a" />
      <circle cx="30" cy="16" r="2" fill="#fff" opacity="0.5" />
    </svg>
  )
}
