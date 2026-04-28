import { conversations } from "../../../lib/constants";

export default function ConversationList() {
  return (
    <aside className="surface section">
      <h2 style={{ marginTop: 0 }}>Konuşmalar</h2>
      <div className="grid">
        {conversations.map((conversation) => (
          <article key={conversation.id}>
            <strong>{conversation.name}</strong>
            <p className="muted" style={{ margin: "4px 0" }}>{conversation.lastMessage}</p>
            <small className="muted">{conversation.updatedAt}</small>
          </article>
        ))}
      </div>
    </aside>
  );
}
