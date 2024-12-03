import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "../components/Skeletons/SidebarSkeleton";
import { UsersRound } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-accent flex flex-col transition-all duration-200">
      <div className="border-b border-accent w-full p-5">
        <div className="flex items-center gap-2">
          <UsersRound className="size-6 text-primary" />
          <span className="text-2xl text-primary hidden font-main font-semibold  lg:block">
            Contacts
          </span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="bg-accent checked:bg-primary text-black appearance-none w-4 h-4 border border-accent rounded-sm cursor-pointer"
            />
            <span className="text-xs font-main text-primary/40 font-semibold">
              Show online only
            </span>
          </label>
          <span className="text-xs text-primary/90">
            ({onlineUsers?.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-card text-primary transition-colors
              ${selectedUser?._id === user._id ? "bg-card " : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user?.profilePic || "/avatar.png"}
                alt={user?.fullName}
                className="size-12 bg-accent object-cover rounded-full"
              />
              {onlineUsers?.includes(user._id) && (
                <span
                  className="absolute bottom-1 right-1 size-2 bg-green-500 
                  rounded-full ring-2 ring-ring"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-main text-xl font-semibold truncate">
                {user?.fullName}
              </div>
              <div className="text-[12px] tracking-wider font-main font-semibold text-primary/40">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers?.length === 0 && (
          <div className="text-center font-main font-semibold text-primary text-xl py-4">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
