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
    if (this.textEnd()) return;
    if (key === "Enter") {
      if (this.wordIndex < this.text[this.lineIndex].split(" ").length - 1) return;
      this.lineIndex = Math.min(this.lineIndex + 1, this.text.length - 1);
      this.wordIndex = 0;
      this.letterIndex = 0;
    } else if (key === "Backspace") {
      
      if (this.letterIndex > 0) {
        this.letterIndex = Math.max(this.letterIndex - 1, 0);
      } else if (this.wordIndex > 0) {
        this.wordIndex = Math.max(this.wordIndex - 1, 0);
        this.letterIndex = this.text[this.lineIndex].split(" ")[this.wordIndex].length - 1;
      } else if (this.lineIndex > 0) {
        this.lineIndex = Math.max(this.lineIndex - 1, 0);
        this.wordIndex = this.text[this.lineIndex].split(" ").length - 1;
        this.letterIndex = this.text[this.lineIndex].split(" ")[this.wordIndex].length - 1;
      }
      const activeLetter = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1}) .letter:nth-child(${this.letterIndex + 1})`);
      const activeWord = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1})`);
    
      if (activeLetter) {
        activeLetter.classList.remove("correct");
        activeLetter.classList.remove("incorrect");
      }
      if (activeWord) {
        activeWord.classList.remove("error");
      }
    } else if (key === " ") {
      this.checkAndAddErrorClass();
      this.wordIndex = Math.min(this.wordIndex + 1, this.text[this.lineIndex].split(" ").length - 1);
      this.letterIndex = 0;
    } else {
      const currentLetter = this.getCurrentLetter();
      if (currentLetter === key) {
        this.addCorrectClass();
      } else {
        this.addIncorrectClass();
      }
      
      // if (this.letterIndex === this.text[this.lineIndex].split(" ")[this.wordIndex].length - 1) {
      //   this.addLetterToWord(key);
      // }
      
      this.letterIndex = Math.min(this.letterIndex + 1, this.text[this.lineIndex].split(" ")[this.wordIndex].length);
    }
    this.updateCursor();  
  }

  private getCurrentLetter(): string {
    return this.text[this.lineIndex].split(" ")[this.wordIndex].trim()[this.letterIndex];
  }
  
  private addCorrectClass(): void {
    const activeLetter = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1}) .letter:nth-child(${this.letterIndex + 1})`);
    if (activeLetter) {
      activeLetter.classList.add("correct");
    }
  }
  
  private addIncorrectClass(): void {
    const activeLetter = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1}) .letter:nth-child(${this.letterIndex + 1})`);
    if (activeLetter) {
      activeLetter.classList.add("incorrect");
    }
  }

  private checkAndAddErrorClass(): void {
    const activeWord = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1})`);
    if (activeWord) {
      const incorrectLetters = activeWord.querySelectorAll(".incorrect");
      const correctLetters = activeWord.querySelectorAll(".correct");
      if (incorrectLetters.length > 0 || (correctLetters.length === 0 && incorrectLetters.length === 0)) {
        activeWord.classList.add("error");
      }
    }
  }
  
  // private addLetterToWord(key: string): void {
  //   const activeWord = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1})`);    
  //   if (activeWord) {
  //     activeWord.innerHTML += `<div class="letter incorrect extra">${key}</div>`;
  //   }
  // }

  private getTabCount(line: number): number {
    return (this.text[line].match(/\t/g) ?? []).length;
  }

  private updateCursor(): void {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      const lineTabulation = this.getTabCount(this.lineIndex) * 48 - 1;
      const translateX = lineTabulation + this.getDistanceFromLine() + this.letterIndex * 14.41;
      const translateY = this.lineIndex * 24 + this.lineIndex * 8;
      cursor.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }
  public textEnd(): boolean {
    return this.lineIndex === this.text.length - 1 && this.wordIndex === this.text[this.lineIndex].split(" ").length - 1 && this.letterIndex === this.text[this.lineIndex].split(" ")[this.wordIndex].length;
  }

  private getDistanceFromLine(): number {
    const line = document.querySelector(`line:nth-child(${this.lineIndex + 1})`);
    const word = document.querySelector(`line:nth-child(${this.lineIndex + 1}) .word:nth-child(${this.wordIndex + 1})`);
    if (line && word) {
      const lineRect = line.getBoundingClientRect();
      const wordRect = word.getBoundingClientRect();
      if (this.wordIndex === 0)
        return wordRect.left - lineRect.left;
      else
        return wordRect.left - lineRect.left - this.getTabCount(this.lineIndex) * 48;
    }
    return 0;
  }

  public setText(text: string): void {
    this.text = text.split("\n");
  }

  public restart(): void {
    this.lineIndex = 0;
    this.wordIndex = 0;
    this.letterIndex = 0;
    this.updateCursor();
    const correctLetters = document.querySelectorAll(".correct");
    correctLetters.forEach((letter) => {
      letter.classList.remove("correct");
    });
    const incorrectLetters = document.querySelectorAll(".incorrect");
    incorrectLetters.forEach((letter) => {
      letter.classList.remove("incorrect");
    });
    const incorrectWords = document.querySelectorAll(".error");
    incorrectWords.forEach((word) => {
      word.classList.remove("error");
    });
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
