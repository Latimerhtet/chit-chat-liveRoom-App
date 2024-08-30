import { useEffect, useRef, useState } from "react";
import Groups2Icon from "@mui/icons-material/Groups2";
import PeopleIcon from "@mui/icons-material/People";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
const Room = ({ socket, username, room }) => {
  const [users, setUsers] = useState([]);
  const [receiveMessages, setReceivedMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const messageBoxRef = useRef(null);

  const getOldMessages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/chat/${room}`
    );
    const result = await response.json();
    if (response.status === 403) {
      return navigate("/");
    }
    setReceivedMessages((pre) => [...pre, ...result]);
  };
  useEffect(() => {
    getOldMessages();
  }, []);
  // connecting with server (socket.io)
  useEffect(() => {
    // sending join user info to server
    socket.emit("joined_room", { username, room });

    // getting a message from server
    socket.on("message", (data) => {
      setReceivedMessages((pre) => [...pre, data]);
    });

    //getting room users from server
    socket.on("room_users", (data) => {
      const onlyUsers = [];
      for (let user of data) {
        onlyUsers.push(user.username);
      }
      setUsers(onlyUsers);
    });
    return () => socket.disconnect();
  }, [socket]);

  // sending message
  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit("message_sent", message);
      setMessage("");
    }
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [receiveMessages]);
  // leaving the room
  const disconnect = () => {
    navigate("/selectRoom");
  };
  return (
    <section className="flex  w-screen h-screen">
      <div className="w-1/3 h-full text-white flex flex-col justify-between">
        <div>
          <p className="lg:text-4xl sm:text-3xl text-center bg-white text-fuchsia-600 m-6">
            Chit-Chat.io
          </p>
          <div className="mb-5">
            <div className="p-3 ">
              <h2 className="p-2 lg:text-xl sm:text-lg text-fuchsia-600 border-2  border-fuchsia-600 rounded-lg flex gap-3 justify-start items-center">
                <Groups2Icon />
                <span>Rooms</span>
              </h2>
            </div>

            <p className="ml-3 lg:text-xl sm:text-lg bg-fuchsia-600 text-center p-2 rounded-l-3xl">
              {room}
            </p>
          </div>
          <div>
            <h2 className="p-2 lg:text-xl sm:text-lg text-center m-3 text-fuchsia-600 border-2  border-fuchsia-600 rounded-lg flex gap-3 justify-start items-center">
              <PeopleIcon />
              <span>Users</span>
            </h2>
            {users.map((user) => (
              <p
                className="p-2 text-xl text-fuchsia-600 m-3  rounded-lg "
                key={user}
              >
                {user === username ? "You" : user}
              </p>
            ))}
          </div>
        </div>
        <button
          className="m-3 border-2 border-fuchsia-600 rounded-lg  flex justify-center items-center gap-3 py-2 "
          onClick={disconnect}
        >
          <span className="text-fuchsia-600 text-lg">Leave</span>
          <ArrowRightEndOnRectangleIcon className="text-fuchsia-600 w-6" />
        </button>
      </div>
      <div className="w-2/3 h-full bg-fuchsia-600 flex flex-col items-center ">
        <div className="h-[90%] w-full p-5 overflow-y-auto" ref={messageBoxRef}>
          {receiveMessages.map((msg, index) => (
            <div
              className=" w-2/4 min-w-48 bg-white p-3 rounded-lg rounded-tl-3xl rounded-br-3xl rounded-bl-none mb-3"
              key={index}
            >
              <p className="text-sm">{msg.username}</p>
              <p className="text-base">{msg.message}</p>
              <p className="text-right">{formatDistanceToNow(msg.sent_at)}</p>
            </div>
          ))}
        </div>
        <div className="h-[10%] w-full  flex items-center">
          <input
            type="text"
            className="w-[90%] h-full outline-none p-5 bg-fuchsia-600 placeholder:text-white text-white"
            placeholder="message ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="w-[10%] flex justify-center items-center "
          >
            <PaperAirplaneIcon className="w-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Room;
