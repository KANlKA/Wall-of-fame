import React, { useState, useRef, useEffect } from 'react';
import './main.css'; // Ensure your CSS file is imported

// FameEntry Component
const FameEntry = ({ entry }) => (
  <div className="fame-entry">
    <img src={entry.image} alt={entry.name} />
    <div className="fame-entry-info">
      <h2>{entry.name}</h2>
      <p>{entry.description}</p>
    </div>
  </div>
);

// WallOfFame Component
const WallOfFame = ({ entries }) => (
  <div className="wall-of-fame">
    <div className="fame-entries">
      {entries.map((entry, index) => (
        <FameEntry key={index} entry={entry} />
      ))}
    </div>
  </div>
);

// Card Component with hover effect
const Card = ({ dataImage, header, content }) => {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    setDimensions({
      width: cardRef.current.offsetWidth,
      height: cardRef.current.offsetHeight
    });
  }, []);

  const handleMouseMove = (e) => {
    const mouseX = e.pageX - cardRef.current.offsetLeft - dimensions.width / 2;
    const mouseY = e.pageY - cardRef.current.offsetTop - dimensions.height / 2;
    setMousePosition({ mouseX, mouseY });
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    mouseLeaveDelay = setTimeout(() => {
      setMousePosition({ mouseX: 0, mouseY: 0 });
    }, 1000);
  };

  let mouseLeaveDelay;

  const mousePX = mousePosition.mouseX / dimensions.width;
  const mousePY = mousePosition.mouseY / dimensions.height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`
  };

  const cardBgImage = {
    backgroundImage: `url(${dataImage})`
  };

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
        <div className="card-info">
          <h1>{header}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

// Sample Data for Wall of Fame
const sampleEntries = [
  {
    name: 'A',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'B',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'C',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'E',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://via.placeholder.com/150'
  }
  // Add more entries as needed
];

// HallOfFame Component
const HallOfFame = () => (
  <header>
    <nav className="main-nav">
      <div className="nav-container">
        <h1>Hall of Fame</h1>
      </div>
    </nav>
  </header>
);

// App Component
const App = () => (
  <div>
    <HallOfFame />
    <WallOfFame entries={sampleEntries} />
    <div className="container">
      <Card dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=" header="Mountains" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1479659929431-442107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=" header="b" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1479644025832-60dab8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=" header="c" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1479621051492-5af9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=" header="d" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1478854194861-81c3b17ab5d9?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=" header="e" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1478428038421-5d20c72f515f?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=" header="f" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1477954606409-87fbd512b42c?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=" header="g" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
      <Card dataImage="https://images.unsplash.com/photo-1477765331951-b7164a09f71b?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=" header="h" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
    </div>
  </div>
);

export default App;
