import ConversationList from "../../../components/platform/messages/conversation-list";
import MessageInput from "../../../components/platform/messages/message-input";
import MessageThread from "../../../components/platform/messages/message-thread";

export default function MessagesPage() {
  return (
    <div className="grid grid-2" style={{ gridTemplateColumns: "320px minmax(0, 1fr)" }}>
      <ConversationList />
      <div className="grid">
        <MessageThread />
        <MessageInput />
      </div>
    </div>
  );
}
