// import React from "react";

// interface LogoProps {
//     size?: "sm" | "md" | "lg";
//     className?: string;
// }

// const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
//     const sizes = {
//         sm: "w-8 h-8",
//         md: "w-12 h-12",
//         lg: "w-16 h-16",
//     };

//     return (
//         <svg
//             viewBox="0 0 256 256"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className={`${sizes[size]} ${className}`}
//         >
//             <defs>
//                 <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#ffd700" />
//                     <stop offset="100%" stopColor="#ffed4e" />
//                 </linearGradient>
//                 <filter id="glow">
//                     <feGaussianBlur stdDeviation="2" result="coloredBlur" />
//                     <feMerge>
//                         <feMergeNode in="coloredBlur" />
//                         <feMergeNode in="SourceGraphic" />
//                     </feMerge>
//                 </filter>
//             </defs>

//             {/* Background */}
//             <rect width="256" height="256" fill="#0a0e27" rx="32" />

//             {/* Outer glow circle */}
//             <circle cx="128" cy="128" r="115" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.4" />

//             {/* Bat Symbol Group */}
//             <g transform="translate(128, 128)">
//                 {/* Left Wing - Inner */}
//                 <path
//                     d="M -25 -10 Q -50 -20 -70 -8 Q -75 -2 -68 8 Q -50 22 -25 15 L -25 -10 Z"
//                     fill="#1a1f3a"
//                     stroke="#ffd700"
//                     strokeWidth="1.5"
//                 />

//                 {/* Left Wing - Outer Detail */}
//                 <path
//                     d="M -68 8 Q -72 12 -75 18"
//                     fill="none"
//                     stroke="#ffd700"
//                     strokeWidth="1"
//                     opacity="0.6"
//                 />

//                 {/* Right Wing - Inner */}
//                 <path
//                     d="M 25 -10 Q 50 -20 70 -8 Q 75 -2 68 8 Q 50 22 25 15 L 25 -10 Z"
//                     fill="#1a1f3a"
//                     stroke="#ffd700"
//                     strokeWidth="1.5"
//                 />

//                 {/* Right Wing - Outer Detail */}
//                 <path
//                     d="M 68 8 Q 72 12 75 18"
//                     fill="none"
//                     stroke="#ffd700"
//                     strokeWidth="1"
//                     opacity="0.6"
//                 />

//                 {/* Body */}
//                 <path
//                     d="M -12 -8 Q -15 10 -10 30 Q 0 35 10 30 Q 15 10 12 -8 Z"
//                     fill="#1a1f3a"
//                     stroke="#ffd700"
//                     strokeWidth="1.5"
//                 />

//                 {/* Head */}
//                 <circle cx="0" cy="-25" r="14" fill="#1a1f3a" stroke="#ffd700" strokeWidth="1.5" />

//                 {/* Left Ear */}
//                 <path
//                     d="M -7 -38 Q -10 -52 -5 -58 Q -1 -55 -4 -45 Z"
//                     fill="#1a1f3a"
//                     stroke="#ffd700"
//                     strokeWidth="1.5"
//                 />

//                 {/* Right Ear */}
//                 <path
//                     d="M 7 -38 Q 10 -52 5 -58 Q 1 -55 4 -45 Z"
//                     fill="#1a1f3a"
//                     stroke="#ffd700"
//                     strokeWidth="1.5"
//                 />

//                 {/* Eyes - Large glowing eyes */}
//                 <circle cx="-4" cy="-28" r="3" fill="#ffd700" />
//                 <circle cx="4" cy="-28" r="3" fill="#ffd700" />

//                 {/* Eye glow effect */}
//                 <circle cx="-4" cy="-28" r="5" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.4" />
//                 <circle cx="4" cy="-28" r="5" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.4" />

//                 {/* Initials "AS" with code styling */}
//                 <text
//                     x="0"
//                     y="8"
//                     fontFamily="'Courier New', monospace"
//                     fontSize="18"
//                     fontWeight="bold"
//                     fill="#ffd700"
//                     textAnchor="middle"
//                     dominantBaseline="middle"
//                     letterSpacing="2"
//                 >
//                     AS
//                 </text>

//                 {/* Bat mouth/smile line */}
//                 <path d="M -6 -18 Q 0 -15 6 -18" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.7" />
//             </g>

//             {/* Code brackets - top left */}
//             <text x="12" y="20" fontFamily="'Courier New', monospace" fontSize="11" fill="#ffd700" opacity="0.5">
//                 &lt;
//             </text>

//             {/* Code brackets - top right */}
//             <text x="228" y="20" fontFamily="'Courier New', monospace" fontSize="11" fill="#ffd700" opacity="0.5">
//                 /&gt;
//             </text>

//             {/* Decorative lines */}
//             <line x1="50" y1="245" x2="80" y2="245" stroke="#ffd700" strokeWidth="1" opacity="0.3" />
//             <line x1="176" y1="245" x2="206" y2="245" stroke="#ffd700" strokeWidth="1" opacity="0.3" />
//             x = "128"
//             y = "165"
//             fontFamily = "'Poppins', 'Segoe UI', sans-serif"
//             fontSize = "42"
//             fontWeight = "700"
//             fill = "url(#premiumGold)"
//             textAnchor = "middle"
//             dominantBaseline = "middle"
//             letterSpacing = "2"
//             filter = "url(#premiumGlow)"
//     >
//             AS
//         </text >

//     {/* Bottom accent line */ }
//     < line x1="88" y1="190" x2="168" y2="190" stroke="url(#premiumGold)" strokeWidth="1" opacity="0.8" />

//     {/* DEV label */ }
//     < text
//         x="128"
//         y="210"
//         fontFamily="'Courier New', monospace"
//         fontSize="9"
//         fontWeight="600"
//         fill="url(#premiumGold)"
//         textAnchor="middle"
//         opacity="0.8"
//         letterSpacing="2"
//     >
//         DEVELOPER
//     </text >
//         </svg >
//     );
// };

// export default Logo;
