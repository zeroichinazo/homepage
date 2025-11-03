import React from "react";
import styles from "./styles.module.css";

type Props = {
  exiting?: boolean;
};

const Loading: React.FC<Props> = ({ exiting = false }) => {
  return (
    <div className={`${styles.wrap} ${exiting ? styles.exit : ""}`}>
      <div className={styles.logoRow}>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={`${styles.domino} ${styles[`d${i + 1}`]}`} />
        ))}
      </div>
      <div className={styles.text}>Loading...</div>
    </div>
  );
};

export default Loading;
