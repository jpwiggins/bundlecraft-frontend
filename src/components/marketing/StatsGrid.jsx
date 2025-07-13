import React from 'react';

const StatsGrid = () => {
  const stats = [
    { value: '15%', label: 'Bundle Discount' },
    { value: '2-8', label: 'Products/Bundle' },
    { value: '$50+', label: 'Bundle Value' },
    { value: '95%', label: 'Customer Assistance' }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
