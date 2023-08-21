"use client";
import React, { useState, useEffect, ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Text from "@/components/Text";
const Data = "exports.DeleteUser = async (req, res, next) => {\n\ttry {\n\t\tconst username = req.user.username;\n\t\tif (!username) {\n\t\t\treturn next({ status: 400, message: 'Missing input'});\n\t\t}\n\t\ttry {\n\t\t\tconst user = await User.DeleteUser(username);\n\t\t\tres.status(200).send({ error: false, message: 'User deleted' });\n\t\t} catch (error) {\n\t\t\treturn next({ status: 404, message: 'User not found' });\n\t\t}\n\t} catch (error) {\n\t\tnext({ status: 500, message: 'Internal Server Error' });\n\t}\n}";

export default function Home() {
  // useEffect(() => {
  //   document.addEventListener("keydown", detectKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", detectKeyDown);
  //   };
  // }, [activeWordIndex]);

  // const detectKeyDown = (e: KeyboardEvent) => {
  //   if (e.key === " ") {
  //     setActiveWordIndex((prev) => prev + 1);
  //     setActiveCharIndex(0);
  //   }
  // };

  // const DataToHTML = (data: string) => {
  //   const res = data.split("\n").map((word: string, wordIndex: number) => {
  //     if (wordIndex === activeLineIndex) {
  //       return (
  //         <line key={wordIndex}>
  //           {word.split(" ").map((char, charIndex) => {
  //             if (charIndex === activeCharIndex) {
  //               return (
  //                 <div className="word active" key={charIndex}>
  //                   {char}
  //                 </div>
  //               );
  //             } else {
  //               return <div className="word" key={charIndex}>{char}</div>;
  //             }
  //           })}
  //         </line>
  //       );
  //     } else if (wordIndex < activeWordIndex) {
  //       setActiveLineIndex((prev) => prev + 1);
  //       setActiveWordIndex(0);
  //       setActiveCharIndex(0);
  //     } else {
  //       return <line key={wordIndex}>{word.split(" ").map((char, chatIndex) => {
  //         return <div className="word" key={chatIndex}>{char}</div>;
  //       })}</line>;
  //     }
  //   });

  //   return res;
  // };

  const text = new Text(Data);
  console.log(text);
  
  return (
    <>
      <Header />
      <main>
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
