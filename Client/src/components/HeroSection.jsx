import React from "react";
import chatting from "../assets/Chatting.webp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div className="w-4/5 flex flex-col ">
      <p className="text-center text-xl">
        Welcome to <span className="text-purple-800 font-bold ">Chit Chat</span>
        , Your Ultimate Online Chatting Experience!
      </p>
      <div className="flex gap-7 mt-4 ">
        <img src={chatting} className="flex-grow" alt="Chatting" />
        <div className="pt-20 flex flex-col gap-10 flex-grow-0">
          <p>
            Connect with friends, family, or meet new people from around the
            world on Chit-Chat.io. Our platform offers a secure and engaging
            environment where you can chat, share, and enjoy seamless
            communication in real-time. Whether you're looking to discuss your
            favorite topics, share your thoughts, or simply stay in touch with
            loved ones, we've got you covered.
          </p>
          <Link
            to={"/selectRoom"}
            className="p-2 bg-orange-600 text-white self-start flex gap-1 items-center rounded-md"
          >
            <span>Start Chilling </span> <KeyboardDoubleArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
