import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaMicrophone } from "react-icons/fa";
import Chat from "./Chat";
import { IoIosArrowForward } from "react-icons/io";
import BeatLoader from "react-spinners/BeatLoader";
import { baseUrl } from "../../src/url";
import { HiMenuAlt4 } from "react-icons/hi";
import axios from "axios";
import "./styles/chatbot.css";
import { FaArrowCircleUp } from "react-icons/fa";
const Chatbot = () => {
  const { search } = useParams();
  const [result, setResults] = useState("");
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userList, setUserList] = useState("");
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const menuIcon = (sidebar) => {
    setSidebar(!sidebar);
  };
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/search`, {
          params: { subjectName: search },
        });
        setResults(response.data[0].title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleSearch();
  }, []);
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchChat = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/message`, {
        message: message,
      });
      setLoading(false);
      if (message !== "") {
        setReply(response.data.reply);
        const chatRes = {
          message,
          reply: response.data.reply,
          error,
        };
        setChatList([...chatList, chatRes]);
      }
    } catch (error) {
      setError("Invalid message");
      setLoading(false);
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleFetchTopics = async () => {
      try {
        const response = await axios.post(`${baseUrl}/subject/topics`, {
          subject: search,
        });
        setTopic(response.data.topics);
      } catch (error) {
        setError("Error fetching topics");
        console.error("Error fetching topics:", error);
      }
    };
    handleFetchTopics();
  }, []);

  const changeInput = (e) => {
    setInput(e.target.value);
  };
  const userTextFun = (input) => {
    setUserList(input);
  };
  const sendBtn = () => {
    fetchChat(input);
    setInput("");
  };
  const submit = (e) => {
    e.preventDefault();
    userTextFun(input);
  };
  // console.log("usertext", userList, chatList);
  return (
    <div className="chatbot-container">
      <div className="direction-container">
        <HiMenuAlt4
          onClick={() => menuIcon(sidebar)}
          className="chat-menu-icon"
        />
        <div className="direction">
          <h3>
            UPSC <IoIosArrowForward /> {result}
          </h3>
        </div>
        <HiMenuAlt4 className="chat-menu-disable" />
      </div>
      <div className="sidebar-chatbot-container">
        <Sidebar
          topic={topic}
          search={search}
          sidebar={sidebar}
          onClose={() => setSidebar(false)}
        />
        <div className="chatbot">
          <h2>{search}</h2>
          <hr className="hr" />
          <div className="bot-text">
            <h3>{search}</h3>
            <p>
              Welcome to the IASAI {search} Guide! I'm here to help you
              understand the intricacies on {search} and related topics. Whether
              you're preparing for the IAS exams or simply curious about polity,
              I'm here to provide insights and explanations.
            </p>
          </div>
          <Chat chatList={chatList} />
          <form className="text-box" onSubmit={submit}>
            <FaMicrophone className="mic-icon" />
            <input
              onChange={changeInput}
              value={input}
              placeholder="Enter user message..."
              type="text"
            />
            <div className="send-btn">
              {loading ? (
                <BeatLoader
                  color="#dddddd"
                  height="30"
                  width="30"
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <button onClick={sendBtn}>
                  <FaArrowCircleUp className="up-arrow" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chatbot;
