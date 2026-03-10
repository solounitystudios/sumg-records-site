export default function NewsletterBlock() {
  return (
    <section className="bg-[#0f1012] text-white py-20 md:py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-600 mb-4">
            Mailing List
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">
            Stay close to new releases, visuals, and drops.
          </h2>
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
            Mailing list capture is wired as a placeholder. Connect your provider before launch.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3" action="#">
            <input
              type="email"
              placeholder="email@domain.com"
              className="flex-1 bg-transparent border border-neutral-700 px-4 py-3 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors duration-200"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-[0.2em] border border-neutral-700 px-6 py-3 hover:border-white transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
