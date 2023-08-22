import { ReactNode } from "react";

export default class Text {
  private text: string[];
  private lineIndex: number;
  private wordIndex: number;
  private letterIndex: number;

  constructor(text: string) {
    this.text = text.split("\n");
    this.lineIndex = 0;
    this.wordIndex = 0;
    this.letterIndex = 0;
  }

  public keyDownHandler(key: string): void {
    console.log(key, this.lineIndex, this.wordIndex, this.letterIndex);
  
    if (key === "Shift") return;
    else if (key === "Enter") {
      if (this.wordIndex < this.text[this.lineIndex].split(" ").length - 1) return;
      this.lineIndex = Math.min(this.lineIndex + 1, this.text.length - 1);
      this.wordIndex = 0;
      this.letterIndex = 0;
    } else if (key === " ") {
      this.wordIndex = Math.min(this.wordIndex + 1, this.text[this.lineIndex].split(" ").length - 1);
      this.letterIndex = 0;
    } else {
      const currentLetter = this.getCurrentLetter();
      if (currentLetter === key) {
        this.addCorrectClass();
      } else {
        this.addIncorrectClass();
      }
      
      if (this.letterIndex === this.text[this.lineIndex].split(" ")[this.wordIndex].length - 1) {
        this.addLetterToWord(); // Add the letter to the word
      }
      
      this.letterIndex = Math.min(this.letterIndex + 1, this.text[this.lineIndex].split(" ")[this.wordIndex].length - 1);
    }
  }

  private getCurrentLetter(): string {
    return this.text[this.lineIndex].split(" ")[this.wordIndex][this.letterIndex];
  }
  
  private addCorrectClass(): void {
    console.log("correct");
    const activeLetter = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1}) .letter:nth-child(${this.letterIndex + 1})`);
    console.log(activeLetter);
    if (activeLetter) {
      activeLetter.classList.add("correct"); // Replace "correct-letter" with your actual CSS class for correct letters
    }
  }
  
  private addIncorrectClass(): void {
    console.log("incorrect");
    const activeLetter = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1}) .letter:nth-child(${this.letterIndex + 1})`);
    console.log(activeLetter);
    
    if (activeLetter) {
      activeLetter.classList.add("incorrect"); // Replace "incorrect-letter" with your actual CSS class for incorrect letters
    }
  }
  
  private addLetterToWord(): void {
    // TODO: Add the letter to the current word (e.g., apply a CSS class)
  }

  Render(): ReactNode {
    const re = new RegExp("\t", "g");

    return this.text.map((line, index) => {
      return (
        <line key={index}>
          {line.split(" ").map((word, index) => {
            const wordPadding = word.match(re)?.length ?? 0;
            return (
              <div
                className="word"
                key={index}
                style={{ paddingLeft: `${wordPadding * 2}em` }}
              >
                {word.split("").map((letter, index) => {
                  if (letter === "\t") return;
                  return (
                    <div className="letter" key={index}>
                      {letter ?? ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </line>
      );
    });
  }
}
