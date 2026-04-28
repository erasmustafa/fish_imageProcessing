export type Conversation = {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  unread: number;
  updatedAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  author: "me" | "them";
  body: string;
  createdAt: string;
};
