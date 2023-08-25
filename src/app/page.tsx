"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Text from "@/components/Text";
import Timer from "@/utils/Timer";

const Data =
  "exports.DeleteUser = async (req, res, next) => {\n\ttry {\n\t\tconst username = req.user.username;\n\t\tif (!username) {\n\t\t\treturn next({ status: 400, message: 'Missing input'});\n\t\t}\n\t\ttry {\n\t\t\tconst user = await User.DeleteUser(username);\n\t\t\tres.status(200).send({ error: false, message: 'User deleted' });\n\t\t} catch (error) {\n\t\t\treturn next({ status: 404, message: 'User not found' });\n\t\t}\n\t} catch (error) {\n\t\tnext({ status: 500, message: 'Internal Server Error' });\n\t}\n}";

export default function Home() {
  const [timer, setTimer] = useState(new Timer());
  const [text, setText] = useState(new Text(Data));
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (text.textEnd()) return;
    const handleKeyDown = (e: { key: string }): void => {
      if (["Shift", "Control", "Alt", "AltGraph", "Tab"].includes(e.key))
        return;
      console.log(timer.minutes, ":", timer.seconds);

      if (!timer.isRunning && !text.textEnd()) {
        timer.start();
        console.log("Timer started");
      }

      text.keyDownHandler(e.key);

      if (text.textEnd()) {
        timer.stop();
        console.log("Timer stopped");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [text, timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes(timer.minutes);
      setSeconds(timer.seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main>
        <div id="timer" className="text-secondary text-lg mb-4">
          {minutes === 0 ? '' : <><span>{minutes.toString().padStart(2, "0")}</span>:</>}
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        <div id="cursor"></div>
        <div
          id="text"
          className="text-primary text-lg flex flex-col gap-2"
          style={{ whiteSpace: "pre" }}
        >
          {text.Render()}
        </div>
      </main>
      <Footer />
    </>
  );
}
