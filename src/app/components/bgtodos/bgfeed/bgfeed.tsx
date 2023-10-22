import React from 'react';

interface BackgroundFeedProps {
  children: React.ReactNode;
}

const BackgroundFeed: React.FC<BackgroundFeedProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-bgpage1 to-bgpage3 h-screen relative">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/rs-green.appspot.com/o/bgfeed.png?alt=media&token=4b319733-4e93-481c-9fbd-2e1a799112f0&_gl=1*1437kzk*_ga*MjAzOTQzNDExMi4xNjkyNzA2OTI1*_ga_CW55HF8NVT*MTY5NzcwOTI2MS4yOS4xLjE2OTc3MDkyODIuMzkuMC4w"
        alt="Background Image"
        className="w-screen absolute top-0 h-screen object-cover"
      />
      {children}
    </div>
  );
};

export default BackgroundFeed;
