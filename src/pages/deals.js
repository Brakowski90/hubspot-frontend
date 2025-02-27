// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Deals = () => {
//   const [deals, setDeals] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Deals</h1>
//       <ul>
//         {deals.map((deal) => (
//           <li key={deal._id}>{deal.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Deals;

// 'use client';

// import { useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// //import styles from './deals.module.css';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Stages for deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   // Initial deals state
//   const [deals, setDeals] = useState([
//     { id: '1', name: 'Deal 1', stage: 'initiated' },
//     { id: '2', name: 'Deal 2', stage: 'qualified' },
//     { id: '3', name: 'Deal 3', stage: 'contract sent' }
//   ]);

//   const [newDealName, setNewDealName] = useState('');

//   // Add a new deal
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { id: (deals.length + 1).toString(), name: newDealName, stage: 'initiated' };
//     setDeals([...deals, newDeal]);
//     setNewDealName('');
//   };

//   // Move deal between stages
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal.id === id ? { ...deal, stage: newStage } : deal
//       )
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className={styles.container}>
//         <h1>Manage Deals</h1>

//         {/* Form to add new deal */}
//         <div className={styles.newDealForm}>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         {/* Deals board */}
//         <div className={styles.dealsBoard}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div className={styles.stageColumn} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal.id} deal={deal} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal.id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       className={`${styles.dealCard} ${isDragging ? styles.dragging : ''}`}
//     >
//       <h3>{deal.name}</h3>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   // Hardcoded initial deal
//   const [deals, setDeals] = useState([
//     { id: '1', name: 'Deal 1', stage: 'initiated' }
//   ]);

//   const [newDealName, setNewDealName] = useState('');

//   // Add a new deal
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { id: (deals.length + 1).toString(), name: newDealName, stage: 'initiated' };
//     setDeals([...deals, newDeal]);
//     setNewDealName('');
//   };

//   // Move deal between stages
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal.id === id ? { ...deal, stage: newStage } : deal
//       )
//     );
//   };

//   // Basic styling object
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     width: '100%',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//   };

//   const dealCardStyle = {
//     padding: '0.5rem',
//     margin: '0.5rem 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal.id} deal={deal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal.id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <h3>{deal.name}</h3>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         // Add the newly added deal to the deals list
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Move deal between stages
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal.id === id ? { ...deal, stage: newStage } : deal
//       )
//     );
//   };

//   // Basic styling object
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     width: '100%',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//   };

//   const dealCardStyle = {
//     padding: '0.5rem',
//     margin: '0.5rem 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal.id} deal={deal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal.id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <h3>{deal.name}</h3>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages for the deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         // Add the newly added deal to the deals list
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Move deal between stages and update on backend
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal.id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     // Update the backend with the new stage
//     axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage })
//       .catch((error) => console.error('Error updating deal stage:', error));
//   };

//   // Basic styling object
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     width: '100%',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//   };

//   const dealCardStyle = {
//     padding: '0.5rem',
//     margin: '0.5rem 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal.id} deal={deal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal.id },  // Use the unique deal ID here
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <h3>{deal.name}</h3>
//     </div>
// }

// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages for the deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         // Add the newly added deal to the deals list
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Move deal between stages and update on backend
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     // Update the backend with the new stage
//     axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage })
//       .catch((error) => console.error('Error updating deal stage:', error));
//   };

//   // Delete a deal
//   const deleteDeal = (id) => {
//     axios.delete(`http://localhost:8000/api/deals/${id}`)
//       .then(() => {
//         // Remove the deal from the local state
//         setDeals(deals.filter(deal => deal._id !== id));
//       })
//       .catch((error) => console.error('Error deleting deal:', error));
//   };

//   // Basic styling object
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     width: '100%',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//   };

