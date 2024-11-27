  // GlassContainer.js
  import React from 'react';
  import '../Assets/GlassContainer.css'; 

  const GlassContainer = ({ children }) => {
    return (
      <div className="glass-container">
        {children}
      </div>
    );
  };

  export default GlassContainer;
