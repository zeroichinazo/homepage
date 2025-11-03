import React, { useEffect } from "react";
import { site } from "../../config/site";

type Props = {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  faviconHref?: string;
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

const Seo: React.FC<Props> = ({
  title,
  description,
  ogImage,
  canonical,
  noindex,
  faviconHref,
}) => {
  useEffect(() => {
    const pageTitle = title
      ? site.titleTemplate.replace("%s", title)
      : site.name;
    document.title = pageTitle;

    const desc = description || site.description;
    const image = ogImage || site.ogImage;
    const url = canonical || site.siteUrl;
    const tw = site.twitterSite || "";

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: desc,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: desc,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    if (tw)
      upsertMeta('meta[name="twitter:site"]', {
        name: "twitter:site",
        content: tw,
      });

    if (noindex) {
      upsertMeta('meta[name="robots"]', {
        name: "robots",
        content: "noindex, nofollow",
      });
    } else {
      const robots = document.head.querySelector('meta[name="robots"]');
      if (robots) robots.parentElement?.removeChild(robots);
    }

    // canonical
    if (url) {
      upsertLink('link[rel="canonical"]', { rel: "canonical", href: url });
    }

    // favicon
    const fav = faviconHref || site.favicon;
    if (fav) {
      upsertLink('link[rel="icon"]', { rel: "icon", href: fav });
    }
  }, [title, description, ogImage, canonical, noindex, faviconHref]);

  return null;
};

export default Seo;
