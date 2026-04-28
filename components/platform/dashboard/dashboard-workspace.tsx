import {
  Bell,
  Briefcase,
  CalendarDays,
  Heart,
  Lightbulb,
  Mail,
  RefreshCw,
  Search,
  Trophy,
} from "lucide-react";

const kpis = [
  {
    title: "Identi Fish",
    value: "324",
    note: "Fish identified last week",
    action: "Identify Fish",
    icon: Search,
  },
  {
    title: "Log Catch",
    value: "11",
    note: "Catches logged 5 species added",
    action: "Log Catch",
    icon: CalendarDays,
  },
  {
    title: "Get Tips",
    value: "14",
    note: "new community tips week",
    action: "Find Tips",
    icon: Lightbulb,
  },
];

const community = [
  {
    name: "Nick Barlow",
    fish: "Orchard bass · 5.6 l",
    likes: 62,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=420&q=80",
  },
  {
    name: "Julia Thompson",
    fish: "Striped Bass 4.2 l",
    likes: 48,
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=420&q=80",
  },
  {
    name: "Anthony Rivera",
    fish: "Striped Bass 5.1 l",
    likes: 95,
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=420&q=80",
  },
];

const logged = [
  ["Largmoth Bass", "22 lb"],
  ["Striped Bass", "18 lb"],
  ["Yellow Perch", "12 lb"],
];

const best = [
  ["6.4 lb", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=220&q=80"],
  ["5.1 lb", "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=220&q=80"],
  ["5.1 lb", "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=220&q=80"],
];

export default function DashboardWorkspace() {
  return (
    <section className="home-overview">
      <header className="home-topbar">
        <label className="home-search">
          <Search size={15} />
          <input placeholder="Search ..." aria-label="Search" />
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
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=72&q=80"
            alt="Alicia"
          />
        </div>
      </header>

      <div className="home-content">
        <section className="home-hero">
          <div>
            <h1>Welcome back, Alicia!</h1>
            <p>Identify fish species and log your catches</p>
          </div>
          <img src="/login-fish-scene.png" alt="Underwater fish" />
        </section>

        <section className="home-kpi-grid">
          {kpis.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="home-kpi-card">
                <div className="home-kpi-title">
                  <Icon size={30} />
                  <strong>{item.title}</strong>
                </div>
                <div className="home-kpi-body">
                  <span>{item.value}</span>
                  <p>{item.note}</p>
                </div>
                <button type="button">
                  <Search size={15} />
                  {item.action}
                </button>
              </article>
            );
          })}
        </section>

        <div className="home-main-grid">
          <section className="catch-panel">
            <div className="panel-head">
              <div>
                <h2>Catch Overview</h2>
                <p>April 2024</p>
              </div>
              <button type="button">
                <Search size={14} />
                Log a Catch
              </button>
            </div>

            <div className="chart-card">
              <div className="chart-axis">
                <span>25</span>
                <span>10</span>
                <span>0</span>
              </div>
              <svg viewBox="0 0 560 135" role="img" aria-label="Catch trend chart">
                <defs>
                  <linearGradient id="catchFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8dd4ee" stopOpacity="0.46" />
                    <stop offset="100%" stopColor="#8dd4ee" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 110 C52 94 85 82 132 86 C182 90 205 94 248 74 C292 52 324 58 362 70 C407 84 437 70 468 34 C502 0 526 22 560 10 L560 135 L0 135 Z"
                  fill="url(#catchFill)"
                />
                <path
                  d="M0 110 C52 94 85 82 132 86 C182 90 205 94 248 74 C292 52 324 58 362 70 C407 84 437 70 468 34 C502 0 526 22 560 10"
                  fill="none"
                  stroke="#8dd4ee"
                  strokeWidth="3"
                />
              </svg>
              <div className="chart-days">
                <span>Sun</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
            </div>

            <div className="catch-bottom-grid">
              <section className="logged-card">
                <h3>78 Catches logged</h3>
                <div>
                  {logged.map(([name, weight]) => (
                    <article key={name}>
                      <img src="https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=180&q=80" alt={name} />
                      <span>{name}</span>
                      <strong>{weight}</strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className="best-card">
                <h3>
                  <Trophy size={15} />
                  Best Catches
                </h3>
                {best.map(([weight, image], index) => (
                  <article key={`${weight}-${index}`}>
                    <img src={image} alt="Best catch" />
                    <strong>{weight}</strong>
                  </article>
                ))}
              </section>
            </div>
          </section>

          <section className="community-panel">
            <div className="panel-head">
              <h2>Recent Community Photos</h2>
              <div className="panel-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="community-list">
              {community.map((item) => (
                <article key={item.name}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.fish}</span>
                  </div>
                  <button type="button">
                    <Heart size={15} />
                    {item.likes}
                  </button>
                </article>
              ))}
            </div>
            <button className="feed-button" type="button">View Community Feed</button>
          </section>
        </div>
      </div>
    </section>
  );
}
