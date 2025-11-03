import React from "react";
import styles from "./styles.module.css";

export type MemberCardProps = {
  id: string;
  name: string;
  img: string;
  handle: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const MemberCard: React.FC<MemberCardProps> = ({
  id,
  name,
  img,
  handle,
  onClick,
  className,
  style,
}) => {
  const nameColorClass = styles[`name_${id}` as keyof typeof styles] as
    | string
    | undefined;

  return (
    <button
      type="button"
      className={`${styles.card}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      style={style}
    >
      <img className={styles.avatar} src={img} alt={name} loading="lazy" />
      <div className={styles.info}>
        <div
          className={`${styles.nameBadge}${
            nameColorClass ? ` ${nameColorClass}` : ""
          }`}
        >
          {name}
        </div>
        <div className={styles.handleText}>{handle}</div>
      </div>
    </button>
  );
};

export default MemberCard;
