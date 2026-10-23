const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '584125554440';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20les%20escribo%20desde%20la%20web%20de%20R%C3%BAsticos%20Motors%20Maracaibo.%20Deseo%20informaci%C3%B3n%20sobre%20un%20veh%C3%ADculo.`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-btn"
      aria-label="Atención directa por WhatsApp en Maracaibo"
      title="Atención inmediata por WhatsApp — Sede Maracaibo"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span className="wa-float-label">WhatsApp Maracaibo</span>
    </a>
  );
}
