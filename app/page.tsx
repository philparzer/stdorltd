import Quiz from "@/components/quiz";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex py-[10dvh] px-2 items-center justify-center min-h-[100dvh] flex-col text-center">
      <h1 className="text-4xl font-bold flex items-center gap-3">
        <span className="inline-block relative w-10 h-10">
          <Image
            priority
            src="/1f1ea-1f1fa.png"
            fill
            alt="european flag emoji"
          ></Image>
        </span>{" "}
        LTD or 🦠 STD
      </h1>
      <div className="my-6 flex flex-col gap-2 text-center max-w-md">
        <p className="">
          Is the following abbreviation{" "}
          <span className="font-medium">
            a limited liability company in Europe
          </span>{" "}
          or a <span className="font-medium">medical condition</span>?
        </p>
        <p className="text-sm text-black/50">
          to make this a little harder we added punctuation to some our medical
          terms e.g. HIV might look like h.i.v.
        </p>
      </div>
      <Quiz />
    </main>
  );
}
