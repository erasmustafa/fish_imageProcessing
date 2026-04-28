import { socialPosts } from "../../../lib/constants";
import PostCard from "./post-card";

export default function SocialFeed() {
  return (
    <section className="grid">
      {socialPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
