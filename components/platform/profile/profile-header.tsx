import { demoUser } from "../../../lib/constants";

export default function ProfileHeader() {
  return (
    <section className="surface section">
      <p className="muted" style={{ marginTop: 0 }}>{demoUser.handle}</p>
      <h2 style={{ margin: "4px 0", fontSize: 36 }}>{demoUser.name}</h2>
      <p className="muted">{demoUser.level} · {demoUser.region}</p>
    </section>
  );
}
