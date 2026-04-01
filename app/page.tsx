import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Image
          className="dark:invert"
          src="/logo-en.svg"
          alt="Feyzo Logistics"
          width={150}
          height={25}
          priority
        />
        <h1 className="font-extrabold">Hello world</h1>
      </main>
    </div>
  );
}
