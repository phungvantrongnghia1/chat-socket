export type PayloadCreateMessage = {
  userId: string;
  friendId: string;
  message: string;
};
export type MessageResponse = {
  id: string;
  content: string;
  createdAt: Date;
  fromId: string;
  toId: string;
  isFromSender: boolean;
};
