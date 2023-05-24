import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="mb-10 bg-cream-four p-6">
      <div className="grid grid-cols-2 gap-x-6">
        <div className="aspect-w-1 aspect-h-1 col-span-1">
          <Image
            src="/imgs/ryota.jpg"
            fill
            style={{ objectFit: "contain" }}
            className="rounded-md"
            alt="Ryota"
          />
        </div>
        <div className="col-span-1">
          <h1 className="font-raleway text-gray-three">Matsui Ryota</h1>
        </div>
      </div>
    </div>
  );
}
