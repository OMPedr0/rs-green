import React from 'react';

interface BackgroundProps {
  imageURL: string;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageURL, children }) => {
  return (
    <div className="bg-gradient-to-b from-green1 to-green2 h-screen relative">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/green-team-hackatoon.appspot.com/o/bg.png?alt=media&token=cd3fe099-c15c-4d48-a46a-1a1b5d3c80af&_gl=1*1buekgm*_ga*MjAzOTQzNDExMi4xNjkyNzA2OTI1*_ga_CW55HF8NVT*MTY5NzM2OTkyOS4yNS4xLjE2OTczNjk5NDguNDEuMC4w"
        alt="Background Image"
        className="w-screen h-screen object-cover"
      />
      {children}
    </div>
  );
};

export default Background;