//   const dealCardStyle = {
//     padding: '0.5rem',
//     margin: '0.5rem 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               deleteDeal={deleteDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, deleteDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal._id} deal={deal} deleteDeal={deleteDeal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, deleteDeal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal._id },  // Use the unique deal ID here
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <span>{deal.name}</span>
//       <button onClick={() => deleteDeal(deal._id)} style={{ marginLeft: 'auto', color: 'red' }}>X</button>
//     </div>
//   );
// // }import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// const ItemType = 'DEAL';
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');
//   const [associatedCompany, setAssociatedCompany] = useState('');

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/deals');
//       console.log('Fetched deals:', response.data);
//       setDeals(response.data);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//     }
//   };

//   const addNewDeal = async () => {
//     if (newDealName.trim() === '' || associatedCompany.trim() === '') {
//       console.log('Both name and associated company are required to add a deal.');
//       return;
//     }

//     const newDeal = { name: newDealName, associatedCompany, stage: 'initiated' };
//     console.log('Adding new deal:', newDeal);

//     try {
//       const response = await axios.post('http://localhost:8000/api/deals', newDeal);
//       console.log('Deal added successfully:', response.data);
//       setDeals([...deals, response.data]);
//       setNewDealName('');
//       setAssociatedCompany('');
//     } catch (error) {
//       console.error('Error adding deal:', error);
//     }
//   };

//   const moveDeal = async (id, newStage) => {
//     console.log(`Moving deal with ID ${id} to stage ${newStage}`);
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     try {
//       const response = await axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage });
//       console.log('Deal stage updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating deal stage:', error);
//     }
//   };

//   const deleteDeal = async (id) => {
//     console.log(`Deleting deal with ID ${id}`);

//     try {
//       await axios.delete(`http://localhost:8000/api/deals/${id}`);
//       console.log(`Deal with ID ${id} deleted successfully`);
//       setDeals(deals.filter((deal) => deal._id !== id));
//     } catch (error) {
//       console.error('Error deleting deal:', error);
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <h1>Manage Deals</h1>

//         {/* Form to add new deal */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Enter Associated Company"
//             value={associatedCompany}
//             onChange={(e) => setAssociatedCompany(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         {/* Deals Board */}
//         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               deleteDeal={deleteDeal}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// function StageColumn({ stage, deals, moveDeal, deleteDeal }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => {
//       console.log(`Dropped deal ID ${item.id} into stage ${stage}`);
//       moveDeal(item.id, stage);
//     },
//   });

//   return (
//     <div ref={drop} style={{ padding: '1rem', border: '1px solid #ccc' }}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal._id} deal={deal} deleteDeal={deleteDeal} />
//       ))}
//     </div>
//   );
// }

// function DealCard({ deal, deleteDeal }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal._id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         padding: '0.5rem',
//         margin: '0.5rem 0',
//         backgroundColor: '#f9f9f9',
//         border: '1px solid #ddd',
//         opacity: isDragging ? 0.5 : 1,
//         display: 'flex',
//         justifyContent: 'space-between',
//       }}
//     >
//       <span>{deal.name} ({deal.associatedCompany})</span>
//       <button onClick={() => deleteDeal(deal._id)} style={{ color: 'red' }}>
//         Delete
//       </button>
//     </div>
//   );
// }













































// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages for the deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');
//   const [newDealAmount, setNewDealAmount] = useState('');
//   const [newDealDate, setNewDealDate] = useState('');
//   const [editingDealId, setEditingDealId] = useState(null);

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         // Add the newly added deal to the deals list
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//         setEditingDealId(response.data._id); // Start editing the newly added deal
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Update amount and date for a deal
//   const updateDeal = (id) => {
//     if (!newDealAmount || !newDealDate) {
//       console.error('Amount and date are required');
//       return;
//     }

//     const updatedDeal = {
//       amount: newDealAmount,
//       dateCreated: newDealDate,
//     };

//     axios.put(`http://localhost:8000/api/deals/${id}`, updatedDeal)
//       .then(() => {
//         setDeals(deals.map(deal =>
//           deal._id === id ? { ...deal, amount: newDealAmount, dateCreated: newDealDate } : deal
//         ));
//         setNewDealAmount('');
//         setNewDealDate('');
//         setEditingDealId(null); // Stop editing after update
//       })
//       .catch((error) => console.error('Error updating deal:', error));
//   };

//   // Move deal between stages and update on backend
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     // Update the backend with the new stage
//     axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage })
//       .catch((error) => console.error('Error updating deal stage:', error));
//   };

//   // Delete a deal
//   const deleteDeal = (id) => {
//     axios.delete(`http://localhost:8000/api/deals/${id}`)
//       .then(() => {
//         // Remove the deal from the local state
//         setDeals(deals.filter(deal => deal._id !== id));
//       })
//       .catch((error) => console.error('Error deleting deal:', error));
//   };

//   // Basic styling object
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     width: '100%',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//   };

//   const dealCardStyle = {
//     padding: '0.5rem',
//     margin: '0.5rem 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//           />
//           <button onClick={addNewDeal}>Add Deal</button>
//         </div>

//         {/* Display new deal form for amount and date when a deal is in 'initiated' */}
//         {editingDealId && (
//           <div>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newDealAmount}
//               onChange={(e) => setNewDealAmount(e.target.value)}
//             />
//             <input
//               type="date"
//               placeholder="Date"
//               value={newDealDate}
//               onChange={(e) => setNewDealDate(e.target.value)}
//             />
//             <button onClick={() => updateDeal(editingDealId)}>Update Deal</button>
//           </div>
//         )}

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               deleteDeal={deleteDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, deleteDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal._id} deal={deal} deleteDeal={deleteDeal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, deleteDeal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal._id },  // Use the unique deal ID here
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <span>{deal.name}</span>
//       <span>{deal.amount ? `$${deal.amount}` : 'No amount set'}</span>
//       <span>{deal.dateCreated ? new Date(deal.dateCreated).toLocaleDateString() : 'No date set'}</span>
//       <button onClick={() => deleteDeal(deal._id)} style={{ marginLeft: 'auto', color: 'red' }}>X</button>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// const ItemType = 'DEAL';
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDeal, setNewDeal] = useState({ name: '', amount: '', dateCreated: '' });

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:8000/api/deals');
//       setDeals(data);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//     }
//   };

