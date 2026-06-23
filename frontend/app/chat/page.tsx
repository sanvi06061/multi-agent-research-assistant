import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/ChatBox";

export default function ChatPage() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">
        <ChatBox />
      </div>

    </div>
  );
}