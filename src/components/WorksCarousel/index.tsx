import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import WorkCard from "../WorkCard";
import styles from "./styles.module.css";
import type { WorkItem } from "../../types/work";

// 型は共通定義を使用

type Props = {
  items: WorkItem[];
  autoPlayMs?: number;
};

const WorksCarousel: React.FC<Props> = ({ items, autoPlayMs }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // autoPlayで使用（inline更新のため関数参照は未使用）

  useEffect(() => {
    if (!autoPlayMs) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, items.length]);

  // 画像の事前デコード（jank 防止）
  useEffect(() => {
    let cancelled = false;
    const controllers: { img: HTMLImageElement }[] = [];
    const preload = async () => {
      for (const it of items) {
        if (cancelled) break;
        try {
          const img = new Image();
          img.decoding = "async" as any;
          img.src = it.image;
          controllers.push({ img });
          if (img.decode) {
            await img.decode().catch(() => {});
          }
        } catch {
          // noop
        }
      }
    };
    preload();
    return () => {
      cancelled = true;
    };
  }, [items]);

  // 可変高さ対応: アクティブスライドの高さを反映（初回は同期的に反映）
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const active = container.querySelector(
        `.${styles.slide}.${styles.active}`
      ) as HTMLElement | null;
      if (active) {
        const content = (active.firstElementChild as HTMLElement) || active;
        container.style.height = `${content.offsetHeight}px`;
      }
    };
    update();
    const active = container.querySelector(
      `.${styles.slide}.${styles.active}`
    ) as HTMLElement | null;
    const ro = (window as any).ResizeObserver
      ? new ResizeObserver(() => update())
      : null;
    if (ro && active) {
      const content = (active.firstElementChild as HTMLElement) || active;
      ro.observe(content);
    }
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (ro && active) {
        const content = (active.firstElementChild as HTMLElement) || active;
        ro.unobserve(content);
      }
    };
  }, [index, items.length]);

  return (
    <div className={styles.carousel}>
      <div className={styles.fadeViewport} ref={containerRef}>
        {items.map((w, i) => (
          <div
            key={w.title}
            className={`${styles.slide} ${i === index ? styles.active : ""}`}
            aria-hidden={i === index ? undefined : true}
          >
            <WorkCard
              title={w.title}
              image={w.image}
              tags={w.tags}
              period={w.period}
              description={w.description}
              officialUrl={w.officialUrl}
              imageLoading={i === 0 ? "eager" : "lazy"}
              imageDecoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksCarousel;
