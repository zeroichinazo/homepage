import React, { useState } from "react";
import styles from "./styles.module.css";
import Menu from "../Menu/index";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img
            src="assets/logo/logo_zeroichi.svg"
            alt="ゼロイチ"
            className={styles.logo}
          />
        </Link>
        <button
          aria-label="menu"
          className={`${styles.hamburger} ${open ? styles.open : ""}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
