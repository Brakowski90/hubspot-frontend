// import Head from 'next/head';

// export default function Home() {
//   return (
//     <div>
//       <Head>
//         <title>HubSpot Clone</title>
//       </Head>
//       <h1>Welcome to the HubSpot Clone</h1>
//       <p>Your deal, company, and contact management system.</p>
//     </div>
//   );
// }

import Navbar from '../components/Navbar';
import styles from '../styles/Navbar.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1>Welcome to the HubSpot Clone</h1>
        <p>Your deal, company, and contact management system.</p>
      </div>
    </div>
  );
}
