import React, { useEffect } from "react";
import styles from "./styles.module.css";

type Props = {
  onDone?: () => void;
  durationMs?: number;
  delayMs?: number;
};

const Curtain: React.FC<Props> = ({
  onDone,
  durationMs = 1000,
  delayMs = 0,
}) => {
  useEffect(() => {
    const total = durationMs + delayMs;
    const timer = window.setTimeout(() => {
      onDone && onDone();
    }, total);
    return () => window.clearTimeout(timer);
  }, [onDone, durationMs, delayMs]);

  return (
    <div
      className={styles.wrap}
      style={{
        ["--dur" as any]: `${durationMs}ms`,
        ["--delay" as any]: `${delayMs}ms`,
      }}
    >
      <div className={styles.panel} />
    </div>
  );
};

export default Curtain;
