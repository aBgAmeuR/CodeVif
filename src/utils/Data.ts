import languagesJson from "@/static/languages/Index.json";
import { Languages } from "@/types";

export default class Data {
  private language: string;
  private text: string;
  private languages: Languages[];

  constructor(language: string) {
    this.language = language;
    this.text = "";
    this.languages = languagesJson;
    this.newText();
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public newText(): void {    
    const languagesAfterFilter: Languages[] = this.languages.filter((language: Languages) => language.language === this.language);
    
    const randomIndex: number = Math.floor(Math.random() * languagesAfterFilter.length);
    const newTextObject: Languages | undefined = languagesAfterFilter.find((language: Languages, index: number) => index === randomIndex);
    this.languages = this.languages.filter((language: Languages) => language.id !== newTextObject?.id);

    if (!newTextObject) {
      this.text = "No new text available.";
    } else {
      this.text = newTextObject.text;
    }
  }

  public getText(): string {
    return this.text;
  }

}
