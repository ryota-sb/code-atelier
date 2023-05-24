import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="bg-cream-four drop-shadow-md">
        <h1 className="px-14 py-4 font-raleway text-2xl text-gray-three lg:text-3xl">
          <Link href="/">Code Atelier .</Link>
        </h1>
      </div>
    </header>
  );
}
