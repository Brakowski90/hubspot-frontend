// //src/pages/deals.js

import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

const ItemType = 'DEAL';
const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({ name: '', amount: '', dateCreated: '' });
  const [avgDealTime, setAvgDealTime] = useState(0);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    if (deals.length > 0) {
      calculateAvgDealTime();
    }
  }, [deals]);

  const fetchDeals = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/deals');
      setDeals(data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const addNewDeal = async () => {
    if (!newDeal.name || !newDeal.amount || !newDeal.dateCreated) return;
    try {
      const { data } = await axios.post('http://localhost:8000/api/deals', {
        ...newDeal,
        stage: 'initiated',
      });
      setDeals([...deals, data]);
      setNewDeal({ name: '', amount: '', dateCreated: '' });
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const moveDeal = async (id, newStage) => {
    try {
      const deal = deals.find((deal) => deal._id === id);
      const updatedDeals = deals.map((deal) =>
        deal._id === id ? { ...deal, stage: newStage } : deal
      );
      setDeals(updatedDeals);
      await axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage });
    } catch (error) {
      console.error('Error updating deal stage:', error);
    }
  };

  const deleteDeal = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deals/${id}`);
      setDeals(deals.filter((deal) => deal._id !== id));
    } catch (error) {
      console.error('Error deleting deal:', error);
    }
  };

  const calculateAvgDealTime = () => {
    const totalDealTime = deals.reduce((acc, deal) => {
      let dealTime = 0;
      if (deal.dateCreated) {
        const createdDate = new Date(deal.dateCreated);
        let endDate = new Date(); // Default to today's date for open deals

        if (deal.stage === 'closed won' || deal.stage === 'closed lost') {
          // For closed deals, use the closed date or today's date if not available
          endDate = deal.closedDate ? new Date(deal.closedDate) : endDate;
        }

        // Calculate the time difference in days
        dealTime = (endDate - createdDate) / (1000 * 3600 * 24);
      }

      return acc + dealTime;
    }, 0);

    const averageTime = totalDealTime / deals.length;
    setAvgDealTime(averageTime.toFixed(2)); // Set the average time in days
  };

  const StageColumn = ({ stage, deals }) => {
    const [, drop] = useDrop({
      accept: ItemType,
      drop: (item) => moveDeal(item.id, stage),
    });

    return (
      <div
        ref={drop}
        style={{
          flex: 1,
          padding: '1rem',
          border: '1px solid #ccc',
          margin: '0.5rem',
          minHeight: '100px',
        }}
      >
        <h3>{stage.toUpperCase()}</h3>
        {deals.map((deal) => (
          <DealCard key={deal._id} deal={deal} />
        ))}
      </div>
    );
  };

  const DealCard = ({ deal }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { id: deal._id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        style={{
          padding: '1rem',
          margin: '0.5rem',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          cursor: 'grab',
          opacity: isDragging ? 0.5 : 1,
          position: 'relative',
        }}
      >
        <button
          onClick={() => deleteDeal(deal._id)}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
        <div>Name: {deal.name}</div>
        <div>Amount: ${deal.amount}</div>
        <div>Date: {new Date(deal.dateCreated).toLocaleDateString()}</div>
      </div>
    );
  };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ padding: '1rem' }}>
//         <h1>Deal Management</h1>
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={newDeal.name}
//             onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={newDeal.amount}
//             onChange={(e) => setNewDeal({ ...newDeal, amount: e.target.value })}
//           />
//           <input
//             type="date"
//             value={newDeal.dateCreated}
//             onChange={(e) => setNewDeal({ ...newDeal, dateCreated: e.target.value })}
//           />
//           <button onClick={addNewDeal}>Create Deal</button>
//         </div>
//         <div style={{ display: 'flex', marginTop: '1rem' }}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//             />
//           ))}
//         </div>
//         <div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

return (
  <DndProvider backend={HTML5Backend}>
    <div style={{ padding: '1rem' }}>
      <h1>Deal Management</h1>

      <button
        onClick={() => setShowInputs(!showInputs)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        {showInputs ? 'Hide Form' : 'Create Deal'}
      </button>

      {showInputs && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newDeal.name}
            onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newDeal.amount}
            onChange={(e) => setNewDeal({ ...newDeal, amount: e.target.value })}
          />
          <input
            type="date"
            value={newDeal.dateCreated}
            onChange={(e) => setNewDeal({ ...newDeal, dateCreated: e.target.value })}
          />
          <button onClick={addNewDeal}>Submit Deal</button>
        </div>
      )}

      <div style={{ display: 'flex', marginTop: '1rem' }}>
        {stages.map((stage) => (
          <StageColumn
            key={stage}
            stage={stage}
            deals={deals.filter((deal) => deal.stage === stage)}
          />
        ))}
      </div>
    </div>
  </DndProvider>
);
}