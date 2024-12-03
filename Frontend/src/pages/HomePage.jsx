import ChatContainer from "../components/ChatContainer.jsx";
import { useChatStore } from "../store/useChatStore.js";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Homepage() {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-background">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-background rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;