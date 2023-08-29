import languages from "@/static/languages/Index.json";
import { Languages } from "@/types";

export default class Data {
  private language: string;
  private textDone: number[];
  private text: string;

  constructor() {
    this.language = "JavaScript";
    this.textDone = [];
    this.text = "";
    this.newText();
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public newText(): void {
    const languagesAfterFilter: Languages[] = languages.filter((language: Languages) => language.language === this.language);
    if (this.text === "") {
      const currentMinute = new Date().getMinutes();
      let id = Math.round((languagesAfterFilter.length * currentMinute) / 60);
      if (id === 0) id++;
      const newTextObject = languagesAfterFilter.find((language: Languages) => language.id === id);
      if (newTextObject) {
        this.textDone.push(newTextObject.id);
        this.text = newTextObject.text;
      }
      return;
    }
    
    let foundNewText = false;
    let newTextObject: Languages | undefined;

    while (!foundNewText && languagesAfterFilter.length > 0) {
      const randomIndex = Math.floor(Math.random() * languagesAfterFilter.length);
      newTextObject = languagesAfterFilter.splice(randomIndex, 1)[0];

      if (newTextObject && !this.textDone.includes(newTextObject.id)) {
        this.textDone.push(newTextObject.id);
        this.text = newTextObject.text;
        foundNewText = true;
      }
    }

    if (!foundNewText) {
      this.text = "No new text available.";
    }
  }

  public getText(): string {
    return this.text;
  }

}
