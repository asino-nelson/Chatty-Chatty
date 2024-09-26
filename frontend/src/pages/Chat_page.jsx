import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { Link, Outlet } from "react-router-dom";
import Search_input from "../components/search/Search_input";

const Chat_page = () => {
  const baseURL = "https://chatty-backend-two.vercel.app/api";

  const { logoutUser } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);

  const axios = useAxios();

  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  useEffect(() => {
    try {
      axios.get(baseURL + "/inbox/" + user_id + "/").then((res) => {
        console.log("API sesponse:", res.data);
        setMessages(res.data);
      });
    } catch (error) {
      console.log("Error fetching message", error);
    }
  }, [user_id]);

  console.log(messages);

  return (
    <div className="bg-zinc-300 w-full h-screen">
      <div className="bg-emerald-600 w-full h-36">
        <button
          onClick={logoutUser}
          className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white font-semibold m-5"
        >
          Log out
        </button>
      </div>
      <div className=" flex w-[80%] h-[90vh] md:w-[95%] mx-auto -mt-28 md:-mt-20">
        <div className="bg-white w-1/3 h-full">
          <div className="w-full pl-10 h-20 flex items-center border-r border-slate-400 bg-slate-300">
            {messages.length > 0 &&
              messages.some((message) => message.sender.id === user_id) && (
                <div className="flex items-center space-x-4 cursor-pointer">
                  <img
                    className="rounded-full w-12 h-12"
                    src={
                      messages.find((message) => message.sender.id === user_id)
                        .sender_profile.image
                    }
                    alt="profile-picture"
                  />
                  <h1 className="font-semibold ml-5">
                    {
                      messages.find((message) => message.sender.id === user_id)
                        .sender.username
                    }{" "}
                  </h1>
                </div>
              )}
          </div>

          {/* <Search_input /> */}
          < Search_input/>
          {messages.length === 0 ? (
            <p>No messages found</p>
          ) : (
            messages.map((message) => (
              <Link
                to={
                  "inbox/" +
                  (message.sender.id === user_id
                    ? message.receiver.id
                    : message.sender.id) +
                  "/"
                }
                key={message.id}
                className="w-full py-4 cursor-pointer border-b-2 border-gray-200 hover:bg-gray-200  flex items-center justify-center"
              >
                <div className="w-1/4 h-full flex items-center justify-center">
                  {message.sender.id !== user_id && (
                    <img
                      className="rounded-full w-16 h-16"
                      src={message.sender_profile.image}
                      alt="profile-picture"
                    />
                  )}
                  {message.sender.id === user_id && (
                    <img
                      className="rounded-full w-16 h-16"
                      src={message.receiver_profile.image}
                      alt="profile-picture"
                    />
                  )}
                </div>
                <div className="w-3/4 h-full flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-lg font-semibold">
                      {message.sender.id !== user_id
                        ? message.sender.username
                        : message.receiver.username}
                    </h1>
                    <p className="text-md font-light truncate text-ellipsis overflow-hidden lg:w-[350px] md:w-[120px] sm:w-[100px]">{message.message}</p>
                  </div>
                  <p className="-mt-4 text-sm text-gray-500">
                    {new Date(message.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="bg-stone-400 w-2/3 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Chat_page;