//   const addNewDeal = async () => {
//     if (!newDeal.name || !newDeal.amount || !newDeal.dateCreated) return;
//     try {
//       const { data } = await axios.post('http://localhost:8000/api/deals', {
//         ...newDeal,
//         stage: 'initiated',
//       });
//       setDeals([...deals, data]);
//       setNewDeal({ name: '', amount: '', dateCreated: '' });
//     } catch (error) {
//       console.error('Error adding deal:', error);
//     }
//   };

//   const moveDeal = async (id, newStage) => {
//     try {
//       const updatedDeals = deals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       );
//       setDeals(updatedDeals);
//       await axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage });
//     } catch (error) {
//       console.error('Error updating deal stage:', error);
//     }
//   };

//   const StageColumn = ({ stage, deals }) => {
//     const [, drop] = useDrop({
//       accept: ItemType,
//       drop: (item) => moveDeal(item.id, stage),
//     });

//     return (
//       <div
//         ref={drop}
//         style={{
//           flex: 1,
//           padding: '1rem',
//           border: '1px solid #ccc',
//           margin: '0.5rem',
//           minHeight: '100px',
//         }}
//       >
//         <h3>{stage.toUpperCase()}</h3>
//         {deals.map((deal) => (
//           <DealCard key={deal._id} deal={deal} />
//         ))}
//       </div>
//     );
//   };

//   const DealCard = ({ deal }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemType,
//       item: { id: deal._id },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     return (
//       <div
//         ref={drag}
//         style={{
//           padding: '1rem',
//           margin: '0.5rem',
//           backgroundColor: '#f9f9f9',
//           border: '1px solid #ddd',
//           cursor: 'grab',
//           opacity: isDragging ? 0.5 : 1,
//         }}
//       >
//         <div>Name: {deal.name}</div>
//         <div>Amount: ${deal.amount}</div>
//         <div>Date: {new Date(deal.dateCreated).toLocaleDateString()}</div>
//       </div>
//     );
//   };

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
//       </div>
//     </DndProvider>
//   );
// // }
// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// const ItemType = 'DEAL';
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDeal, setNewDeal] = useState({ name: '', amount: '', dateCreated: '' });

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:8000/api/deals');
//       console.log('Deals data:', data); 
//       setDeals(data);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//     }
//   };

