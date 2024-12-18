import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );
}

export default LoadingSpinner;