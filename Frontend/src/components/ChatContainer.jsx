import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ChatContainer() {
  const { authUser } = useAuthStore();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex scrollbar-hide flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 scrollbar-hide bg-gradient overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            ref={messageEndRef}
            key={message._id}
            className={`flex bg-green- items-end py-1 h-fit ${
              message.senderId === authUser._id
                ? "flex-row-reverse"
                : "flex-row"
            }`}
          >
            <div className="size-10 bg-pink-80  rounded-full overflow-hidden">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`max-w-xs bg-orange-30 px-2  ${
                message.senderId === authUser._id ? "text-right " : "text-left"
              } ml-3`}
            >
              <div
                className={`px-2 py-0.5 flex items-center flex-col justify-center text-sm font-sans font-semibold rounded-2xl  ${
                  message.senderId === authUser._id
                    ? "bg-accent/90 text-primary"
                    : "bg-accent/90 text-primary"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] py-1 object-cover rounded-2xl "
                  />
                )}
                {message.text && (
                  <p className="font-sans px-1  flex flex-wrap h-full w-full py-[3px]">
                    {message.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