//   const addNewDeal = async () => {
//     if (!newDeal.name || !newDeal.amount || !newDeal.dateCreated) return;
//     try {
//       const { data } = await axios.post('http://localhost:8000/api/deals', {
//         ...newDeal,
//         stage: 'initiated',
//       });
//       setDeals([...deals, data]);
//       setNewDeal({ name: '', amount: '', dateCreated: '' });
//     } catch (error) {
//       console.error('Error adding deal:', error);
//     }
//   };

//   const moveDeal = async (id, newStage) => {
//     try {
//       const updatedDeals = deals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       );
//       setDeals(updatedDeals);
//       await axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage });
//     } catch (error) {
//       console.error('Error updating deal stage:', error);
//     }
//   };

//   const deleteDeal = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/deals/${id}`);
//       setDeals(deals.filter((deal) => deal._id !== id));
//     } catch (error) {
//       console.error('Error deleting deal:', error);
//     }
//   };

//   const StageColumn = ({ stage, deals }) => {
//     const [, drop] = useDrop({
//       accept: ItemType,
//       drop: (item) => moveDeal(item.id, stage),
//     });

//     return (
//       <div
//         ref={drop}
//         style={{
//           flex: 1,
//           padding: '1rem',
//           border: '1px solid #ccc',
//           margin: '0.5rem',
//           minHeight: '100px',
//         }}
//       >
//         <h3>{stage.toUpperCase()}</h3>
//         {deals.map((deal) => (
//           <DealCard key={deal._id} deal={deal} />
//         ))}
//       </div>
//     );
//   };

//   const DealCard = ({ deal }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemType,
//       item: { id: deal._id },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     return (
//       <div
//         ref={drag}
//         style={{
//           padding: '1rem',
//           margin: '0.5rem',
//           backgroundColor: '#f9f9f9',
//           border: '1px solid #ddd',
//           cursor: 'grab',
//           opacity: isDragging ? 0.5 : 1,
//           position: 'relative',
//         }}
//       >
//         <button
//           onClick={() => deleteDeal(deal._id)}
//           style={{
//             position: 'absolute',
//             top: '5px',
//             right: '5px',
//             backgroundColor: '#ff4d4f',
//             color: 'white',
//             border: 'none',
//             borderRadius: '50%',
//             width: '20px',
//             height: '20px',
//             fontSize: '12px',
//             cursor: 'pointer',
//           }}
//         >
//           ✕
//         </button>
//         <div>Name: {deal.name}</div>
//         <div>Amount: ${deal.amount}</div>
//         <div>Date: {new Date(deal.dateCreated).toLocaleDateString()}</div>
//       </div>
//     );
//   };

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
//       </div>
//     </DndProvider>
//   );
// }


// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages for the deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');
//   const [newDealAmount, setNewDealAmount] = useState('');
//   const [newDealDate, setNewDealDate] = useState('');
//   const [editingDealId, setEditingDealId] = useState(null);

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//         setEditingDealId(response.data._id); // Start editing the newly added deal
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Update amount and date for a deal
//   const updateDeal = (id) => {
//     if (!newDealAmount || !newDealDate) {
//       console.error('Amount and date are required');
//       return;
//     }

//     const updatedDeal = {
//       amount: newDealAmount,
//       dateCreated: newDealDate,
//     };

//     axios.put(`http://localhost:8000/api/deals/${id}`, updatedDeal)
//       .then(() => {
//         setDeals(deals.map(deal =>
//           deal._id === id ? { ...deal, amount: newDealAmount, dateCreated: newDealDate } : deal
//         ));
//         setNewDealAmount('');
//         setNewDealDate('');
//         setEditingDealId(null); // Stop editing after update
//       })
//       .catch((error) => console.error('Error updating deal:', error));
//   };

