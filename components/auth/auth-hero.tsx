export default function AuthHero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: 32,
        display: "grid",
        alignItems: "end",
        background:
          "linear-gradient(180deg, rgba(7,17,31,0.1), rgba(7,17,31,0.9)), url('https://images.unsplash.com/photo-1518602164578-cd0074062767?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <p style={{ letterSpacing: "0.18em", fontWeight: 800 }}>AQUASCOPE</p>
        <h1 style={{ fontSize: 48, lineHeight: 1 }}>Deniz bilgisini hesabında tut.</h1>
      </div>
    </section>
  );
}
