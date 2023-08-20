import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  const Data = [
    "exports.DeleteUser = async (req, res, next) => {",
    "   try {",
    "      const  username = req.user.username;",
    "      if (!username) {",
    '          return next({ status: 400, message: "Missing input"});',
    "      }",
    "      try {",
    "          const user = await User.DeleteUser(username);",
    '          res.status(200).send({ error: false, message: "User deleted" });',
    "      } catch (error) {",
    '          return next({ status: 404, message: "User not found" });',
    "      }",
    "   } catch (error) {",
    '      next({ status: 500, message: "Internal Server Error" });',
    "   }",
    "}",
  ];
  
  return (
    <>
      <Header />
      <main>
        <div id="text" className="text-primary text-lg flex flex-col gap-3">{DatatoHTML(Data)}</div>
      </main>
      <Footer />
    </>
  );
}

function DatatoHTML(data: string[]) {
  const transformedHTML = data.map((line: string, lineIndex: number) => (
    <line key={lineIndex}>
      {line.split(' ').map((word: string, wordIndex: number) => (
        <div className="word" key={wordIndex}>
          {word.split('').map((char: string, charIndex: number) => (
            <div className="letter" key={charIndex}>{char}</div>
          ))}
        </div>
      ))}
    </line>
  ));

  return transformedHTML;
}