//   // Move deal between stages and update on backend
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage })
//       .catch((error) => console.error('Error updating deal stage:', error));
//   };

//   // Delete a deal
//   const deleteDeal = (id) => {
//     axios.delete(`http://localhost:8000/api/deals/${id}`)
//       .then(() => {
//         setDeals(deals.filter(deal => deal._id !== id));
//       })
//       .catch((error) => console.error('Error deleting deal:', error));
//   };

//   // Basic styling object with improved spacing
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     backgroundColor: '#f0f4f8',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '100%',
//     gap: '20px',
//     marginTop: '20px',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   };

//   const dealCardStyle = {
//     padding: '10px',
//     margin: '10px 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: '4px',
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div style={{ marginBottom: '20px' }}>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//             style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//           />
//           <button
//             onClick={addNewDeal}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Add Deal
//           </button>
//         </div>

//         {/* Display new deal form for amount and date when a deal is in 'initiated' */}
//         {editingDealId && (
//           <div style={{ marginBottom: '20px' }}>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newDealAmount}
//               onChange={(e) => setNewDealAmount(e.target.value)}
//               style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//             />
//             <input
//               type="date"
//               placeholder="Date"
//               value={newDealDate}
//               onChange={(e) => setNewDealDate(e.target.value)}
//               style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//             />
//             <button
//               onClick={() => updateDeal(editingDealId)}
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: '#4CAF50',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               Update Deal
//             </button>
//           </div>
//         )}

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               deleteDeal={deleteDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, deleteDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal._id} deal={deal} deleteDeal={deleteDeal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, deleteDeal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal._id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <span>{deal.name}</span>
//       <span>{deal.amount ? `$${deal.amount}` : 'No amount set'}</span>
//       <span>{deal.dateCreated ? new Date(deal.dateCreated).toLocaleDateString() : 'No date set'}</span>
//       <button
//         onClick={() => deleteDeal(deal._id)}
//         style={{
//           marginLeft: 'auto',
//           color: 'red',
//           border: 'none',
//           background: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         X
//       </button>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages for the deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');
//   const [newDealAmount, setNewDealAmount] = useState('');
//   const [newDealDate, setNewDealDate] = useState('');
//   const [editingDealId, setEditingDealId] = useState(null);

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => setDeals(response.data))
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//         setEditingDealId(response.data._id); // Start editing the newly added deal
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Update amount and date for a deal
//   const updateDeal = (id) => {
//     if (!newDealAmount || !newDealDate) {
//       console.error('Amount and date are required');
//       return;
//     }

//     const updatedDeal = {
//       amount: newDealAmount,
//       dateCreated: newDealDate,
//     };

//     axios.put(`http://localhost:8000/api/deals/${id}`, updatedDeal)
//       .then(() => {
//         setDeals(deals.map(deal =>
//           deal._id === id ? { ...deal, amount: newDealAmount, dateCreated: newDealDate } : deal
//         ));
//         setNewDealAmount('');
//         setNewDealDate('');
//         setEditingDealId(null); // Stop editing after update
//       })
//       .catch((error) => console.error('Error updating deal:', error));
//   };

//   // Move deal between stages and update on backend
//   const moveDeal = (id, newStage) => {
//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage })
//       .catch((error) => console.error('Error updating deal stage:', error));
//   };

//   // Delete a deal
//   const deleteDeal = (id) => {
//     axios.delete(`http://localhost:8000/api/deals/${id}`)
//       .then(() => {
//         setDeals(deals.filter(deal => deal._id !== id));
//       })
//       .catch((error) => console.error('Error deleting deal:', error));
//   };

//   // Basic styling object with improved spacing
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     backgroundColor: '#f0f4f8',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '100%',
//     gap: '20px',
//     marginTop: '20px',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   };

