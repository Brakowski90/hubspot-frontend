//src/components/Navbar.js

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
