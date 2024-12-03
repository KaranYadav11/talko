import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle, Settings, UserRound } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { nullSelectedUser } = useChatStore();

  return (
    <header
      className="bg-background  border-b fixed w-full top-0 z-40 
    backdrop-blur-lg "
    >
      <div className="container  mx-auto px-4 h-16">
        <div className="flex  items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-heading text-primary/90 font-semibold">
                Talko
              </h1>
            </Link>
          </div>

          <div className="flex h-5 justify-center  items-center gap-4">
            <Link
              to={"/setting"}
              className={` flex items-center bg-primary/20 w-fit h-fit px-2 py-1 rounded-xl gap-2 transition-colors
              
              `}
            >
              <Settings className="size-[18px] text-primary" />
              <span className="hidden text-primary/90 font-semibold text-sm font-main sm:inline">
                Settings
              </span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`flex items-center  bg-primary/20 w-fit h-fit px-2 py-1 rounded-xl gap-2`}
                >
                  <UserRound className="size-[18px] text-primary" />
                  <span className="hidden text-sm font-main font-semibold text-primary/90 sm:inline">
                    Profile
                  </span>
                </Link>

                <button
                  className="flex gap-2 bg-primary/20 font-semibold w-fit h-fit px-2 py-1 rounded-xl items-center"
                  onClick={() => {
                    nullSelectedUser();
                    logout();
                  }}
                >
                  <LogOut className="size-[18px] text-primary" />
                  <span className="hidden text-sm text-primary font-main sm:inline">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
