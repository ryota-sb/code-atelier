import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="mb-10 bg-white p-6">
      <div className="grid grid-cols-2 gap-x-6">
        <div className="aspect-w-1 aspect-h-1 col-span-1">
          <Image
            src="/imgs/ryota.jpg"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
            alt="Ryota"
          />
        </div>
        <div className="col-span-1">
          <h1 className="font-raleway">Matsui Ryota</h1>
        </div>
      </div>
    </div>
  );
}
