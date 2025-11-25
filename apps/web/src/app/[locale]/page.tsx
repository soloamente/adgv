import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="h-screen w-full mb-54 p-8 text-center space-y-8 flex gap-100 container mx-auto mt-110 lg:mt-150 flex-col items-center justify-center">
      <h1 className="text-3xl m-0 font-medium text-balance">{t("title")}</h1>

      <div className="relative w-full rounded-xl  overflow-hidden min-h-200 group z-0">
        <Image
          src="/1ffde036387b7242c29496bd7b1009f2218bce43-3266x2324.jpg"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <Image
          src="https://f5uskgwhyu2fi170.public.blob.vercel-storage.com/aniai-main.png"
          alt="Foreground"
          priority
          className="absolute object-cover rounded-lg z-10"
          style={{
            left: "13.5%",
            top: "13.5%",
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
