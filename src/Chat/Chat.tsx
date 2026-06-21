// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { useAuth } from "@/AuthContex/UseAuth";
// import axiosInstance from "@/UseAxios/axios";

// type Message = {
//   senderId: string;
//   text: string;
//   createdAt: string;
// };

// type ChatType = {
//   orderId: string;
//   messages: Message[];
// };

// const Chat = () => {
//   const { orderId } = useParams();
//   const { user } = useAuth();

//   const [chat, setChat] = useState<ChatType | null>(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);

//   // ---------------- FETCH CHAT ----------------
//   useEffect(() => {
//     const fetchChat = async () => {
//       try {
//         const res = await axiosInstance.get(`/chat/${orderId}`);
//         setChat(res.data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) fetchChat();
//   }, [orderId]);

//   // ---------------- SEND MESSAGE ----------------
//   const sendMessage = async () => {
//     if (!text.trim() || !user || !orderId) return;

//     const newMessage: Message = {
//       senderId: user.uid,
//       text,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       setSending(true);

//       // optimistic UI update
//       setChat((prev) =>
//         prev
//           ? {
//               ...prev,
//               messages: [...prev.messages, newMessage],
//             }
//           : {
//               orderId: orderId,
//               messages: [newMessage],
//             }
//       );

//       setText("");

//       // ✅ FIX: send correct payload
//       await axiosInstance.post(`/chat/${orderId}/message`, {
//         orderId,
//         senderId: user.uid,
//         text,
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSending(false);
//     }
//   };

//   // ---------------- LOADING ----------------
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading chat...
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-slate-100">

//       {/* HEADER */}
//       <div className="bg-white border-b p-4 shadow-sm">
//         <h1 className="text-lg font-semibold">
//           💬 Order Chat #{orderId}
//         </h1>
//       </div>

//       {/* MESSAGES */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">

//         {!chat?.messages || chat.messages.length === 0 ? (
//           <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
//             <div className="text-6xl">💬</div>

//             <h2 className="text-xl font-semibold mt-3">
//               No messages yet
//             </h2>

//             <p className="text-sm mt-2 max-w-sm">
//               Start conversation between buyer and seller
//             </p>
//           </div>
//         ) : (
//           chat.messages.map((msg, index) => {
//             const isMe = msg.senderId === user?.uid;

//             return (
//               <div
//                 key={index}
//                 className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow
//                   ${
//                     isMe
//                       ? "bg-blue-600 text-white rounded-br-none"
//                       : "bg-white text-black rounded-bl-none"
//                   }`}
//                 >
//                   <p>{msg.text}</p>

//                   <span className="block text-[10px] mt-1 opacity-70">
//                     {new Date(msg.createdAt).toLocaleTimeString()}
//                   </span>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* INPUT */}
//       <div className="bg-white border-t p-4 flex gap-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//         />

//         <button
//           onClick={sendMessage}
//           disabled={sending}
//           className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
//         >
//           {sending ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "@/AuthContex/UseAuth";
import axiosInstance from "@/UseAxios/axios";

type Message = {
  senderId: string;
  text: string;
  createdAt: string;
};

type ChatType = {
  orderId: string;
  buyerId: string;
  sellerId: string;
  messages: Message[];
};

const Chat = () => {
  const { orderId } = useParams();
  const { user } = useAuth();

  const [chat, setChat] = useState<ChatType | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // ---------------- FETCH CHAT ----------------
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axiosInstance.get(`/chat/${orderId}`);
        setChat(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchChat();
    }
  }, [orderId]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async () => {
    if (!text.trim() || !user || !orderId || !chat) return;

    const messageText = text;

    const newMessage: Message = {
      senderId: user.uid,
      text: messageText,
      createdAt: new Date().toISOString(),
    };

    try {
      setSending(true);

      // Optimistic UI
      setChat((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMessage],
            }
          : prev
      );

      setText("");

      // Send Message
      await axiosInstance.post(`/chat/${orderId}/message`, {
        orderId,
        senderId: user.uid,
        text: messageText,
      });

      // ---------------- CREATE NOTIFICATION ----------------

      const receiverId =
        user.uid === chat.buyerId
          ? chat.sellerId
          : chat.buyerId;

      await axiosInstance.post("/notifications", {
        userId: receiverId,
        senderId: user.uid,
        orderId,
        title: "New Message",
        message: messageText,
        isRead: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* HEADER */}
      <div className="bg-white border-b p-4 shadow-sm">
        <h1 className="text-lg font-semibold">
          💬 Order Chat
        </h1>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {!chat?.messages?.length ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <div className="text-6xl">💬</div>

            <h2 className="text-xl font-semibold mt-3">
              No messages yet
            </h2>

            <p className="text-sm mt-2 max-w-sm">
              Start the conversation between buyer and seller.
            </p>
          </div>
        ) : (
          chat.messages.map((msg, index) => {
            const isMe = msg.senderId === user?.uid;

            return (
              <div
                key={index}
                className={`flex ${
                  isMe
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow text-sm
                  ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-black rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>

                  <span className="block text-[10px] mt-1 opacity-70">
                    {new Date(
                      msg.createdAt
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* INPUT */}
      <div className="bg-white border-t p-4 flex gap-2">
        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Type your message..."
          className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={sendMessage}
          disabled={sending}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;