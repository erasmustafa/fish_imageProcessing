import { messages } from "../../../lib/constants";

export default function MessageThread() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Ege Ekibi</h2>
      <div className="grid">
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              justifySelf: message.author === "me" ? "end" : "start",
              maxWidth: 520,
              padding: 14,
              borderRadius: 8,
              background: message.author === "me" ? "#2fc6d6" : "#0e1f32",
              color: message.author === "me" ? "#06131d" : "#e5eef8",
            }}
          >
            {message.body}
            <small style={{ display: "block", marginTop: 8, opacity: 0.72 }}>
              {message.createdAt}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
