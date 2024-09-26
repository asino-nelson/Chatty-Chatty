import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { MdSend } from "react-icons/md";

const ChatsDetails = () => {
  const baseUrl = "http://127.0.0.1:8000/api";

  const [message, setMessage] = useState([]);

  let [newMessage, setNewMessage] = useState({ message: "" });

  const axios = useAxios();
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const receiver_id = useParams();
  const id = useParams();
  console.log(receiver_id);

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/get-messages/${user_id}/${receiver_id.id}/`)
        .then((res) => {
          console.log("API response", res.data);
          setMessage(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [receiver_id, newMessage]);

  const handleChange = (event) => {
    setNewMessage({
      ...newMessage,
      [event.target.name]: event.target.value,
    });
  };

  console.log(newMessage);

  const SendMessage = () => {
    const formdata = new FormData();
    formdata.append("user", user_id);
    formdata.append("sender", user_id);
    formdata.append("receiver", id.id);
    formdata.append("message", newMessage.message);
    formdata.append("is_read", false);

    try {
      axios.post(`${baseUrl}/send-message/`, formdata).then((res) => {
        console.log(res.data);
        setNewMessage((newMessage = ""));
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      {message.length > 0 && (
        <div className="w-full pl-10 h-20 flex items-center border-r border-slate-400 bg-slate-300">
          {/* Find the first message where the sender is not the current user */}
          {message.find((msg) => msg.sender.id !== user_id) && (
            <div className="flex items-center space-x-4">
              <img
                className="rounded-full w-12 h-12"
                src={
                  message.find((msg) => msg.sender.id !== user_id)
                    .sender_profile.image
                }
                alt="profile-picture"
              />
              <h1 className="font-semibold ml-5">
                {
                  message.find((msg) => msg.sender.id !== user_id).sender
                    .username
                }
              </h1>
            </div>
          )}
        </div>
      )}

      <div className="w-full h-full flex flex-col-reverse px-20 md:px-5 pb-6 overflow-y-auto no-scrollbar">
        {message.length > 0 ? (
          message
            .slice()
            .reverse()
            .map((message, index) => (
              <div
                key={index}
                className={`flex flex-col mb-3 p-2 max-w-md md:max-w-xs rounded-md cursor-pointer ${
                  message.sender.id !== user_id
                    ? "bg-white"
                    : "bg-green-300 self-end"
                }`}
              >
                <h1>{message.message}</h1>
                <p className="text-slate-500 text-sm self-end">
                  {new Date(message.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
        ) : (
          <p className="text-center text-3xl font-semibold text-gray-700 mt-[50%]">
            Your chats will appear here
          </p>
        )}
      </div>
      <div className="w-full h-16 bg-slate-300 p-4 flex items-center justify-around">
        <input
          type="text"
          className="w-[80%] h-12 px-3 rounded-sm border-none outline-none"
          placeholder="Type a message"
          name="message"
          value={newMessage.message}
          onChange={handleChange}
        />
        <button
          onClick={SendMessage}
          className="px-3 py-2 rounded-sm bg-gray-500 hover:bg-gray-500/50"
        >
          <MdSend color="white" size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatsDetails;
