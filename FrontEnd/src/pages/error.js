import "./../css/bootstrap.min.css";
import "./../css/login-css.css";
import { useEffect } from "react";

export function MyError({ content, turnOff }) {
  useEffect(() => {
    setTimeout(() => {
      turnOff();
    }, 2000);
  });
  return (
    <>
      <div style={{marginBottom:"-92px"}}>
        <center>
          <div className="overflow-y-auto alert alert-danger text-black text-center">
            {content}
          </div>
        </center>
      </div>
    </>
  );
}
