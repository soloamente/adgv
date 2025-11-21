import Frame from "@/components/frame";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-full p-8 space-y-8 flex gap-60 container mx-auto mt-110 flex-col items-center justify-center">
      <h1 className="text-xl font-medium text-balance">
        Designer, Developer & hobbyst photographer based in Italy.
      </h1>

      <div className="relative w-full rounded-xl aspect-video bg-[url('https://cursor.com/marketing-static/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F2hv88549%2Fproduction%2F1ffde036387b7242c29496bd7b1009f2218bce43-3266x2324.jpg%3Fauto%3Dformat&w=1920&q=70')] bg-cover bg-center overflow-hidden h-1200 group">
        <Image
          src="https://f5uskgwhyu2fi170.public.blob.vercel-storage.com/aniai-main.png"
          alt="Aniai main"
          className="absolute object-cover rounded-lg"
          style={{
            left: "13.5%",
            top: "12.5%",
            width: "88%",
            height: "88%",
            objectPosition: "left top",
          }}
          width={5000}
          height={5000}
        />
      </div>
    </main>
  );
}
