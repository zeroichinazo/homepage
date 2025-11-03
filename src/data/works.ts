import type { WorkItem } from "../types/work";

export const worksItems: WorkItem[] = [
  /*情報更新時は上段に追加すること*/
  {
    title: "八回廻し",
    image: "assets/works/works_hachikaimawashi.png",
    tags: [
      { label: "謎解き", color: "var(--red)" },
      { label: "キット型", color: "var(--black)" },
    ],
    description: `自宅で遊べる謎解きグッズ②<br>あるものを「八回使い廻して」謎を解こう！<br>謎解き初心者からお楽しみいただけます。`,
    hashtag: "ゼロイチハチカイ",
    period: "2025/11/8",
  },
  {
    title: "トニナルコトバ",
    image: "assets/works/works_toninarukotoba.png",
    tags: [{ label: "ボードゲーム", color: "var(--orange)" }],
    description: `｢瞬発力｣と｢語彙力｣ がカギ！？<br>「〇〇と△△になる」のお題に当てはまるコトバをいち早く答えよう！`,
    hashtag: "ゼロイチトニナルコトバ",
    period: "2025/10/11",
  },
  {
    title: "START!!",
    image: "assets/works/works_start.png",
    tags: [
      { label: "謎解き", color: "var(--red)" },
      { label: "キット型", color: "var(--black)" },
    ],
    description: `自宅で遊べる謎解きグッズ①<br>謎解き沼への第一歩目を目指して制作しました。<br>謎解き初心者からお楽しみいただけます。`,
    hashtag: "ゼロイチスタート",
    period: "2025/10/11",
  },
  {
    title: "パシャリドル",
    image: "assets/works/works_pashariddle.png",
    tags: [
      { label: "謎解き", color: "var(--red)" },
      { label: "対面型", color: "var(--green)" },
    ],
    description: `「ナゾの答えをパシャリと撮ろう！」<br>これはあなたのスマートフォンで写真を撮り、<br>謎解きにチャレンジするゲームイベントです。`,
    hashtag: "ゼロイチパシャリドル",
    period: "2025/7/19",
  },
  {
    title: "関西ひとつなぎの謎",
    image: "assets/works/works_hitotunagi.png",
    tags: [
      { label: "謎解き", color: "var(--red)" },
      { label: "周遊型", color: "var(--blue)" },
    ],
    description: `株式会社フラップゼロアルファ様が主催する、関西10鉄道とコラボした超大型プロジェクト。プロジェクト内の全ての謎を制作しました。`,
    hashtag: "関西ひとつなぎの謎",
    period: "2025/3/19",
  },
  {
    title: "桜川謎解き街ガイド",
    image: "assets/works/works_sakuragawanazo.png",
    tags: [
      { label: "謎解き", color: "var(--red)" },
      { label: "周遊型", color: "var(--blue)" },
    ],
    description: `大阪最宴祭13運営コンテンツの1つ。<br>桜川を散策する、王道の周遊型謎解きです。<br>※現在は販売を停止しております。`,
    hashtag: "桜川謎解き街ガイド",
    period: "2024/9/21",
  },
];
