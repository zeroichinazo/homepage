import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import WorksCarousel from "../../components/WorksCarousel";
import { worksItems } from "../../data/works";
import Seo from "../../components/Seo";

const Home: React.FC = () => {
  const items = worksItems;

  // Aboutと同じレンガ状ロゴ背景用のタイルサイズ算出
  const [tile, setTile] = useState<{ w: number; h: number }>({
    w: 200,
    h: 140,
  });
  const patternHeightPx = 140;
  const aboutLogoUrl = `${process.env.PUBLIC_URL}/assets/logo/logo_zeroichi_nochar.svg`;
  useEffect(() => {
    const img = new Image();
    img.src = aboutLogoUrl;
    img.onload = () => {
      const ratio =
        img.naturalWidth && img.naturalHeight
          ? img.naturalWidth / img.naturalHeight
          : 1;
      const w = Math.max(1, Math.round(patternHeightPx * ratio));
      setTile({ w, h: patternHeightPx });
    };
  }, [aboutLogoUrl]);

  // セクション可視時フェードイン
  const aboutRef = useRef<HTMLElement | null>(null);
  const worksRef = useRef<HTMLElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [worksVisible, setWorksVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (!entry.isIntersecting) return;
          if (target.dataset.observe === "about") {
            setAboutVisible(true);
            io.unobserve(target);
          } else if (target.dataset.observe === "works") {
            setWorksVisible(true);
            io.unobserve(target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    );

    if (aboutRef.current) io.observe(aboutRef.current);
    if (worksRef.current) io.observe(worksRef.current);

    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <Seo title="ホーム" />
      <section className={`${styles.hero} hero-section`}>
        <img
          className={styles.blobRed}
          src="/assets/background/shape_red.svg"
          alt="red"
        />
        <img
          className={styles.blobGreen}
          src="/assets/background/shape_green.svg"
          alt="green"
        />
        <img
          className={styles.blobBlue}
          src="/assets/background/shape_blue.svg"
          alt="blue"
        />
        <h1 className={styles.catch}>
          <span className={styles.catchLine}>謎解き沼への</span>
          <br />
          <span
            className={`${styles.catchLine} ${styles.indent} ${styles.catchLine2}`}
          >
            00→01体験を
          </span>
        </h1>
        <div className={styles.scroll}>scroll</div>
      </section>

      <section
        ref={aboutRef}
        data-observe="about"
        className={`${styles.aboutSection} ${styles.fullBleed} ${
          styles.aboutBrick
        } about-section ${styles.reveal} ${
          aboutVisible ? styles.revealVisible : ""
        }`}
        style={{
          ["--pattern-url" as any]: `url(${aboutLogoUrl})`,
          ["--pattern-tile-w" as any]: `${tile.w}px`,
          ["--pattern-tile-h" as any]: `${tile.h}px`,
          ["--pattern-rotate" as any]: "-20deg",
          ["--pattern-speed" as any]: "32s",
          ["--pattern-opacity" as any]: "0.05",
        }}
      >
        <div className={styles.sectionTitle}>
          <img src="/assets/logo/logo_about.svg" alt="about" />
          <div>
            <div className={styles.ja}>ゼロイチとは</div>
            <div className={styles.en}>About</div>
          </div>
        </div>
        <img
          className={styles.brand}
          src="/assets/logo/logo_zeroichi.svg"
          alt="zeroichi"
        />
        <p className={styles.desc}>
          「初心者にひらめきの楽しさを伝えたい!」という思いの下で設立。
          謎解きやボードゲームなど、様々な形でひらめきをお届けしています。
        </p>
        <Link to="/about" className={styles.moreBtn}>
          詳しく見る ＞
        </Link>
      </section>

      <section
        ref={worksRef}
        data-observe="works"
        className={`${styles.worksSection} ${styles.fullBleed} works-section ${
          styles.reveal
        } ${worksVisible ? styles.revealVisible : ""}`}
      >
        <div className={styles.sectionTitleBlue}>
          <img src="/assets/logo/logo_works.svg" alt="works" />
          <div>
            <div className={styles.ja}>制作したもの</div>
            <div className={styles.enBlue}>Works</div>
          </div>
        </div>
        <WorksCarousel items={items} autoPlayMs={3500} />
        <Link to="/works" className={styles.moreBtnSecondary}>
          すべて表示 ＞
        </Link>
      </section>
    </div>
  );
};

export default Home;
