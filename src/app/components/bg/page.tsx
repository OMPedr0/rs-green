import React from 'react';

interface BackgroundProps {
  imageURL: string; // Change from 'logoURL' to 'imageURL'
  children: React.ReactNode; // Add children
}

export const Background: React.FC<BackgroundProps> = ({ imageURL, children }) => {
  return (
    <div className="bg-gradient-to-b from-green1 to-green2 h-screen relative">
      <img
        src={imageURL} // Use imageURL prop
        alt="Background Image"
        className="w-screen h-screen object-cover"
      />
      {children}
    </div>
  );
};

