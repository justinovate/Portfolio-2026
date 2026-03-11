import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/j-deleon/",
  },
  {
    title: "GitHub",
    href: "https://github.com/justinovate",
  },
  {
    title: "Resume",
    href: "/JustinDeLeon_Resume.pdf",
  },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 overflow-x-clip">
      {/* Gradient Background */}
      <div className="absolute h-[250px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/20 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>

      <div className="container mx-auto max-w-full px-4">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-8">
          {/* Left column */}
          <div className="text-white/40 flex-1 text-center md:text-left">
            &copy; 2025. All rights reserved.
          </div>

          {/* Right column */}
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8 flex-1">
            {footerLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
