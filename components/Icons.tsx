export function GlutenFreeIcon({ className = "w-10 h-10 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="250" cy="250" r="195" stroke="#12BC00" strokeWidth="12" />
      <line x1="112" y1="388" x2="388" y2="112" stroke="#12BC00" strokeWidth="12" strokeLinecap="round" />
      <g fill="#12BC00" stroke="#12BC00" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="250" y1="380" x2="250" y2="130" strokeWidth="10" />
        <path d="M250 105 C232 145, 220 175, 250 200 C280 175, 268 145, 250 105Z" />
        <path d="M250 200 C225 175, 205 155, 175 162 C180 192, 205 210, 250 220Z" />
        <path d="M250 200 C275 175, 295 155, 325 162 C320 192, 295 210, 250 220Z" />
        <path d="M250 255 C225 230, 205 210, 175 217 C180 247, 205 265, 250 275Z" />
        <path d="M250 255 C275 230, 295 210, 325 217 C320 247, 295 265, 250 275Z" />
        <path d="M250 310 C228 288, 212 272, 185 278 C190 305, 212 320, 250 330Z" />
        <path d="M250 310 C272 288, 288 272, 315 278 C310 305, 288 320, 250 330Z" />
      </g>
    </svg>
  );
}

export function NoAddedSugarIcon({ className = "w-10 h-10 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="250" cy="250" r="195" stroke="#12BC00" strokeWidth="14" />
      <line x1="112" y1="388" x2="388" y2="112" stroke="#12BC00" strokeWidth="14" strokeLinecap="round" />
      <g fill="none" stroke="#12BC00" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round">
        <path d="M250 158 L342 208 L342 308 L250 358 L158 308 L158 208 Z" />
        <path d="M158 208 L250 258 L342 208" />
        <path d="M250 258 L250 358" />
      </g>
    </svg>
  );
}
