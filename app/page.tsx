import Quiz from "@/components/quiz";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen flex-col text-center">
      <h1 className="text-4xl font-bold flex items-center gap-3"><span className="inline-block relative w-10 h-10"><Image priority src="/1f1ea-1f1fa.png" fill alt="european flag emoji"></Image></span> LTD or 🦠 STD</h1>
      <p className="max-w-md my-6">Is the following abbreviation <span className="font-medium">a limited liability company in Europe</span> or a <span className="font-medium">medical condition</span>?</p>
    <Quiz />
    </main>
  );
}
