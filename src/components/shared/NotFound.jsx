import React from 'react';

const NotFound = ({ 
  title = "Not Found",
  message = "The requested resource could not be found",
  className = ""
}) => {
  return (
    <div className={`min-h-[50vh] w-full flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-6 p-6">
        <svg 
          className="w-32 h-32 text-light-3" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-light-2 mb-2">
            {title}
          </h2>
          <p className="text-light-3">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;