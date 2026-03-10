import HeroLogo from "@/components/HeroLogo";
import WebGLHero from "@/components/WebGLHero";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden min-h-[86svh] bg-[#08090b] text-white">
      <WebGLHero />
      <div className="absolute inset-0 bg-gradient-to-b from-black/36 via-black/22 to-black/78" />
      <HeroLogo />
    </section>
  );
}
