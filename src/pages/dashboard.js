//dashboard.js

// import { useEffect, useState } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import axios from 'axios';

// const Dashboard = () => {
//   const [totalDeals, setTotalDeals] = useState(0);

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:8000/api/deals');
//       setTotalDeals(data.length); // Count total deals
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//     }
//   };

//   const chartOptions = {
//     chart: {
//       type: 'bar',
//     },
//     title: {
//       text: 'Total Deals',
//     },
//     xAxis: {
//       categories: ['Deals'], // Single bar category
//     },
//     yAxis: {
//       title: {
//         text: 'Number of Deals',
//       },
//     },
//     series: [
//       {
//         name: 'Total Deals',
//         data: [totalDeals], // Single data point for total deals
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Dashboard</h1>
//       <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//     </div>
//   );
// };


// export default Dashboard;

import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const Dashboard = () => {
  const [totalDeals, setTotalDeals] = useState(0);
  const [winLossRatio, setWinLossRatio] = useState({ wins: 0, losses: 0 });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/deals');
      setTotalDeals(data.length); // Count total deals
      
      // Calculate wins and losses
      const wins = data.filter((deal) => deal.stage === 'closed won').length;
      const losses = data.filter((deal) => deal.stage === 'closed lost').length;
      setWinLossRatio({ wins, losses });
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
      categories: ['Deals'], // Single bar category
    },
    yAxis: {
      title: {
        text: 'Number of Deals',
      },
    },
    series: [
      {
        name: 'Total Deals',
        data: [totalDeals], // Single data point for total deals
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
      categories: ['Wins', 'Losses'], // Categories for wins and losses
    },
    yAxis: {
      title: {
        text: 'Number of Deals',
      },
    },
    series: [
      {
        name: 'Deals',
        data: [winLossRatio.wins, winLossRatio.losses], // Data for wins and losses
      },
    ],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: '2rem' }}>
        <HighchartsReact highcharts={Highcharts} options={totalDealsChartOptions} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={winLossChartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
