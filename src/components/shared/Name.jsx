
import { BadgeCheck } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Name = ({ creator, isverified, size, className = "" }) => {
  const location = useLocation(); // Get the location object
  const pathname = location?.pathname; // Access the pathname property
  const isProfilePage = pathname?.startsWith('/profile/'); // Check if on profile page

  return (
    <div
      className={`flex items-center gap-2
        ${isProfilePage ? 'justify-center xl:justify-start ' : 'justify-start'}
        ${className}`}
    >
      <p className={className}>
        {creator}
      </p>
      {isverified && (
        <div>
          <BadgeCheck 
            className='fill-current text-primary-500'
            size={size} 
            strokeWidth={2} 
            stroke="#e0e0e0"
          />
        </div>
      )}
    </div>
  );
};

export default Name;
