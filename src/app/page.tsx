import Menu from "@/components/menu";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col">
      <div>
        <Menu />
      </div>
      <div className="flex-1">container home</div>
    </main>
  );
}