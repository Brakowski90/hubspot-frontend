// //src/pages/dashboard.js

import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const Dashboard = () => {
  const [totalDeals, setTotalDeals] = useState(0);
  const [winLossRatio, setWinLossRatio] = useState({ wins: 0, losses: 0 });
  const [avgDealTime, setAvgDealTime] = useState(0);
  const [topDeals, setTopDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/deals');
      setTotalDeals(data.length);

      // Calculate wins and losses
      const wins = data.filter((deal) => deal.stage === 'closed won').length;
      const losses = data.filter((deal) => deal.stage === 'closed lost').length;
      setWinLossRatio({ wins, losses });

      // Calculate the average deal time (in days) for "closed won" and "closed lost" deals
      const closedDeals = data.filter(deal => deal.stage === 'closed won' || deal.stage === 'closed lost');
      const totalTime = closedDeals.reduce((acc, deal) => {
        let dealTime = 0;
        if (deal.dateCreated) {
          // Use closedDate for closed won and closed lost deals
          const closeDate = deal.closedDate ? new Date(deal.closedDate) : new Date();
          dealTime = (closeDate - new Date(deal.dateCreated)) / (1000 * 3600 * 24); // Convert ms to days
        }
        return acc + dealTime;
      }, 0);

      const avgTime = closedDeals.length > 0 ? Math.round(totalTime / closedDeals.length) : 0; // Round to nearest day
      setAvgDealTime(avgTime); // Set the rounded average time

      // Sort deals by amount and get the top 3
      const sortedDeals = data.filter(deal => deal.amount).sort((a, b) => b.amount - a.amount); // Sorting by amount in descending order
      const top3Deals = sortedDeals.slice(0, 3); // Get the top 3 deals
      setTopDeals(top3Deals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const totalDealsChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Total Deals',
    },
    xAxis: {
      categories: ['Deals'],
    },
    yAxis: {
      title: {
        text: 'Number of Deals',
      },
    },
    series: [
      {
        name: 'Total Deals',
        data: [totalDeals],
      },
    ],
  };

  const winLossChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Win to Loss Ratio',
    },
    xAxis: {
      categories: ['Wins', 'Losses'],
    },
    yAxis: {
      title: {
        text: 'Number of Deals',
      },
    },
    series: [
      {
        name: 'Deals',
        data: [winLossRatio.wins, winLossRatio.losses],
      },
    ],
  };

  const topDealsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Top 3 Deals by Value',
    },
    xAxis: {
      categories: topDeals.map((deal) => deal.name), // Using deal names as categories
    },
    yAxis: {
      title: {
        text: 'Deal Value',
      },
    },
    series: [
      {
        name: 'Deal Amount',
        data: topDeals.map((deal) => deal.amount), // Using deal amounts as data
      },
    ],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
          <HighchartsReact highcharts={Highcharts} options={totalDealsChartOptions} />
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
          <HighchartsReact highcharts={Highcharts} options={winLossChartOptions} />
        </div>
        <div
          style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {winLossRatio.wins > 0 || winLossRatio.losses > 0 ? (
            <>
              <h3>Average Time of Deal</h3>
              <p style={{ fontSize: '24px' }}>{avgDealTime} days</p>
            </>
          ) : (
            <p>No closed deals available to calculate average time.</p>
          )}
        </div>
        <div
          style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <HighchartsReact highcharts={Highcharts} options={topDealsChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
