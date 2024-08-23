import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import io from "socket.io-client";
const Rooms = ["Chill", "Study", "Meeting"];

const RoomForm = ({ setUsername, setRoom, username, room, setSocket }) => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const joinRoom = (e) => {
    e.preventDefault();
    if (
      username.trim().length > 0 &&
      room !== "none" &&
      room.trim().length > 0
    ) {
      const socket = io.connect("http://localhost:8000");
      setSocket(socket);
      navigate("/chat");
    } else {
      setError("Username is invalid OR room is not seleted!");
      setOpen(true);
    }
  };

  return (
    <section className="py-5 px-10 flex flex-col items-center">
      <Form
        className="flex flex-col w-2/5  border-2 border-orange-500 p-10 rounded-md"
        onSubmit={joinRoom}
      >
        <p className="text-2xl text-center text-orange-500 font-bold mb-6">
          Get Started!
        </p>

        <input
          type="text"
          placeholder="Set Username..."
          name="username"
          id="username"
          className="outline-none p-3 border-2 border-orange-500 text-orange-500 mb-3 rounded-md placeholder:text-orange-500"
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          name="room"
          id="room"
          className="mb-3 p-3 outline-none border-2 text-orange-500 border-orange-500 rounded-md text-center cursor-pointer"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="none" defaultValue={"none"} className="p-2">
            - Choose Room -
          </option>
          {Rooms.map((room) => (
            <option className="p-2" value={room} key={room}>
              {room}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className=" bg-orange-500 text-white font-bold rounded-md p-3"
        >
          Join Room
        </button>
      </Form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Slide}
        key={Slide}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default RoomForm;