//   const dealCardStyle = {
//     padding: '10px',
//     margin: '10px 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: '4px',
//     gap: '10px', // Added space between elements
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div style={{ marginBottom: '20px' }}>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//             style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//           />
//           <button
//             onClick={addNewDeal}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Add Deal
//           </button>
//         </div>

//         {/* Display new deal form for amount and date when a deal is in 'initiated' */}
//         {editingDealId && (
//           <div style={{ marginBottom: '20px' }}>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newDealAmount}
//               onChange={(e) => setNewDealAmount(e.target.value)}
//               style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//             />
//             <input
//               type="date"
//               placeholder="Date"
//               value={newDealDate}
//               onChange={(e) => setNewDealDate(e.target.value)}
//               style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//             />
//             <button
//               onClick={() => updateDeal(editingDealId)}
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: '#4CAF50',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               Update Deal
//             </button>
//           </div>
//         )}

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               deleteDeal={deleteDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, deleteDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal._id} deal={deal} deleteDeal={deleteDeal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, deleteDeal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal._id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <span>{deal.name}</span>
//       <span>{deal.amount ? `$${deal.amount}` : 'No amount set'}</span>
//       <span>{deal.dateCreated ? new Date(deal.dateCreated).toLocaleDateString() : 'No date set'}</span>
//       <button
//         onClick={() => deleteDeal(deal._id)}
//         style={{
//           marginLeft: 'auto',
//           color: 'red',
//           border: 'none',
//           background: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         X
//       </button>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// // Define the draggable item type
// const ItemType = 'DEAL';

// // Initial stages for the deals
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDealName, setNewDealName] = useState('');
//   const [newDealAmount, setNewDealAmount] = useState('');
//   const [newDealDate, setNewDealDate] = useState('');
//   const [editingDealId, setEditingDealId] = useState(null);

//   // Fetch existing deals on component load
//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = () => {
//     axios.get('http://localhost:8000/api/deals')
//       .then((response) => {
//         console.log('Fetched deals:', response.data);
//         setDeals(response.data);
//       })
//       .catch((error) => console.error('Error fetching deals:', error));
//   };

//   // Add a new deal and save to backend
//   const addNewDeal = () => {
//     if (newDealName.trim() === '') return;

//     const newDeal = { name: newDealName, stage: 'initiated' };
//     console.log('Adding new deal:', newDeal);

//     axios.post('http://localhost:8000/api/deals', newDeal)
//       .then((response) => {
//         console.log('New deal added:', response.data);
//         setDeals([...deals, response.data]);
//         setNewDealName('');
//         setEditingDealId(response.data._id); // Start editing the newly added deal
//       })
//       .catch((error) => console.error('Error adding deal:', error));
//   };

//   // Update amount and date for a deal
//   const updateDeal = (id) => {
//     if (!newDealAmount || !newDealDate) {
//       console.error('Amount and date are required');
//       return;
//     }

//     const updatedDeal = {
//       amount: newDealAmount,
//       dateCreated: newDealDate,
//     };

//     console.log('Updating deal:', updatedDeal);

//     axios.put(`http://localhost:8000/api/deals/${id}`, updatedDeal)
//       .then(() => {
//         console.log('Deal updated successfully');
//         setDeals(deals.map(deal =>
//           deal._id === id ? { ...deal, amount: newDealAmount, dateCreated: newDealDate } : deal
//         ));
//         setNewDealAmount('');
//         setNewDealDate('');
//         setEditingDealId(null); // Stop editing after update
//       })
//       .catch((error) => console.error('Error updating deal:', error));
//   };

//   // Move deal between stages and update on backend
//   const moveDeal = (id, newStage) => {
//     console.log('Moving deal to stage:', newStage);

//     setDeals((prevDeals) =>
//       prevDeals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       )
//     );

//     axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage })
//       .catch((error) => console.error('Error updating deal stage:', error));
//   };

//   // Delete a deal
//   const deleteDeal = (id) => {
//     console.log('Deleting deal with id:', id);

