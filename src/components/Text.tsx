import { ReactNode } from "react";

type Line = {
  words: Word[];
  tabulation: number;
};
type Word = {
  letters: string[];
};

export default class Text {
  private text: Line[] = [];

  constructor(text: string) {
    this.text = text.split("\n").map((line) => {
      const lineWithoutTab = line.replace(/\t/g, "");
      return {
        words: lineWithoutTab.split(" ").map((word) => ({
          letters: word.trim().split(""),
        })),
        tabulation: line.length - lineWithoutTab.length,
      } as Line;
    });
  }

  Render(): ReactNode {
    return this.text.map((line, lineIndex) => {
      return (
        <line
          key={lineIndex}
          style={{ paddingLeft: line.tabulation * 2 + "em" }}
        >
          {line.words.map((word, wordIndex) => {
            return (
              <div key={wordIndex} className="word">
                {word.letters.map((letter, letterIndex) => {
                  return (
                    <span key={letterIndex} className="letter">
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          })}
          {lineIndex !== this.text.length - 1 && <br />}
        </line>
      );
    });
  }
}
