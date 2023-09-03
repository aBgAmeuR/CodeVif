"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Text from "@/components/Text";
import Timer from "@/utils/Timer";
import LanguageModal from "@/components/LanguageModal";
import Data from "@/utils/Data";

const Datas =
  "exports.DeleteUser = async (req, res, next) => {\n\ttry {\n\t\tconst username = req.user.username;\n\t\tif (!username) {\n\t\t\treturn next({ status: 400, message: 'Missing input'});\n\t\t}\n\t\ttry {\n\t\t\tconst user = await User.DeleteUser(username);\n\t\t\tres.status(200).send({ error: false, message: 'User deleted' });\n\t\t} catch (error) {\n\t\t\treturn next({ status: 404, message: 'User not found' });\n\t\t}\n\t} catch (error) {\n\t\tnext({ status: 500, message: 'Internal Server Error' });\n\t}\n}";

export default function Home() {
  const [data, setData] = useState(new Data());
  const [timer, setTimer] = useState(new Timer());
  const [text, setText] = useState(new Text(Datas));
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [language, setLanguage] = useState("JavaScript");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setText(new Text(data.getText()));
  }, [data]);

  useEffect(() => {
    if (text.textEnd()) return;
    const handleKeyDown = (e: { key: string }): void => {
      if (["Shift", "Control", "Alt", "AltGraph", "Tab"].includes(e.key)) return;

      if (!timer.isRunning && !text.textEnd()) {
        timer.start();
      }

      text.keyDownHandler(e.key);

      if (text.textEnd()) {
        timer.stop();
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
  }, [timer.minutes, timer.seconds]);

  const restartText = () => {
    text.restart();
    timer.stop();
    timer.reset();
  }
  const changeText = () => {
    restartText();
    data.newText();
    setText(new Text(data.getText()));
  }

  return (
    <>
      <Header />
      <main className={isModalOpen ? "blur-[4px]" : ""}>
        <div className="flex flex-row justify-center items-center mb-4 relative">
          <div id="timer" className="text-secondary text-lg absolute left-0">
            {minutes === 0 ? '' : <><span>{minutes.toString().padStart(2, "0")}</span>:</>}
            {seconds === 0 && minutes === 0 ? '' : <span>{seconds.toString().padStart(2, "0")}</span>}
          </div>
          <div id="langage" className="flex gap-3 flex-row p-2 items-center select-none" onClick={() => setIsModalOpen(true)}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.29004 0.25C12.54 0.25 16.04 3.75 16.04 8C16.04 12.2812 12.54 15.75 8.29004 15.75C4.00879 15.75 0.540039 12.2812 0.540039 8C0.540039 3.75 4.00879 0.25 8.29004 0.25ZM10.8525 11.4375C11.1025 11.1875 11.29 10.8125 11.29 10.4062C11.29 10.1562 11.165 9.90625 11.0088 9.75L10.5713 9.3125C10.3838 9.125 10.1338 9 9.85254 9H7.79004C7.47754 8.875 7.10254 8 6.79004 8C6.44629 8 6.13379 7.9375 5.82129 7.78125L5.47754 7.625C5.35254 7.5625 5.29004 7.4375 5.29004 7.28125C5.29004 7.125 5.38379 6.96875 5.54004 6.9375L6.50879 6.59375C6.54004 6.59375 6.60254 6.59375 6.66504 6.59375C6.79004 6.59375 6.91504 6.625 6.97754 6.6875L7.29004 6.96875C7.32129 7 7.38379 7 7.44629 7H7.63379C7.82129 7 7.91504 6.8125 7.85254 6.65625L7.35254 5.6875C7.35254 5.65625 7.32129 5.59375 7.32129 5.5625C7.32129 5.5 7.35254 5.4375 7.41504 5.375L7.72754 5.09375C7.75879 5.03125 7.82129 5 7.88379 5H8.16504C8.22754 5 8.29004 5 8.35254 4.9375L8.60254 4.6875C8.69629 4.59375 8.69629 4.4375 8.60254 4.34375L8.44629 4.1875C8.35254 4.09375 8.35254 3.9375 8.44629 3.84375L8.79004 3.5L8.91504 3.375C9.10254 3.1875 9.10254 2.84375 8.91504 2.65625L8.04004 1.78125C7.79004 1.78125 7.50879 1.8125 7.29004 1.84375V2.21875C7.29004 2.59375 6.88379 2.8125 6.54004 2.65625L5.79004 2.28125C4.35254 2.90625 3.22754 4.03125 2.57129 5.46875C2.88379 5.9375 3.35254 6.625 3.66504 7.0625C3.82129 7.3125 4.00879 7.5 4.22754 7.71875H4.25879C4.54004 8 4.88379 8.21875 5.22754 8.40625C5.66504 8.625 6.32129 8.96875 6.75879 9.21875C7.07129 9.40625 7.29004 9.75 7.29004 10.0938V11.0938C7.29004 11.375 7.38379 11.625 7.57129 11.8125C8.04004 12.2812 8.32129 13 8.29004 13.4062V14.25C8.72754 14.25 9.16504 14.2188 9.60254 14.125L10.165 12.6562C10.2275 12.4688 10.2588 12.3125 10.29 12.125C10.3213 12 10.3838 11.875 10.4775 11.7812C10.6025 11.6875 10.7275 11.5625 10.8525 11.4375ZM13.5713 8.59375L14.4775 8.8125C14.5088 8.5625 14.54 8.28125 14.54 8C14.54 7 14.29 6.0625 13.8525 5.21875L13.4463 5.4375C13.3213 5.5 13.2275 5.5625 13.165 5.6875L12.54 6.59375C12.4775 6.71875 12.415 6.875 12.415 7.03125C12.415 7.15625 12.4775 7.3125 12.54 7.4375L13.1025 8.28125C13.2275 8.4375 13.3838 8.53125 13.5713 8.59375Z" fill="#444444"/>
          </svg>
          <p id="langageName" className="text-primary text-base">{language}</p>
          </div>
        </div>
        <div id="cursor"></div>
        <div
          id="text"
          className="text-primary text-lg flex flex-col gap-2"
          style={{ whiteSpace: "pre" }}
        >
          {text.Render()}
        </div>
        <div className="flex flex-row gap-6 mx-auto justify-center items-center mt-6" style={{ transform: "scale(1.25)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={changeText}>
            <path d="M12.4062 8.53125L6.34375 14.625C6.03125 14.9062 5.5625 14.9062 5.28125 14.625L4.5625 13.9062C4.28125 13.625 4.28125 13.1562 4.5625 12.8438L9.375 8L4.5625 3.1875C4.28125 2.875 4.28125 2.40625 4.5625 2.125L5.28125 1.40625C5.5625 1.125 6.03125 1.125 6.34375 1.40625L12.4062 7.5C12.6875 7.78125 12.6875 8.25 12.4062 8.53125Z" fill="#444444"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={restartText}>
            <path d="M12.0625 4.1875C11.0938 3.28125 9.8125 2.75 8.46875 2.75C6.0625 2.78125 3.96875 4.4375 3.40625 6.71875C3.34375 6.90625 3.1875 7 3.03125 7H1.25C1 7 0.8125 6.8125 0.875 6.5625C1.53125 2.96875 4.6875 0.25 8.5 0.25C10.5625 0.25 12.4375 1.09375 13.8438 2.40625L14.9688 1.28125C15.4375 0.8125 16.25 1.15625 16.25 1.8125V6C16.25 6.4375 15.9062 6.75 15.5 6.75H11.2812C10.625 6.75 10.2812 5.96875 10.75 5.5L12.0625 4.1875ZM1.5 9.25H5.6875C6.34375 9.25 6.6875 10.0625 6.21875 10.5312L4.90625 11.8438C5.875 12.75 7.15625 13.2812 8.5 13.2812C10.9062 13.25 13 11.5938 13.5625 9.3125C13.625 9.125 13.7812 9.03125 13.9375 9.03125H15.7188C15.9688 9.03125 16.1562 9.21875 16.0938 9.46875C15.4375 13.0625 12.2812 15.75 8.5 15.75C6.40625 15.75 4.53125 14.9375 3.125 13.625L2 14.75C1.53125 15.2188 0.75 14.875 0.75 14.2188V10C0.75 9.59375 1.0625 9.25 1.5 9.25Z" fill="#444444"/>
          </svg>
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <LanguageModal
          language={language}
          setLanguage={setLanguage}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}