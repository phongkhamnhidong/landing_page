type Props = {
  className?: string
  size?: number
}

export default function ClinicLogo({ className = "", size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Mother ── */}

      {/* Hair flowing back */}
      <path
        d="M16 10 C14 4 18 1 24 1 C30 1 35 4 34 10 C36 8 36 4 33 2 C30 -1 18 -1 15 2 C12 5 13 9 16 10 Z"
        fill="#1a3a5c"
      />

      {/* Mother face */}
      <ellipse cx="24" cy="11" rx="7" ry="8" fill="#e8d5c4" />

      {/* Hair on sides / top */}
      <path
        d="M17 8 C16 3 20 0 24 0 C28 0 32 3 31 8 C30 5 27 3 24 3 C21 3 18 5 17 8 Z"
        fill="#1a3a5c"
      />

      {/* Mother eye left */}
      <ellipse cx="21" cy="10" rx="1" ry="1.2" fill="#1a3a5c" />
      {/* Mother eye right */}
      <ellipse cx="27" cy="10" rx="1" ry="1.2" fill="#1a3a5c" />

      {/* Gentle smile */}
      <path
        d="M21.5 14 Q24 16 26.5 14"
        stroke="#1a3a5c"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Neck */}
      <rect x="22" y="19" width="4" height="4" rx="1" fill="#e8d5c4" />

      {/* Mother shoulder / body */}
      <path
        d="M8 44 C8 32 13 23 24 23 C35 23 42 32 42 44 Z"
        fill="#1a3a5c"
      />

      {/* Left arm curved down to cradle baby */}
      <path
        d="M8 44 C5 44 3 48 5 52 C6 55 10 56 14 55 L36 52 C39 51 41 48 40 44"
        fill="#1a3a5c"
      />

      {/* ── Baby ── */}

      {/* Baby body swaddled */}
      <ellipse cx="24" cy="52" rx="10" ry="5" fill="#c9973a" opacity="0.95" />

      {/* Baby head */}
      <circle cx="36" cy="48" r="5" fill="#e8d5c4" />

      {/* Baby hair tuft */}
      <path
        d="M33 43 C34 41 38 41 39 43"
        stroke="#1a3a5c"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Baby eye */}
      <ellipse cx="35" cy="48" rx="0.8" ry="0.9" fill="#1a3a5c" />

      {/* Baby tiny smile */}
      <path
        d="M34 50.5 Q36 52 38 50.5"
        stroke="#1a3a5c"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Gold heart above — love between mom and baby */}
      <path
        d="M26 19 C26 17 27.5 16 28.5 17 C29.5 16 31 17 31 19 C31 21 28.5 23 28.5 23 C28.5 23 26 21 26 19 Z"
        fill="#c9973a"
      />
    </svg>
  )
}
