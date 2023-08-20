import Image from "next/image";

export default function Header() {
  return (
    <header className="text-tertiary flex flex-row gap-1.5 inline-flex items-center">
      <Image src="/logo.svg" alt="CodeVif" width={32} height={32} />
      <h1 className="text-xl font-Lexend">CodeVif</h1>
    </header>
  );
}
