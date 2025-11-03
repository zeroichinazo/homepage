import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import WorkCard from "../../components/WorkCard";
import { worksItems } from "../../data/works";
import Seo from "../../components/Seo";

const works = worksItems;

const Works: React.FC = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number((entry.target as HTMLElement).dataset.idx);
              next.add(idx);
              io.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.15 }
    );
    const targets = root.querySelectorAll(`.${styles.reveal}`);
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <Seo title="制作したもの" />
      <div className={styles.titleRow}>
        <img src="/assets/logo/logo_works.svg" alt="works" />
        <div>
          <div className={styles.ja}>制作したもの</div>
          <div className={styles.en}>Works</div>
        </div>
      </div>

      <div ref={listRef}>
        {works.map((w, idx) => (
          <div
            key={w.title}
            data-idx={idx}
            className={`${styles.reveal} ${
              visibleSet.has(idx) ? styles.revealVisible : ""
            }`}
            style={{ ["--delay" as any]: `${idx * 120}ms` }}
          >
            <WorkCard
              title={w.title}
              image={w.image}
              tags={w.tags}
              period={w.period}
              description={w.description}
              hashtag={w.hashtag}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
