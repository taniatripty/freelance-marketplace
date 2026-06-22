import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router";

type Notification = {
  _id: string;
  userId: string;
  senderId: string;
  type: string;
  title: string;
  message: string;
  orderId?: string;
  isRead: boolean;
  createdAt: string;
};

const NotificationBell = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  // ---------------- FETCH NOTIFICATIONS ----------------
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;

      try {
        const res = await axiosInstance.get(`/notifications/${userId}`);
        setNotifications(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [userId]);

  // ---------------- UNREAD COUNT ----------------
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // ---------------- CLICK NOTIFICATION ----------------
  const handleClick = async (notif: Notification) => {
    try {
      // mark as read (optional UI update)
      await axiosInstance.patch(`/notifications/${notif._id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notif._id ? { ...n, isRead: true } : n
        )
      );

      setOpen(false);

      // navigate based on type
      if (notif.orderId) {
        navigate(`/chat/${notif.orderId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {/* 🔔 ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-100"
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📩 DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg z-50">
          
          {/* HEADER */}
          <div className="p-3 border-b font-semibold">
            Notifications
          </div>

          {/* LIST */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-gray-500 text-center">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleClick(n)}
                  className={`p-3 border-b cursor-pointer hover:bg-slate-50 ${
                    !n.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  {/* TITLE */}
                  <p className="text-sm font-semibold">
                    {n.title}
                  </p>

                  {/* MESSAGE */}
                  <p className="text-sm text-gray-600">
                    {n.message}
                  </p>

                  {/* TIME */}
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;