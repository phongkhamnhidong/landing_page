type Props = {
  className?: string
  size?: number
}

export default function ClinicLogo({ className = "", size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mother's head */}
      <circle cx="20" cy="8" r="5" fill="#1a3a5c" />

      {/* Mother's body */}
      <path
        d="M10 28 C10 18 14 14 20 14 C26 14 30 18 30 28 L10 28 Z"
        fill="#1a3a5c"
      />

      {/* Left arm cradling baby */}
      <path
        d="M10 28 C8 28 6 30 7 34 C8 37 11 38 14 37 L28 34 C30 33 31 31 30 28"
        fill="#1a3a5c"
      />

      {/* Baby body nestled in arms */}
      <ellipse cx="21" cy="34" rx="7" ry="4.5" fill="#c9973a" />

      {/* Baby head */}
      <circle cx="29" cy="31" r="3.5" fill="#c9973a" />

      {/* Heart / love detail above */}
      <path
        d="M22 11 C22 9.5 23.5 8.5 24.5 9.5 C25.5 8.5 27 9.5 27 11 C27 12.5 24.5 14 24.5 14 C24.5 14 22 12.5 22 11 Z"
        fill="#c9973a"
      />
    </svg>
  )
}
