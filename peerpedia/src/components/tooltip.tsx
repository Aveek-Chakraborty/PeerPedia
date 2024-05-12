"use client"
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(3,7,34,0.95)', // Darker blue shade
            color: '#fff',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 999,
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '350px', // Minimum width
            minHeight: '50px', // Minimum height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', // Align text to the left
            textAlign: 'left', // Text aligned to the left
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc', 
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

