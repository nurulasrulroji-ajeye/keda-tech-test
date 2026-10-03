export default function HeroBlob() {
  return (
    <svg
      className="hero__blob"
      viewBox="0 0 570 340"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0066ff" />
          <stop offset="100%" stopColor="#c39ae0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#blobGradient)"
        d="M0 340V260C0 200 50 170 110 168C170 166 190 150 230 110C260 80 300 70 330 90C355 105 380 130 410 110C440 90 450 40 480 20C510 5 540 0 570 0V340Z"
      />
      <circle className="hero__circle" cx="186" cy="108" r="30" fill="#3b6ff5" />
      <circle className="hero__circle hero__circle--b" cx="374" cy="14" r="18" fill="#8b8de8" />
    </svg>
  );
}
