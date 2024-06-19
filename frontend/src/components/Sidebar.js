import "./styles/sidebar.css";

const Sidebar = (props) => {
  const { topic, search, sidebar } = props;
  return (
    <div className="sidebar">
      <div className={`sidebar-hide ${sidebar && " sidebar-menu"}`}>
        {/* <div className="closeIcon" onClick={closeIcon}>
          <IoIosCloseCircle className="close-icon" />
        </div> */}
        <h3>{search}</h3>
        <div className="topics">
          {topic.map((items, index) => {
            return <p key={index}>{items}</p>;
          })}
        </div>
        <h3>Add Tests</h3>
        <hr />
        <p className="txt">PYQs</p>
        <p className="txt">PTQs </p>
        <p className="txt">TTS </p>
        <p className="txt">TAS</p>
      </div>
    </div>
  );
};
export default Sidebar;
