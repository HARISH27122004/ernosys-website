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

export default function Marquee({direction = "left"}) {
  // Duplicate items for seamless loop
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee">
      <div className="marquee__fade marquee__fade--left" />
      <div className="marquee__fade marquee__fade--right" />

      <div className="marquee__track" data-direction={direction}>
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