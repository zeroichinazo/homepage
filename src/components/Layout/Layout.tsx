import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "../Header/index";
import Loading from "../Loading/index";
import styles from "./layout.module.css";

const Layout: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingExit, setLoadingExit] = useState(false);
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("zeroichi_seen_loading");
    if (!seen) {
      setShowLoading(true);
      const t1 = window.setTimeout(() => {
        setLoadingExit(true); // 上方向にスライドアウト開始
        const t2 = window.setTimeout(() => {
          setShowLoading(false);
          setLoadingExit(false);
          localStorage.setItem("zeroichi_seen_loading", "true");
        }, 700); // Loadingのexitアニメ長（CSSと同期）
        return () => window.clearTimeout(t2);
      }, 3000);
      return () => window.clearTimeout(t1);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    const onResize = () => apply();
    mq.addEventListener
      ? mq.addEventListener("change", apply)
      : window.addEventListener("resize", onResize);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", apply)
        : window.removeEventListener("resize", onResize);
    };
  }, []);

  // ルート絶対パスに固定（サブパスや <base> に依存しない）
  const logoPatternUrl = "/assets/logo/logo_zeroichi_nochar.svg";
  const isAbout = location.pathname.startsWith("/about");
  const patternHeightPx = 140;
  const [tileSize, setTileSize] = useState<{ w: number; h: number }>({
    w: patternHeightPx,
    h: patternHeightPx,
  });

  useEffect(() => {
    const img = new Image();
    img.src = logoPatternUrl;
    img.onload = () => {
      const ratio =
        img.naturalWidth && img.naturalHeight
          ? img.naturalWidth / img.naturalHeight
          : 1;
      const w = Math.max(1, Math.round(patternHeightPx * ratio));
      setTileSize({ w, h: patternHeightPx });
    };
  }, [logoPatternUrl]);

  return (
    <div
      className={`${styles.pageWrap} ${styles.pcFrame}`}
      style={isAbout ? { background: "none" } : undefined}
    >
      {showLoading && <Loading exiting={loadingExit} />}
      {!showLoading && !isDesktop && <Header />}
      {!showLoading && (
        <main
          className={`${styles.main} ${styles.mainPattern} ${
            isAbout ? styles.aboutPattern : ""
          }`}
          style={{
            ["--pattern-url" as any]: `url(${logoPatternUrl})`,
            ["--pattern-height" as any]: `${patternHeightPx}px`,
            ["--pattern-tile-w" as any]: `${tileSize.w}px`,
            ["--pattern-tile-h" as any]: `${tileSize.h}px`,
            ["--pattern-rotate" as any]: "-25deg",
            ["--pattern-opacity" as any]: "0.05",
            ["--pattern-speed" as any]: "32s",
            ["--pattern-shift-x" as any]: "180px",
            ["--pattern-shift-y" as any]: "180px",
            ["--pattern-speed-2" as any]: "56s",
            ["--pattern-opacity-2" as any]: "0.05",
            ["--pattern-offset-x" as any]: "60px",
            ["--pattern-offset-y" as any]: "0px",
            ["--pattern-offset-x-2" as any]: "90px",
            ["--pattern-offset-y-2" as any]: "45px",
          }}
        >
          <div className={styles.appRoot}>
            <Outlet />
          </div>
          {isDesktop && (
            <>
              <aside className={styles.desktopLeftBrand} aria-hidden>
                <img src="/assets/logo/logo_zeroichi.svg" alt="ゼロイチ" />
              </aside>
              <aside className={styles.desktopRightPanel} aria-label="メニュー">
                <nav>
                  <div className={styles.panelItem}>
                    <img src="/assets/logo/logo_home.svg" alt="home" />
                    <Link to="/">
                      <span className={styles.panelJa}>ホーム</span>
                      <span className={`${styles.panelEn} ${styles.enRed}`}>
                        Home
                      </span>
                    </Link>
                  </div>
                  <div className={styles.panelItem}>
                    <img src="/assets/logo/logo_about.svg" alt="about" />
                    <Link to="/about">
                      <span className={styles.panelJa}>ゼロイチとは</span>
                      <span className={`${styles.panelEn} ${styles.enGreen}`}>
                        About
                      </span>
                    </Link>
                  </div>
                  <div className={styles.panelItem}>
                    <img src="/assets/logo/logo_works.svg" alt="works" />
                    <Link to="/works">
                      <span className={styles.panelJa}>制作したもの</span>
                      <span className={`${styles.panelEn} ${styles.enBlue}`}>
                        Works
                      </span>
                    </Link>
                  </div>
                  <div className={styles.panelItem}>
                    <img src="/assets/logo/logo_contact.svg" alt="contact" />
                    <Link to="/contact">
                      <span className={styles.panelJa}>お問い合わせ</span>
                      <span className={`${styles.panelEn} ${styles.enBlack}`}>
                        Contact
                      </span>
                    </Link>
                  </div>
                </nav>
              </aside>
            </>
          )}
        </main>
      )}
      {!showLoading && !loadingExit && (
        <footer className={styles.footer}>©0001 all rights reserved</footer>
      )}
    </div>
  );
};

export default Layout;
