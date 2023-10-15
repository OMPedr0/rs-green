import React from 'react';

interface BackgroundProps {
  imageURL: string;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageURL, children }) => {
  return (
    <div className="bg-gradient-to-b from-green1 to-green2 h-screen relative">
      <img
        src={imageURL}
        alt="Background Image"
        className="w-screen h-screen object-cover"
      />
      {children}
    </div>
  );
};

export default Background;
