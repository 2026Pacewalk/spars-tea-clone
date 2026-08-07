// Inline SVG payment-brand marks, shown on small white chips so the
// coloured logos stay legible on the dark footer.

function Visa() {
  return (
    <svg viewBox="0 0 48 16" className="h-3.5 w-auto" role="img" aria-label="Visa">
      <text x="24" y="13" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="15" letterSpacing="1" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 40 24" className="h-5 w-auto" role="img" aria-label="Mastercard">
      <circle cx="15" cy="12" r="9" fill="#EB001B" />
      <circle cx="25" cy="12" r="9" fill="#F79E1B" />
      <path d="M20 4.8a9 9 0 0 1 0 14.4 9 9 0 0 1 0-14.4z" fill="#FF5F00" />
    </svg>
  );
}

function Upi() {
  return (
    <svg viewBox="0 0 50 16" className="h-4 w-auto" role="img" aria-label="UPI">
      <polygon points="2,15 6,15 11,1 7,1" fill="#0DA75B" />
      <polygon points="9,15 13,15 18,1 14,1" fill="#F26522" />
      <text x="21" y="12.8" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="12" fill="#1F2A44">UPI</text>
    </svg>
  );
}

function RuPay() {
  return (
    <svg viewBox="0 0 58 16" className="h-3.5 w-auto" role="img" aria-label="RuPay">
      <text x="0" y="13" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="14">
        <tspan fill="#F6821F">Ru</tspan>
        <tspan fill="#0A7B4E">Pay</tspan>
      </text>
    </svg>
  );
}

function Paytm() {
  return (
    <svg viewBox="0 0 60 16" className="h-3.5 w-auto" role="img" aria-label="Paytm">
      <text x="0" y="13" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="14">
        <tspan fill="#002970">Pay</tspan>
        <tspan fill="#00BAF2">tm</tspan>
      </text>
    </svg>
  );
}

const badges = [
  { name: "Visa", Logo: Visa },
  { name: "Mastercard", Logo: Mastercard },
  { name: "UPI", Logo: Upi },
  { name: "RuPay", Logo: RuPay },
  { name: "Paytm", Logo: Paytm },
];

export default function PaymentBadges() {
  return (
    <div className="flex items-center gap-2">
      {badges.map(({ name, Logo }) => (
        <span
          key={name}
          title={name}
          className="h-7 px-2 rounded bg-white grid place-items-center shadow-sm"
        >
          <Logo />
        </span>
      ))}
    </div>
  );
}
