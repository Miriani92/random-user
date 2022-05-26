import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import Loading from "./components/Loading";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const { loading, user, isError, getData } = useFetch();
  const [info, setInfo] = useState("random user");
  const [value, setValue] = useState("random");
  useEffect(() => {
    getData(url);
  }, []);
  if (loading) {
    return <Loading />;
  }
  const { image } = user;

  const randomGen = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setInfo(newValue);
      setValue(user[newValue]);
    }
  };

  return (
    <article className="app">
      <div className="cardWrapper">
        <div>
          <img src={image ? image : defaultImage} />
        </div>
        <p>my {info} is</p>
        <p>{value}</p>
        <div className="buttonWrapper">
          <button data-label="email" className="icon" onMouseOver={randomGen}>
            <FaEnvelopeOpen />
          </button>
          <button data-label="name" className="icon" onMouseOver={randomGen}>
            <FaUser />
          </button>
          <button data-label="age" className="icon" onMouseOver={randomGen}>
            <FaCalendarTimes />
          </button>
          <button data-label="street" className="icon" onMouseOver={randomGen}>
            <FaMap />
          </button>
          <button data-label="phone" className="icon" onMouseOver={randomGen}>
            <FaPhone />
          </button>
          <button
            data-label="passWord"
            className="icon"
            onMouseOver={randomGen}
          >
            <FaLock />
          </button>
        </div>
        <button className="btn" onClick={() => getData(url)}>
          random
        </button>
      </div>
    </article>
  );
}

export default App;
