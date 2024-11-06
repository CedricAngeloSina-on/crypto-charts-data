import { ThemeTrigger } from "~/components/theme-switcher";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ThemeTrigger />
    </main>
  );
}