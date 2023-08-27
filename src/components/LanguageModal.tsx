import languages from "@/static/languages/index.json";

type Props = {
  language: string;
  setLanguage: (language: string) => void;
  onClose: () => void;
};

export default function LanguageModal({
  language,
  setLanguage,
  onClose,
}: Props) {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center inset-0 addBgFiltre" onClick={() => onClose()}>
    <div className="flex flex-col max-w-[400px] w-full h-fit rounded-lg overflow-hidden bg-background z-10">
      {/* <button onClick={onClose}>Fermer</button> */}
      {languages.map((lang) => (
        <div
          key={lang}
          className={`flex flex-row items-center cursor-pointer text-primary py-2 px-6 hover:bg-tertiary hover:text-background`}
          onClick={() => {
            setLanguage(lang);
            onClose();
          }}
        >
          <div className="flex w-[20px]">
            {lang === language ? (
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-y-[1px]">
              <path d="M4.55469 9.8125L0.664062 5.92188C0.429688 5.6875 0.429688 5.28906 0.664062 5.05469L1.50781 4.21094C1.74219 3.97656 2.11719 3.97656 2.35156 4.21094L5 6.83594L10.625 1.21094C10.8594 0.976562 11.2344 0.976562 11.4688 1.21094L12.3125 2.05469C12.5469 2.28906 12.5469 2.6875 12.3125 2.92188L5.42188 9.8125C5.1875 10.0469 4.78906 10.0469 4.55469 9.8125Z" fill="#444444"/>
              </svg>
            ) : (<></>)}
          </div>
          <span className="text-sm">{lang}</span>
        </div>
      ))}
      </div>
      </div>
  );
}
