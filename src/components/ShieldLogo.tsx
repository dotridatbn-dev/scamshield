interface ShieldLogoProps {
  className?: string;
}

export function ShieldLogo({ className = 'w-8 h-8' }: ShieldLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 3L34 8.8V19.6C34 28.4 28.1 35.7 20 38C11.9 35.7 6 28.4 6 19.6V8.8L20 3Z"
        fill="#0D9488"
      />
      <path
        d="M20 6.2L30.8 10.7V19.5C30.8 26.6 26.2 32.5 20 34.6C13.8 32.5 9.2 26.6 9.2 19.5V10.7L20 6.2Z"
        fill="#0F172A"
        fillOpacity="0.18"
      />
      <path
        d="M14.2 20.6L18.2 24.6L26.5 16.2"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
