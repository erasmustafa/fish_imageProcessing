"use client";

import { Check, ChevronRight, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";

const badges = [
  ["Lunker Hunter", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=96&q=80"],
  ["Sunser Angler", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=96&q=80"],
  ["Trophy Catch", "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=96&q=80"],
  ["Freshwater Pro", "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=96&q=80"],
];

const followers = [
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=72&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=72&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=72&q=80",
];

export default function UserProfileWorkspace() {
  return (
    <section className="user-profile-page">
      <div className="user-profile-content">
        <main className="user-profile-main">
          <section className="profile-hero">
            <div className="profile-cover" />
            <div className="profile-identity">
              <span className="profile-avatar-wrap">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" alt="Alicia Vikander" />
                <i><Check size={13} /></i>
              </span>
              <h1>Alicia Vikander</h1>
              <p>@avicander</p>
              <span>Passionate angler from Seattle, WA. Always on the lookout for the next big catch!</span>
            </div>

            <div className="profile-stats-row">
              <strong>452 <span>followers</span></strong>
              <strong>178 <span>following</span></strong>
              <strong>178 <span>following</span></strong>
              <button type="button">Edit Profile</button>
            </div>

            <nav className="profile-tabs" aria-label="Profile sections">
              <button className="active" type="button">Posts</button>
              <button type="button">Achievements</button>
              <button type="button">Photos</button>
              <button type="button">Pro Tips</button>
            </nav>
          </section>

          <article className="profile-post-card">
            <header>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="Alicia" />
              <div>
                <strong>Alicia Vikander</strong>
                <span>5 days ago</span>
                <small>
                  <Heart size={11} />
                  <MessageCircle size={11} />
                  <Share2 size={11} />
                </small>
              </div>
              <MoreHorizontal size={19} />
            </header>

            <p>Last weekend's catch! Managed to reel in this 6.4 lb Largemouth Bass from Lake Sammamish.</p>

            <div className="profile-post-tags">
              <span>#LargemouthBass</span>
              <span>#WeekendFishing</span>
              <span className="post-actions"><Heart size={16} />64</span>
              <span className="post-actions"><MessageCircle size={16} />17</span>
              <MoreHorizontal size={18} />
            </div>

            <div className="profile-post-photos">
              <figure>
                <img src="https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=80" alt="Largemouth bass catch" />
                <figcaption>#LargemouthBass</figcaption>
              </figure>
              <figure>
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80" alt="Fishing lake" />
                <figcaption>#WeekendFishing</figcaption>
              </figure>
            </div>

            <footer>
              <span><Heart size={17} />64</span>
              <span><MessageCircle size={17} />17</span>
              <span><Share2 size={17} />Share</span>
            </footer>
          </article>
        </main>

        <aside className="profile-side-card">
          <section className="angler-level">
            <div>
              <h2>Angler Level</h2>
              <strong>12</strong>
            </div>
            <div className="level-arc">
              <span>1540 / 1,800</span>
            </div>
          </section>

          <section className="profile-achievements">
            <h2>Achievements</h2>
            <article>
              <span>🐟</span>
              <div><strong>Bass Pro</strong><small>25 Largemouth Bass caught</small></div>
            </article>
            <article>
              <span>🌄</span>
              <div><strong>New Record</strong><small>8.2 lb</small></div>
            </article>
            <article>
              <span>🏆</span>
              <div><strong>Master Angler</strong><small>19 challenges completed</small></div>
            </article>
          </section>

          <section className="profile-badges">
            <header>
              <h2>Badges</h2>
              <ChevronRight size={17} />
            </header>
            <div>
              {badges.map(([label, image]) => (
                <figure key={label}>
                  <img src={image} alt={label} />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="profile-following">
            <header>
              <h2>Following</h2>
              <a href="/platform/social">View All (173)</a>
            </header>
            <div>
              {followers.map((image) => <img key={image} src={image} alt="Following user" />)}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
