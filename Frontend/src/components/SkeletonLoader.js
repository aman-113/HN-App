import React from 'react';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton" style={{ width: 16, height: 14, marginTop: 3 }} />
    <div style={{ flex: 1 }}>
      <div className="skeleton" style={{ height: 14, width: '75%', marginBottom: 8 }} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div className="skeleton" style={{ height: 11, width: 50 }} />
        <div className="skeleton" style={{ height: 11, width: 80 }} />
        <div className="skeleton" style={{ height: 11, width: 60 }} />
      </div>
    </div>
  </div>
);

const SkeletonLoader = ({ count = 10 }) => (
  <div className="story-list">
    {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default SkeletonLoader;
