"use client";

import { useMemo, useState } from "react";
import { socialPosts } from "../lib/constants";

export function useSocialFeed() {
  const [query, setQuery] = useState("");
  const posts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) {
      return socialPosts;
    }

    return socialPosts.filter((post) =>
      `${post.author} ${post.region} ${post.species} ${post.body}`
        .toLocaleLowerCase("tr-TR")
        .includes(normalized)
    );
  }, [query]);

  return { posts, query, setQuery };
}
