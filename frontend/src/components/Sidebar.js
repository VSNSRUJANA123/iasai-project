import { useState } from "react";
import "./styles/sidebar.css";

const Sidebar = (props) => {
  const { topic, search, sidebar, onClose } = props;
  const [activeItem, setActiveItem] = useState("");
  const handleItemClick = (item) => {
    setActiveItem(item);
    onClose(); // Close sidebar when an item is clicked
  };
  return (
    <div className={`sidebar ${sidebar && " sidebar-menu"}`}>
      <div className="sidebar-padding">
        {/* <div className="closeIcon" onClick={closeIcon}>
          <IoIosCloseCircle className="close-icon" />
        </div> */}
        <h3>{search}</h3>
        <div className="topics">
          {topic.map((items, index) => {
            return (
              <p
                className={`${!sidebar && "hide-bar"}`}
                onClick={onClose}
                // onClick={() => handleItemClick(item)}
                key={index}
              >
                {items}
              </p>
            );
          })}
        </div>
        <h3>Tests</h3>
        <hr />
        <p onClick={onClose} className="txt">
          PYQs
        </p>
        <p onClick={onClose} className="txt">
          PTQs
        </p>
        <p onClick={onClose} className="txt">
          TTS
        </p>
        <p onClick={onClose} className="txt">
          TAS
        </p>
      </div>
    </div>
  );
};
export default Sidebar;
