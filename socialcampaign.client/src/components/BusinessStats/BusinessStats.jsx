import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BusinessStats.css';
const BusinessStats = () => {
  // Dummy data
  const [data, setData] = useState([
    { date: '2025-01-17', adsPosted: 5, interactions: 12, messages: 7 },
    { date: '2025-01-18', adsPosted: 3, interactions: 15, messages: 8 },
    { date: '2025-01-19', adsPosted: 6, interactions: 20, messages: 12 },
    { date: '2025-01-20', adsPosted: 4, interactions: 18, messages: 10 },
    { date: '2025-01-21', adsPosted: 7, interactions: 25, messages: 15 },
    { date: '2025-01-22', adsPosted: 8, interactions: 30, messages: 20 },
   
  ]);

  return (
    <div className='business-stats-container' style={{ padding: '20px' }}>
      <h3 className='b-stats-heading'>Advertisement Statistics</h3>
      <p>Below is the graph showing the stats of ads, interactions, and messages over the past days.</p>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="adsPosted" stroke="#8884d8" name="Ads Posted" />
            <Line type="monotone" dataKey="interactions" stroke="#82ca9d" name="User Interactions" />
            <Line type="monotone" dataKey="messages" stroke="#ffc658" name="Messages" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BusinessStats;
