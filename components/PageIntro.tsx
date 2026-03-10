interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="bg-[#0f1012] text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-600 mb-6">
          {eyebrow}
        </p>
        <h1 className="font-display italic font-normal text-white text-[2.5rem] md:text-[4.5rem] leading-[0.92] tracking-[-0.01em]">
          {title}
        </h1>
        <div className="mt-7 w-10 border-t border-neutral-700" />
        <p className="mt-6 text-sm text-neutral-400 max-w-lg leading-relaxed font-light">
          {description}
        </p>
      </div>
    </section>
  );
}
