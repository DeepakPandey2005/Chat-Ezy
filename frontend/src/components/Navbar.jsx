import { Info, LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { logOut, authUser } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex gap-1 p-1 items-center">
        <MessageSquare className="w-6 h-6" />
        <p className="text-xl  font-bold" onClick={() => navigate("/")}>
          ChatEzy
        </p>
      </div>
      <div className="flex justify-around gap-4 p-3">
        <Settings onClick={() => navigate("/settings")} />

        {authUser && (
          <>
            <User
              className="cursor-pointer"
              onClick={() => navigate("/profile")}
            />
            <LogOut onClick={logOut} className="cursor-pointer" />
          </>
        )}
        <Info className="cursor-pointer" onClick={() => navigate("/about")} />
      </div>
    </div>
  );
};

export default Navbar;
