import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type Props = { open: boolean; onClose: () => void };

const Menu: React.FC<Props> = ({ open, onClose }) => {
  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ""}`}
      onClick={onClose}
    >
      <nav className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.item}>
          <img src="assets/logo/logo_home.svg" alt="home" />
          <Link to="/" onClick={onClose}>
            <span className={styles.ja}>ホーム</span>
            <span className={`${styles.en} ${styles.enRed}`}>Home</span>
          </Link>
        </div>
        <div className={styles.item}>
          <img src="assets/logo/logo_about.svg" alt="about" />
          <Link to="/about" onClick={onClose}>
            <span className={styles.ja}>ゼロイチとは</span>
            <span className={`${styles.en} ${styles.enGreen}`}>About</span>
          </Link>
        </div>
        <div className={styles.item}>
          <img src="assets/logo/logo_works.svg" alt="works" />
          <Link to="/works" onClick={onClose}>
            <span className={styles.ja}>制作したもの</span>
            <span className={`${styles.en} ${styles.enBlue}`}>Works</span>
          </Link>
        </div>
        <div className={styles.item}>
          <img src="assets/logo/logo_contact.svg" alt="contact" />
          <Link to="/contact" onClick={onClose}>
            <span className={styles.ja}>お問い合わせ</span>
            <span className={`${styles.en} ${styles.enBlack}`}>Contact</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
