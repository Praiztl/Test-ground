import React, { useState, useRef } from "react";
import "./Inbox.css";
import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiGrin } from "react-icons/bs";
import profile from "../../assets/images/profile.png";
import { Link } from "react-router-dom";
import Picker from "@emoji-mart/react";

const Inbox = () => {
  const users = [
    {
      id: 1,
      name: "User 1",
      occupation: "Software Developer",
      location: "San Francisco, USA",
      email: "user1@example.com",
      number: "+1234567890",
      profileImage: profile,
    },
    {
      id: 2,
      name: "User 2",
      occupation: "Graphic Designer",
      location: "New York, USA",
      email: "user2@example.com",
      number: "+1234567891",
      profileImage: profile,
    },
    {
      id: 3,
      name: "User 3",
      occupation: "Project Manager",
      location: "London, UK",
      email: "user3@example.com",
      number: "+1234567892",
      profileImage: profile,
    },
  ];

  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [view, setView] = useState("users"); // "users", "chat", "profile"
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([{ text: newMessage, type: "sent" }, ...messages]);
      setNewMessage("");
    }
  };

  const handleUserClick = (user) => {
    setCurrentUser(user);
    setMessages([
      { text: `Welcome to the chat with ${user.name}`, type: "received" },
    ]);
    setView("chat");
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([
        { text: `File selected: ${file.name}`, type: "sent" },
        ...messages,
      ]);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(newMessage + emoji.native);
  };

  return (
    <div className="container-fluid full-height mt-2">
      <div className="row full-height">
        {/* User List Section */}
        <div
          className={`col-md-3 bluebox ${view === "users" ? "" : "d-none d-md-block"}`}
        >
          <form action="" className="searchname">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </form>
          <ul className="list-unstyled user-list">
            {users.map((user) => (
              <Link to="#" key={user.id} onClick={() => handleUserClick(user)}>
                <li className="user-item">
                  <img
                    src={user.profileImage}
                    alt=""
                    width={50}
                    className="user-img"
                  />
                  <div className="user-details">
                    <h5 className="user-name">{user.name}</h5>
                    <span className="user-message">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Chat Section */}
        <div
          className={`col-md-6 conversation-section ${view === "chat" ? "" : "d-none d-md-block"}`}
        >
          {currentUser && (
            <button className="btn btnlink" onClick={() => setView("users")}>
              Back to Users
            </button>
          )}
          <div className="text-start">
            <h2
              onClick={() => setView("profile")}
              style={{ cursor: "pointer" }}
            >
              {currentUser ? currentUser.name : "Select a User"}
            </h2>
            <hr />
          </div>
          <div className="conversation-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form
            className="input-group mb-3 formstyle"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              aria-label="Message input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn secondbtn"
                type="button"
                onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
              >
                <BsEmojiGrin className="second" />
              </button>
              <button
                className="btn secondbtn"
                type="button"
                onClick={handleAttachmentClick}
              >
                <GrAttachment className="second" />
              </button>
              <button
                className="btn lastbtn"
                type="button"
                onClick={handleSendMessage}
              >
                <IoIosSend className="last" />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </form>
          {emojiPickerVisible && (
            <div className="emoji-picker">
              <Picker onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div
          className={`col-md-3 profile-section ${view === "profile" ? "" : "d-none d-md-block"}`}
        >
          {currentUser ? (
            <div className="text-center">
              <button className="btn btnlink" onClick={() => setView("chat")}>
                Back to Chat
              </button>
              <img
                src={currentUser.profileImage}
                alt="User Profile"
                className="img-fluid rounded-circle"
              />
              <h4>{currentUser.name}</h4>
              <p>{currentUser.occupation}</p>
              <ul className="list-unstyled text-center">
                <li>
                  <strong>Location:</strong> {currentUser.location}
                </li>
                <li>
                  <strong>Email:</strong> {currentUser.email}
                </li>
                <li>
                  <strong>Number:</strong> {currentUser.number}
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <p>Select a user to see their profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
