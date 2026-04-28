"use client";

import { Bell, Briefcase, Calendar, ChevronRight, Heart, Image, Mail, MessageCircle, MoreHorizontal, RefreshCw, Search, Share2 } from "lucide-react";

const feedPosts = [
  {
    author: "James Mitchell",
    time: "7 minutes ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
    text: "Finally caught my first rainbow trout today! What an exhilarating experience! Do you have any tips for where else I can find them?",
    tags: ["#RainbowTrout", "#Fishing", "#ProudCatch"],
    likes: 37,
    comments: 12,
  },
  {
    author: "Lily Edmonds",
    time: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
    text: "Happy to land this nice largemouth bass today on a local lake.",
    tags: ["#BassFishing", "#FishingLife"],
    likes: 54,
    comments: 5,
    photos: [
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=700&q=80",
    ],
  },
];

const friendRequests = [
  {
    name: "Kevin Hart",
    detail: "8 mutual friends",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=96&q=80",
    action: "Accept",
  },
  {
    name: "Sarah Johnson",
    detail: "0 mutual friends",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80",
    action: "Ignore",
  },
];

const topics = [
  ["# BassFishing", "1.2k posts"],
  ["# TroutFishing", "987 posts"],
  ["# FishingTips", "747 posts"],
  ["# TackleBox", "671 posts"],
  ["# CatchandRelease", "654 posts"],
];

export default function SocialAreaWorkspace() {
  return (
    <section className="social-area-page">
      <header className="home-topbar compact-topbar">
        <label className="home-search">
          <Search size={15} />
          <input placeholder="Search..." aria-label="Search" />
        </label>
        <div className="home-top-actions">
          <Briefcase size={17} />
          <RefreshCw size={17} />
          <Mail size={17} />
          <Bell size={17} />
          <button type="button" aria-label="Notifications">
            <Bell size={17} />
            <span />
          </button>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=72&q=80" alt="Alicia" />
        </div>
      </header>

      <div className="social-area-content">
        <main className="social-feed-panel">
          <header className="social-area-title">
            <h1>Explore</h1>
            <p>Connect with other fishing enthusiasts, share your catches, and ask for advice</p>
          </header>

          <div className="social-composer">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="Alicia" />
            <input placeholder="Share your latest catch or fishing adventure..." aria-label="Share a post" />
            <Image size={16} />
            <button type="button">Post</button>
          </div>

          <div className="social-post-stack">
            {feedPosts.map((post) => (
              <article className="social-post-card" key={post.author}>
                <header>
                  <img src={post.avatar} alt={post.author} />
                  <div>
                    <strong>{post.author}</strong>
                    <span>{post.time}</span>
                    <small>
                      <Heart size={11} />
                      <Calendar size={11} />
                      <Image size={11} />
                    </small>
                  </div>
                  <MoreHorizontal size={19} />
                </header>

                <p>{post.text}</p>
                <div className="social-post-tags">
                  {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                {post.photos ? (
                  <div className="social-post-photos">
                    {post.photos.map((photo, index) => (
                      <figure key={photo}>
                        <img src={photo} alt={`${post.author} catch ${index + 1}`} />
                        <figcaption>{post.tags[index]}</figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}

                <footer>
                  <span><Heart size={17} />{post.likes}</span>
                  <span><MessageCircle size={17} />{post.comments}</span>
                  <span><Share2 size={17} />Share</span>
                  <MoreHorizontal size={18} />
                </footer>
              </article>
            ))}
          </div>

          <button className="social-load-more" type="button">Load More</button>
        </main>

        <aside className="social-interactions-panel">
          <header>
            <h2>Interactions</h2>
            <ChevronRight size={18} />
          </header>

          <section>
            <h3>Friend Requests</h3>
            <div className="friend-request-list">
              {friendRequests.map((request) => (
                <article key={request.name}>
                  <img src={request.avatar} alt={request.name} />
                  <div>
                    <strong>{request.name}</strong>
                    <span>{request.detail}</span>
                  </div>
                  <button type="button">{request.action}</button>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h3>Trending Topics</h3>
            <div className="topic-list">
              {topics.map(([topic, count]) => (
                <article key={topic}>
                  <span>{topic}</span>
                  <small>{count}</small>
                </article>
              ))}
            </div>
          </section>

          <a href="/platform/social">
            View All
            <ChevronRight size={16} />
          </a>
        </aside>
      </div>
    </section>
  );
}
