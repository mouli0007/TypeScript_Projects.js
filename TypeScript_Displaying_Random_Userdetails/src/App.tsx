import { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

interface Details {
  image: string;
  phone: number | string;
  email: string;
  password: string;
  age: number | string;
  street: string;
  name: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [person, setPerson] = useState<any>(null);
  const [title, setTitle] = useState<string>("name");
  const [value, setValue] = useState<string>("random person");

  // Function for fetching the user !

  const getPerson = async (): Promise<any> => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];

      const { phone, email } = person;
      const { large: image } = person.picture;

      const {
        login: { password },
      } = person;

      const { first, last } = person.name;

      const {
        dob: { age },
      } = person;

      const {
        street: { number, name },
      } = person.location;

      const newPerson: Details = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };

      setPerson(newPerson);
      setLoading(false);
      setTitle("name");
      setValue(newPerson.name);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  // Details Hovering !

  const handleValue = (e: any | MouseEvent) => {
    if (e.target.classList.contains("icon")) {
      const newValue: string = e.target.dataset.label;

      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <p>Random User Detais !</p>

          <img
            src={person ? person.image : defaultImage}
            alt="random-user"
            className="user-img"
          />
          <p className="user-title">My {title} is </p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={() => getPerson()}>
            {loading ? "Loading...." : "Random User"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
