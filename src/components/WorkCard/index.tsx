import React from "react";
import styles from "./styles.module.css";

type TagItem = string | { label: string; color?: string; textColor?: string };
type Props = {
  title: string;
  image: string; // 互換性維持のために残す（現在は固定画像を使用）
  tags: TagItem[];
  period?: string;
  description?: string;
  purchaseUrl?: string;
  mapUrl?: string;
  officialUrl?: string;
  hashtag?: string; // 未指定なら title を使用
  imageLoading?: "eager" | "lazy";
  imageDecoding?: "async" | "auto" | "sync";
};

const WorkCard: React.FC<Props> = ({
  title,
  image,
  tags,
  period,
  description,
  purchaseUrl,
  mapUrl,
  officialUrl,
  hashtag,
  imageLoading = "lazy",
  imageDecoding = "async",
}) => {
  const displayImage = image || "assets/works/works_sakuragawanazo.jpg";
  const hashtagText = hashtag || title;
  const xSearchUrl = `https://x.com/search?q=${encodeURIComponent(
    `#${hashtagText}`
  )}&f=live`;

  return (
    <article className={styles.card}>
      <img
        src={displayImage}
        alt={title}
        className={styles.image}
        loading={imageLoading}
        decoding={imageDecoding as any}
      />
      {officialUrl && (
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.officialButton}
          aria-label="公式サイトへ"
        >
          公式サイトへ ＞
        </a>
      )}
      <div className={styles.inner}>
        <h3 className={styles.title}>{title}</h3>
        {typeof period === "string" && period.trim().length > 0 && (
          <div className={styles.period}>リリース日：{period}</div>
        )}
        {description ? (
          typeof description === "string" && description.includes("<") ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: description.replace(/\n/g, "<br>"),
              }}
            />
          ) : (
            <>
              {String(description)
                .split(/\r?\n/)
                .filter((line) => line.trim().length > 0)
                .map((line, idx) => (
                  <p key={idx} className={styles.description}>
                    {line}
                  </p>
                ))}
            </>
          )
        ) : (
          <>
            <p className={styles.description}>
              大阪最某祭の運営コンテンツの1つを制作しました。桜川周辺を歩いて解く、王道の周遊型謎解きです。
            </p>
            <p className={styles.note}>※現在は販売を停止しております。</p>
          </>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((t) => {
              const key = typeof t === "string" ? t : t.label;
              const bg = typeof t === "string" ? undefined : t.color;
              const fg = typeof t === "string" ? undefined : t.textColor;
              return (
                <span
                  key={key}
                  className={styles.tag}
                  style={{ background: bg, color: fg }}
                >
                  {key}
                </span>
              );
            })}
          </div>
        )}

        <a
          href={xSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.xButton}
          aria-label="Xで感想を見る"
        >
          Xで感想を見る ＞
        </a>
      </div>
    </article>
  );
};

export default WorkCard;
