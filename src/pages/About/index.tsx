import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import MemberCard from "../../components/MemberCard";
import { membersItems as members } from "../../data/members";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo";

// メンバーデータは data/members.ts から参照

const About: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const openMember = members.find((m) => m.id === openId);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.classList.contains(styles.slideIn)) {
            el.classList.add(styles.slideInVisible);
          } else if (el.classList.contains(styles.reveal)) {
            el.classList.add(styles.revealVisible);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    const targets = root.querySelectorAll(
      `.${styles.reveal}, .${styles.slideIn}`
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page} ref={pageRef}>
      <Seo title="ゼロイチとは" />
      <div className={styles.heroTitle}>
        <img src="assets/logo/logo_about.svg" alt="about" />
        <div>
          <div className={styles.ja}>ゼロイチとは</div>
          <div className={styles.en}>About</div>
        </div>
      </div>
      <div className={styles.main}>
        <img
          className={`${styles.brand} ${styles.reveal}`}
          style={{ ["--delay" as any]: "0ms" }}
          src="assets/logo/logo_zeroichi.svg"
          alt="zeroichi"
        />
        <div
          className={`${styles.handle} ${styles.reveal}`}
          style={{ ["--delay" as any]: "150ms" }}
        >
          <a
            className={styles.modalXBtn}
            href="https://x.com/0001_nazo"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src="assets/logo/logo_X.svg" alt="X" />
            <span>プロフィールを見る</span>
          </a>
        </div>

        <p
          className={`${styles.desc} ${styles.reveal}`}
          style={{ ["--delay" as any]: "300ms" }}
        >
          関西を拠点に活動している制作チームです。<br></br>
          「謎解き初心者にひらめきの楽しさを伝えたい!」という想いを持った、00-01年生まれの同級生謎解きクリエイター3人で結成しました。
          <br></br>
          謎解きやボードゲームなど、様々な形でひらめきの楽しさをお届けしています。
        </p>

        <Link
          to="/works"
          className={`${styles.primaryBtn} ${styles.reveal}`}
          style={{ ["--delay" as any]: "450ms" }}
        >
          制作物を見る ＞
        </Link>

        <div className={styles.sectionTitle}>
          <img src="assets/logo/logo_menber.svg" alt="member" />
          <div>
            <div className={styles.ja}>メンバー紹介</div>
            <div className={styles.en}>Menber</div>
          </div>
        </div>

        <div className={styles.memberGrid}>
          {members.map((m, idx) => (
            <MemberCard
              key={m.id}
              id={m.id}
              name={m.name}
              img={m.image}
              handle={m.handle}
              className={styles.slideIn}
              style={{ ["--delay" as any]: `${idx * 160}ms` }}
              onClick={() => setOpenId(m.id)}
            />
          ))}
        </div>
      </div>

      {openMember &&
        createPortal(
          <div className={styles.modalOverlay} onClick={() => setOpenId(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.modalClose}
                onClick={() => setOpenId(null)}
              >
                ×
              </button>
              <img
                src={openMember.image}
                alt={openMember.name}
                className={styles.modalImg}
              />
              <div
                className={`${styles.modalName} ${
                  styles[`memberName_${openMember.id}`]
                }`}
              >
                {openMember.name}
              </div>
              {openMember.description &&
                (typeof openMember.description === "string" &&
                openMember.description.includes("<") ? (
                  <p
                    className={styles.modalText}
                    dangerouslySetInnerHTML={{
                      __html: openMember.description.replace(/\n/g, "<br>"),
                    }}
                  />
                ) : (
                  <p className={styles.modalText}>{openMember.description}</p>
                ))}
              <a
                className={styles.modalXBtn}
                href={openMember.xUrl || "#"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src="assets/logo/logo_X.svg" alt="X" />
                <span>プロフィールを見る</span>
              </a>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default About;
