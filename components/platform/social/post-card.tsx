import type { SocialPost } from "../../../types/post";

export default function PostCard({ post }: { post: SocialPost }) {
  return (
    <article className="surface section">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <strong>{post.author}</strong>
          <p className="muted" style={{ margin: "4px 0 0" }}>
            {post.region} · {post.createdAt}
          </p>
        </div>
        <span className="button button-secondary">{post.species}</span>
      </div>
      <p style={{ lineHeight: 1.7 }}>{post.body}</p>
      <p className="muted" style={{ marginBottom: 0 }}>
        {post.likes} beğeni · {post.comments} yorum
      </p>
    </article>
  );
}