//     axios.delete(`http://localhost:8000/api/deals/${id}`)
//       .then(() => {
//         console.log('Deal deleted successfully');
//         setDeals(deals.filter(deal => deal._id !== id));
//       })
//       .catch((error) => console.error('Error deleting deal:', error));
//   };

//   // Basic styling object with improved spacing
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     backgroundColor: '#f0f4f8',
//   };

//   const dealsBoardStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '100%',
//     gap: '20px',
//     marginTop: '20px',
//   };

//   const stageColumnStyle = {
//     flex: 1,
//     padding: '1rem',
//     border: '1px solid #ccc',
//     margin: '0.5rem',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   };

//   const dealCardStyle = {
//     padding: '10px',
//     margin: '10px 0',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #ddd',
//     cursor: 'grab',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: '4px',
//     gap: '10px', // Added space between elements
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={containerStyle}>
//         <h1>Manage Deals</h1>

//         {/* New deal form */}
//         <div style={{ marginBottom: '20px' }}>
//           <input
//             type="text"
//             placeholder="Enter Deal Name"
//             value={newDealName}
//             onChange={(e) => setNewDealName(e.target.value)}
//             style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//           />
//           <button
//             onClick={addNewDeal}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Add Deal
//           </button>
//         </div>

//         {/* Display new deal form for amount and date when a deal is in 'initiated' */}
//         {editingDealId && (
//           <div style={{ marginBottom: '20px' }}>
//             <input
//               type="number"
//               placeholder="Amount"
//               value={newDealAmount}
//               onChange={(e) => setNewDealAmount(e.target.value)}
//               style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//             />
//             <input
//               type="date"
//               placeholder="Date"
//               value={newDealDate}
//               onChange={(e) => setNewDealDate(e.target.value)}
//               style={{ padding: '10px', marginRight: '10px', borderRadius: '4px' }}
//             />
//             <button
//               onClick={() => updateDeal(editingDealId)}
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: '#4CAF50',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               Update Deal
//             </button>
//           </div>
//         )}

//         <div style={dealsBoardStyle}>
//           {stages.map((stage) => (
//             <StageColumn
//               key={stage}
//               stage={stage}
//               deals={deals.filter((deal) => deal.stage === stage)}
//               moveDeal={moveDeal}
//               deleteDeal={deleteDeal}
//               stageColumnStyle={stageColumnStyle}
//               dealCardStyle={dealCardStyle}
//             />
//           ))}
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // StageColumn component for each deal stage
// function StageColumn({ stage, deals, moveDeal, deleteDeal, stageColumnStyle, dealCardStyle }) {
//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => moveDeal(item.id, stage),
//   });

//   return (
//     <div style={stageColumnStyle} ref={drop}>
//       <h2>{stage.toUpperCase()}</h2>
//       {deals.map((deal) => (
//         <DealCard key={deal._id} deal={deal} deleteDeal={deleteDeal} dealCardStyle={dealCardStyle} />
//       ))}
//     </div>
//   );
// }

// // DealCard component for each deal
// function DealCard({ deal, deleteDeal, dealCardStyle }) {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: deal._id },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         ...dealCardStyle,
//         opacity: isDragging ? 0.5 : 1,
//       }}
//     >
//       <span>{deal.name}</span>
//       <span>{deal.amount ? `$${deal.amount}` : 'No amount set'}</span>
//       <span>{deal.dateCreated ? new Date(deal.dateCreated).toLocaleDateString() : 'No date set'}</span>
//       <button
//         onClick={() => deleteDeal(deal._id)}
//         style={{
//           marginLeft: 'auto',
//           color: 'red',
//           border: 'none',
//           background: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         X
//       </button>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';

// const ItemType = 'DEAL';
// const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

// export default function Deals() {
//   const [deals, setDeals] = useState([]);
//   const [newDeal, setNewDeal] = useState({ name: '', amount: '', dateCreated: '' });

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:8000/api/deals');
//       console.log('Deals data:', data); 
//       setDeals(data);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//     }
//   };

