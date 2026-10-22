export default function BrandLogo({ brand, variant = 'default', size = 'md' }) {
  const isLight = variant === 'light';

  if (brand === 'Jeep') {
    return (
      <span
        className={`brand-mark brand-mark-jeep brand-mark-${size} ${
          isLight ? 'is-light' : ''
        }`}
        aria-label="Jeep"
      >
        Jeep<span className="reg-mark">®</span>
      </span>
    );
  }

  if (brand === 'Dodge') {
    return (
      <span
        className={`brand-mark brand-mark-dodge brand-mark-${size} ${
          isLight ? 'is-light' : ''
        }`}
        aria-label="Dodge"
      >
        <span className="dodge-text">DODGE</span>
        <span className="dodge-stripes" aria-hidden="true">
          <i />
          <i />
        </span>
      </span>
    );
  }

  if (brand === 'RAM') {
    return (
      <span
        className={`brand-mark brand-mark-ram brand-mark-${size} ${
          isLight ? 'is-light' : ''
        }`}
        aria-label="RAM"
      >
        <svg
          className="ram-shield"
          viewBox="0 0 28 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 4.5C3 3.67 3.67 3 4.5 3H23.5C24.33 3 25 3.67 25 4.5V15.5C25 21.4 14 27 14 27C14 27 3 21.4 3 15.5V4.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M6.5 11.5C6.5 9 9.5 8 11.5 10.5L14 14L16.5 10.5C18.5 8 21.5 9 21.5 11.5C21.5 13.8 18.8 14.5 17.5 13.5M10.5 13.5C9.2 14.5 6.5 13.8 6.5 11.5ZM14 14V21.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ram-text">RAM</span>
      </span>
    );
  }

  return <span>{brand}</span>;
}
