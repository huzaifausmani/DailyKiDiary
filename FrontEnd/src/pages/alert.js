import "./../css/bootstrap.min.css";
import "./../css/login-css.css";
import { useEffect } from "react";

export function MyAlert({ content, turnOff }) {
  useEffect(() => {
    setTimeout(() => {
      turnOff();
    }, 2000);
  });
  return (
    <>
      <div style={{ marginBottom: "-85px" }}>
        <center>
          <div className="overflow-y-auto alert alert-success text-black text-center">
            {content}
          </div>
        </center>
      </div>
    </>
  );
}
