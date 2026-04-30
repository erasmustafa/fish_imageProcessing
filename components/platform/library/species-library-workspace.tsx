"use client";

import { ChevronDown, ChevronRight, Fish, Search, SlidersHorizontal, Waves } from "lucide-react";

const speciesCards = [
  {
    name: "Largemouth Bass",
    latin: "Micropterus salmoides",
    type: "Freshwater",
    identified: "1,254",
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Rainbow Trout",
    latin: "Oncorhynchus mykiss",
    type: "Freshwater",
    identified: "932",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Perch",
    latin: "Perca fluviatilis",
    type: "Freshwater",
    identified: "817",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Walleye",
    latin: "Sander vitreus",
    type: "Freshwater",
    identified: "589",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Salmon",
    latin: "Salmo salar",
    type: "Freshwater",
    identified: "466",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bluefin Tuna",
    latin: "Thunnus thynnus",
    type: "Saltwater",
    identified: "413",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=700&q=80",
  },
];

const trendingSpecies = [
  ["Clupeidae", "325"],
  ["Carangidae", "238"],
  ["Scombridae", "256"],
  ["Serranidae", "214"],
];

const popularTags = ["Freshwater", "Saltwater", "Bass", "Trout", "Perch", "Tropical"];

export default function SpeciesLibraryWorkspace() {
  return (
    <section className="species-library-page">
      <div className="species-library-content">
        <div className="species-library-main">
          <div className="species-library-title">
            <h1>Species Library</h1>
            <p>View and manage details for various fish species</p>
          </div>

          <div className="species-library-toolbar">
            <button type="button">
              <Fish size={16} />
              Select Type
              <ChevronDown size={16} />
            </button>
            <button type="button">
              <Waves size={16} />
              Select Region
              <ChevronDown size={16} />
            </button>
            <button type="button">
              <SlidersHorizontal size={16} />
              Sort by Popularity
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="species-card-grid">
            {speciesCards.map((fish) => (
              <article className="species-library-card" key={fish.name}>
                <img src={fish.image} alt={fish.name} />
                <div>
                  <h2>{fish.name}</h2>
                  <p>{fish.latin}</p>
                  <div className="species-card-meta">
                    <span>{fish.type}</span>
                    <small>{fish.identified} identified</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer className="species-library-pagination">
            <button type="button" aria-label="Previous page">‹</button>
            <span>1 - 33 of 128 species</span>
            <button className="active" type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button" aria-label="Next page">›</button>
          </footer>
        </div>

        <aside className="species-library-aside">
          <label className="species-library-search">
            <Search size={17} />
            <input placeholder="Search species..." aria-label="Search species" />
          </label>

          <section>
            <h2>Trending Species</h2>
            <div className="trending-species-list">
              {trendingSpecies.map(([name, value]) => (
                <article key={name}>
                  <span><Fish size={14} /></span>
                  <strong>{name}</strong>
                  <small>{value}</small>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2>Popular Species Tags</h2>
            <div className="species-tag-cloud">
              {popularTags.map((tag) => (
                <button key={tag} type="button">{tag}</button>
              ))}
            </div>
          </section>

          <a className="species-report-link" href="/platform/analyze">
            View Full Report
            <ChevronRight size={16} />
          </a>
        </aside>
      </div>
    </section>
  );
}
