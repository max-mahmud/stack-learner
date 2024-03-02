import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [state, setState] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const data = async () => {
      try {
        const { data } = await axios.get("https://dummyjson.com/products/1");
        setState(data);
      } catch (error) {
        setError(error);
      }
    };
    data();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <div>
        <h4>{state?.title}</h4>
        <span>{state?.description}</span>
        <p>{state?.price}</p>
      </div>
      <div>{error ? <span data-testid="error-message">{"Fetch failed"}</span> : ""}</div>
    </div>
  );
};

export default Home;
