import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon

interface ImageCardProps {
  imageUrl: string;
  closeImageCard: () => void;
}

export function ImageCard({ imageUrl, closeImageCard }: ImageCardProps) {
  return (
    <div className="image-card">
      <div className="image-card-header">
        <button className="image-card-close" onClick={closeImageCard}>
          <FaTimes />
        </button>
      </div>
      <img src={imageUrl} alt="Large Image" className="image-card-image" />
    </div>
  );
}
