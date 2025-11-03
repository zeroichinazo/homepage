export type TagItem =
  | string
  | { label: string; color?: string; textColor?: string };

export type WorkItem = {
  title: string;
  image: string;
  tags: TagItem[];
  period?: string;
  description?: string;
  purchaseUrl?: string;
  mapUrl?: string;
  hashtag?: string;
};
