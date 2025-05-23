import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE==="developmet"? "http://localhost:8080/api":"/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,
  socket: null,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("Error in checkAuth ", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("account created successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(res.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logOut: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("login succesfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    console.log(data);
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("profile updated successfully");
    } catch (err) {
      console.log("error in update profile");
      toast.error("error in upload file ! select small file ");
    } finally {
      set({ isUpdateProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
