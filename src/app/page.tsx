"use client";
import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Text from "@/components/Text";

const Data = "exports.DeleteUser = async (req, res, next) => {\n\ttry {\n\t\tconst username = req.user.username;\n\t\tif (!username) {\n\t\t\treturn next({ status: 400, message: 'Missing input'});\n\t\t}\n\t\ttry {\n\t\t\tconst user = await User.DeleteUser(username);\n\t\t\tres.status(200).send({ error: false, message: 'User deleted' });\n\t\t} catch (error) {\n\t\t\treturn next({ status: 404, message: 'User not found' });\n\t\t}\n\t} catch (error) {\n\t\tnext({ status: 500, message: 'Internal Server Error' });\n\t}\n}";

export default function Home() {
  const text = new Text(Data);
  
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      text.keyDownHandler(e.key);
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        text.keyDownHandler(e.key);
      });
    };
  }, []);
  
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
