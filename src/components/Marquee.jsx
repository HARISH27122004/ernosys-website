import React from 'react';
import '../styles/Marquee.css';

const ITEMS = [
  'Innovative AI',
  'Mobile App Development',
  'Space Robotics',
  'EdTech Solutions',
  'Interactive Learning',
  'Eco-Friendly Design',
  'STEM Education',
  'Space Science',
];

// const StarIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="marquee__star">
//     <path
//       d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
//       stroke="#00e5ff"
//       strokeWidth="1.6"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

export default function Marquee() {
  // Duplicate items for seamless loop
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee">
      <div className="marquee__fade marquee__fade--left" />
      <div className="marquee__fade marquee__fade--right" />

      <div className="marquee__track">
        {track.map((item, i) => (
          <React.Fragment key={i}>
            <span className="marquee__item">{item}</span>
            {/* <StarIcon /> */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}