import React from 'react';

const Loader = ({ time }) => {
  return (
    <div>
      <div className="ring-3">
        <div className="ring-2">
          <div className="ring-1">
            <div className="black-hole" style={{ position: 'relative' }}>
              <div
                className={`timer-inside-hole ${
                  time <= 2 ? 'danger' : time <= 5 ? 'warning' : ''
                }`}
              >
                {time}
              </div>
            </div>
             <div className="container">
        <svg className="crescent crescent-1" viewBox="0 0 50 50">
          <path
            d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
            fill="#ffffff55"
          />
        </svg>
        <svg className="crescent crescent-2" viewBox="0 0 50 50">
          <path
            d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
            fill="#ffffff55"
          />
        </svg>
        <svg className="crescent crescent-3" viewBox="0 0 50 50">
          <path
            d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
            fill="#ffffff55"
          />
        </svg>
        <svg className="crescent crescent-4" viewBox="0 0 50 50">
          <path
            d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
            fill="#ffffff55"
          />
        </svg>
        <svg className="crescent crescent-5" viewBox="0 0 50 50">
          <path
            d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
            fill="#ffffff55"
          />
        </svg>
        <svg className="crescent crescent-6" viewBox="0 0 50 50">
          <path
            d="M 0 0 C 54 50 185 57 226 0 C 198 39 35 32 0 0"
            fill="#ffffff55"
          />
        </svg>
      </div>
            <div className="glow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

