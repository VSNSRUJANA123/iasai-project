import "./styles/subject.css";
import { Link } from "react-router-dom";
const Subjects = (props) => {
  const { values, index } = props;
  const { title, desc, subjects } = values;
  const { name1, name2, name3, name4 } = subjects;
  // order-subject card-order
  if (index % 2 !== 0) {
    return (
      <div className="subject">
        <div className=" subject-desc-container">
          <h1 className="subject-tittle">{title}</h1>
          <p className="subject-desc">{desc}</p>
          {/* <div className="button-container">
            <button className="button">Ask Q & A</button>
            <a className="span">
              <span>Not Ready?Start Prepare</span>
            </a>
          </div> */}
        </div>
        <div className="cards">
          <div>
            <Link to={`${name1}`} className="link">
              <div className="name name1">{name1}</div>
            </Link>
            <Link to={`${name2}`} className="link">
              <div className="name name2">{name2}</div>
            </Link>
          </div>
          <div>
            <Link to={`${name3}`} className="link">
              <div className="name name3">{name3}</div>
            </Link>
            <Link to={`${name4}`} className="link">
              <div className="name name4">{name4}</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="subject">
      <div className="cards card-order">
        <div>
          <Link to={`${name1}`} className="link">
            <div className="name name1">{name1}</div>
          </Link>
          <Link to={`${name2}`} className="link">
            <div className="name name2">{name2}</div>
          </Link>
        </div>
        <div>
          <Link to={`${name3}`} className="link">
            <div className="name name3">{name3}</div>
          </Link>
          <Link to={`${name4}`} className="link">
            <div className="name name4">{name4}</div>
          </Link>
        </div>
      </div>
      <div className="subject-desc-container order-subject">
        <h1 className="subject-tittle">{title}</h1>
        <p className="subject-desc">{desc}</p>
        {/* <div className="button-container">
          <button className="button">Ask Q & A</button>
          <a className="span">
            <span>Not Ready?Start Prepare</span>
          </a>
        </div> */}
      </div>
    </div>
  );
};
export default Subjects;
