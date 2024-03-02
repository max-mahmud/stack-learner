import React from "react";
import { Result } from "../utils/Result";

const Check = () => {
  let result = Result();
  return (
    <div>
      <h2>{result ? "Its working" : "Not working"}</h2>
      <h4>How its works</h4>
    </div>
  );
};

export default Check;
