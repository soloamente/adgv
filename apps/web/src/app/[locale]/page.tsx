import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Home() {
  const t = useTranslations("HomePage")

  return (
    <main className="container mx-auto mt-110 mb-54 flex h-screen w-full flex-col items-center justify-center gap-100 space-y-8 p-8 text-center lg:mt-150">
      <h1 className="m-0 text-3xl font-medium text-balance">{t("title")}</h1>

      <div className="group relative z-0 min-h-200 w-full overflow-hidden rounded-xl">
        <Image
          src="/1ffde036387b7242c29496bd7b1009f2218bce43-3266x2324.jpg"
          alt="Background"
          fill
          className="z-0 object-cover"
          priority
        />
        <Image
          src="https://f5uskgwhyu2fi170.public.blob.vercel-storage.com/aniai-main.png"
          alt="Foreground"
          priority
          className="absolute z-10 rounded-lg object-cover"
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
  )
}
