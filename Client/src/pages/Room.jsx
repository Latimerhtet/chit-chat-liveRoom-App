import { useEffect, useState } from "react";
import Groups2Icon from "@mui/icons-material/Groups2";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from "@mui/icons-material/Send";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
const Room = ({ socket }) => {
  const [users, setUsers] = useState(["user1", "user2", "user3"]);

  const [receiveMessages, setReceivedMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(receiveMessages);
      console.log(data);
      setReceivedMessages((prev) => [...prev, data]);
      console.log(receiveMessages);
    });
  }, [socket]);
  useEffect(() => {
    console.log(receiveMessages);
  }, [receiveMessages]);
  return (
    <section className="flex  w-screen h-screen">
      <div className="w-1/3 h-full text-white  ">
        <p className="lg:text-4xl sm:text-2xl text-center bg-white text-fuchsia-600 m-6">
          Chit-Chat.io
        </p>
        <div className="mb-5">
          <h2 className="p-2 text-2xl m-3 bg-fuchsia-600 rounded-lg flex gap-3 justify-start items-center">
            <Groups2Icon />
            <span>Rooms</span>
          </h2>
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
      <div className="w-2/3 h-full bg-fuchsia-600 flex flex-col items-center ">
        <div className="h-[90%] w-full p-5">
          {receiveMessages.map((message) => {
            <div className="bg-white p-5 rounded-lg">
              <p>Chatbot</p>
              <p>{message}</p>
            </div>;
          })}
        </div>
        <div className="h-[10%] w-full  flex bg-zinc-500">
          <input
            type="text"
            className="w-[90%] h-full outline-none p-5 bg-[#00b4d8] placeholder:text-white text-white"
          />
          <button className="w-[10%] flex justify-center items-center bg-[#00b4d8]">
            <PaperAirplaneIcon className="w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Room;
