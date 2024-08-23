import { useEffect, useState } from "react";
import Groups2Icon from "@mui/icons-material/Groups2";
import PeopleIcon from "@mui/icons-material/People";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
const Room = ({ socket }) => {
  const [users, setUsers] = useState(["user1", "user2", "user3"]);
  const [receiveMessages, setReceivedMessages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("message", (data) => {
      setReceivedMessages((pre) => [...pre, data]);
    });
    return () => socket.disconnect();
  }, [socket]);
  console.log(receiveMessages);

  const disconnect = () => {
    navigate("/selectRoom");
  };
  return (
    <section className="flex  w-screen h-screen">
      <div className="w-1/3 h-full text-white flex flex-col justify-between">
        <div>
          <p className="lg:text-4xl sm:text-2xl text-center bg-white text-fuchsia-600 m-6">
            Chit-Chat.io
          </p>
          <div className="mb-5">
            <div className="p-3 ">
              <h2 className="p-2 text-2xl  bg-fuchsia-600 rounded-lg flex gap-3 justify-start items-center">
                <Groups2Icon />
                <span>Rooms</span>
              </h2>
            </div>

            <p className="ml-3 text-xl bg-fuchsia-600 text-center p-2 rounded-l-3xl">
              Room 1
            </p>
          </div>
          <div>
            <h2 className="p-2 text-2xl text-center m-3 bg-fuchsia-600 rounded-lg flex gap-3 justify-start items-center">
              <PeopleIcon />
              <span>Users</span>
            </h2>
            {users.map((user) => (
              <p
                className="p-2 text-xl text-center m-3 bg-fuchsia-600 rounded-lg "
                key={user}
              >
                {user}
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
        <div className="h-[90%] w-full p-5 overflow-y-scroll">
          {receiveMessages.map((msg, index) => (
            <div
              className="bg-white p-3 rounded-lg rounded-tl-3xl rounded-br-3xl rounded-bl-none mb-3"
              key={index}
            >
              <p className="text-sm">{msg.username}</p>
              <p className="text-xl">{msg.message}</p>
              <p className="text-right">{formatDistanceToNow(msg.sent_at)}</p>
            </div>
          ))}
        </div>
        <div className="h-[10%] w-full  flex items-center">
          <input
            type="text"
            className="w-[90%] h-full outline-none p-5 bg-fuchsia-600 placeholder:text-white text-white"
            placeholder="message ..."
          />
          <button className="w-[10%] flex justify-center items-center ">
            <PaperAirplaneIcon className="w-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Room;
