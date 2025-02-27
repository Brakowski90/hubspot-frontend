// import Link from 'next/link';
// import styles from '../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <nav className={styles.nav}>
//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         <li>
//           <Link href="/contacts">Contacts</Link>
//         </li>
//         <li>
//           <Link href="/companies">Companies</Link>
//         </li>
//         <li>
//           <Link href="/deals">Deals</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

// // Import necessary Next.js components and CSS module
// import Link from 'next/link';
// import styles from '../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <div>
//       {/* Top Navbar */}
//       <nav className={styles.topNav}>
//         <ul>
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/contacts">Contacts</Link>
//           </li>
//           <li>
//             <Link href="/companies">Companies</Link>
//           </li>
//           <li>
//             <Link href="/deals">Deals</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Side Navbar */}
//       <aside className={styles.sideNav}>
//         <ul>
//           <li>
//             <Link href="/">🏠 Home</Link>
//           </li>
//           <li>
//             <Link href="/contacts">👤 Contacts</Link>
//           </li>
//           <li>
//             <Link href="/companies">🏢 Companies</Link>
//           </li>
//           <li>
//             <Link href="/deals">🤝 Deals</Link>
//           </li>
//         </ul>
//       </aside>
//     </div>
//   );
// };

// export default Navbar;

// import Link from 'next/link';
// import styles from '../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <div>
//       {/* Top Navbar */}
//       <nav className={styles.topNav}>
//         <ul>
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/contacts">Contacts</Link>
//           </li>
//           <li>
//             <Link href="/companies">Companies</Link>
//           </li>
//           <li>
//             <Link href="/deals">Deals</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Side Navbar */}
//       <aside className={styles.sideNav}>
//         <ul>
//           <li>
//             <Link href="/">🏠 </Link>
//           </li>
//           <li>
//             <Link href="/contacts">👤 </Link>
//           </li>
//           <li>
//             <Link href="/companies">🏢 </Link>
//           </li>
//           <li>
//             <Link href="/deals">🤝 </Link>
//           </li>
//         </ul>
//       </aside>
//     </div>
//   );
// };

// export default Navbar;

// import Link from 'next/link';
// import styles from '../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <>
//       {/* Top Navbar */}
//       <nav className={styles.topNav}>
//         <ul>
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/contacts">Contacts</Link>
//           </li>
//           <li>
//             <Link href="/companies">Companies</Link>
//           </li>
//           <li>
//             <Link href="/deals">Deals</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Side Navbar */}
//       <div className={styles.sideNav}>
//         <ul>
//           <li>
//             <Link href="/">🏠</Link>
//           </li>
//           <li>
//             <Link href="/contacts">👤</Link>
//           </li>
//           <li>
//             <Link href="/companies">🏢</Link>
//           </li>
//           <li>
//             <Link href="/deals">🤝</Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Navbar;

// import Link from 'next/link';
// import { FaHome, FaUser, FaBuilding, FaHandshake } from 'react-icons/fa';
// import styles from '../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <>
//       {/* Top Navbar */}
//       <nav className={styles.topNav}>
//         <ul>
//           <li>
//             <Link href="/">
//               <FaHome /> Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/contacts">
//               <FaUser /> Contacts
//             </Link>
//           </li>
//           <li>
//             <Link href="/companies">
//               <FaBuilding /> Companies
//             </Link>
//           </li>
//           <li>
//             <Link href="/deals">
//               <FaHandshake /> Deals
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Side Navbar */}
//       <div className={styles.sideNav}>
//         <ul>
//           <li>
//             <Link href="/">
//               <FaHome className={styles.icon} />
//             </Link>
//           </li>
//           <li>
//             <Link href="/contacts">
//               <FaUser className={styles.icon} />
//             </Link>
//           </li>
//           <li>
//             <Link href="/companies">
//               <FaBuilding className={styles.icon} />
//             </Link>
//           </li>
//           <li>
//             <Link href="/deals">
//               <FaHandshake className={styles.icon} />
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import Link from 'next/link';
import { FaHome, FaUser, FaBuilding, FaHandshake, FaTachometerAlt } from 'react-icons/fa'; // Import FaTachometerAlt for Dashboard icon
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <>
      {/* Top Navbar */}
      <nav className={styles.topNav}>
        <ul>
          <li>
            <Link href="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/contacts">
              <FaUser /> Contacts
            </Link>
          </li>
          <li>
            <Link href="/companies">
              <FaBuilding /> Companies
            </Link>
          </li>
          <li>
            <Link href="/deals">
              <FaHandshake /> Deals
            </Link>
          </li>
        </ul>
      </nav>

      {/* Side Navbar */}
      <div className={styles.sideNav}>
        <ul>
          <li>
            <Link href="/">
              <FaHome className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <FaTachometerAlt className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link href="/contacts">
              <FaUser className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link href="/companies">
              <FaBuilding className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link href="/deals">
              <FaHandshake className={styles.icon} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
