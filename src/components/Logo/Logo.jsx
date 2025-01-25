const Logo = ({ size = "40" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200" 
        width={size} 
        height={size}
        className="app-logo"
    >
    <circle cx="100" cy="100" r="90" fill="transparent" stroke="currentColor" strokeWidth="6"/>
    <g fill="currentColor">
        <rect x="85" y="85" width="30" height="30"/>
        <line x1="70" y1="70" x2="130" y2="70" stroke="currentColor" strokeWidth="6"/>
        <line x1="70" y1="130" x2="130" y2="130" stroke="currentColor" strokeWidth="6"/>
        <line x1="70" y1="70" x2="70" y2="130" stroke="currentColor" strokeWidth="6"/>
        <line x1="130" y1="70" x2="130" y2="130" stroke="currentColor" strokeWidth="6"/>
        <circle cx="70" cy="70" r="8"/>
        <circle cx="130" cy="70" r="8"/>
        <circle cx="70" cy="130" r="8"/>
        <circle cx="130" cy="130" r="8"/>
    </g>
    </svg>
);

export default Logo;