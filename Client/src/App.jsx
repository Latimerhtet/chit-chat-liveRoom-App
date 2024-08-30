import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./layouts/Index";
import Home from "./pages/Home";
import Room from "./pages/Room";
import RoomForm from "./pages/RoomForm";
import io from "socket.io-client";
const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/selectRoom",
          element: (
            <RoomForm
              setUsername={setUsername}
              setRoom={setRoom}
              username={username}
              room={room}
              setSocket={setSocket}
            />
          ),
        },
      ],
    },
    {
      path: "/chat",
      element: <Room socket={socket} username={username} room={room} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