//   const addNewDeal = async () => {
//     if (!newDeal.name || !newDeal.amount || !newDeal.dateCreated) return;
//     try {
//       const { data } = await axios.post('http://localhost:8000/api/deals', {
//         ...newDeal,
//         stage: 'initiated',
//       });
//       setDeals([...deals, data]);
//       setNewDeal({ name: '', amount: '', dateCreated: '' });
//     } catch (error) {
//       console.error('Error adding deal:', error);
//     }
//   };

//   const moveDeal = async (id, newStage) => {
//     try {
//       const updatedDeals = deals.map((deal) =>
//         deal._id === id ? { ...deal, stage: newStage } : deal
//       );
//       setDeals(updatedDeals);
//       await axios.put(`http://localhost:8000/api/deals/${id}`, { stage: newStage });
//     } catch (error) {
//       console.error('Error updating deal stage:', error);
//     }
//   };

//   const deleteDeal = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/deals/${id}`);
//       setDeals(deals.filter((deal) => deal._id !== id));
//     } catch (error) {
//       console.error('Error deleting deal:', error);
//     }
//   };

//   const StageColumn = ({ stage, deals }) => {
//     const [, drop] = useDrop({
//       accept: ItemType,
//       drop: (item) => moveDeal(item.id, stage),
//     });

//     return (
//       <div
//         ref={drop}
//         style={{
//           flex: 1,
//           padding: '1rem',
//           border: '1px solid #ccc',
//           margin: '0.5rem',
//           minHeight: '100px',
//         }}
//       >
//         <h3>{stage.toUpperCase()}</h3>
//         {deals.map((deal) => (
//           <DealCard key={deal._id} deal={deal} />
//         ))}
//       </div>
//     );
//   };

//   const DealCard = ({ deal }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemType,
//       item: { id: deal._id },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     return (
//       <div
//         ref={drag}
//         style={{
//           padding: '1rem',
//           margin: '0.5rem',
//           backgroundColor: '#f9f9f9',
//           border: '1px solid #ddd',
//           cursor: 'grab',
//           opacity: isDragging ? 0.5 : 1,
//           position: 'relative',
//         }}
//       >
//         <button
//           onClick={() => deleteDeal(deal._id)}
//           style={{
//             position: 'absolute',
//             top: '5px',
//             right: '5px',
//             backgroundColor: '#ff4d4f',
//             color: 'white',
//             border: 'none',
//             borderRadius: '50%',
//             width: '20px',
//             height: '20px',
//             fontSize: '12px',
//             cursor: 'pointer',
//           }}
//         >
//           ✕
//         </button>
//         <div>Name: {deal.name}</div>
//         <div>Amount: ${deal.amount}</div>
//         <div>Date: {new Date(deal.dateCreated).toLocaleDateString()}</div>
//       </div>
//     );
//   };

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
//       </div>
//     </DndProvider>
//   );
// }

import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

const ItemType = 'DEAL';
const stages = ['initiated', 'qualified', 'contract sent', 'closed won', 'closed lost'];

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({ name: '', amount: '', dateCreated: '' });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/deals');
      console.log('Fetched Deals:', data.map((deal) => ({ id: deal._id, stage: deal.stage })));
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
      console.log('New Deal Added:', { id: data._id, stage: data.stage });
      setDeals([...deals, data]);
      setNewDeal({ name: '', amount: '', dateCreated: '' });
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const moveDeal = async (id, newStage) => {
    try {
      const deal = deals.find((deal) => deal._id === id);
      console.log('Moving Deal:', { id, oldStage: deal.stage, newStage });
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

  const StageColumn = ({ stage, deals }) => {
    const [, drop] = useDrop({
      accept: ItemType,
      drop: (item) => moveDeal(item.id, stage),
    });

    console.log(`Rendering deals for stage: ${stage}`, deals);

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
    console.log('Rendering Deal Card:', { id: deal._id, stage: deal.stage });

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '1rem' }}>
        <h1>Deal Management</h1>
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
          <button onClick={addNewDeal}>Create Deal</button>
        </div>
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
