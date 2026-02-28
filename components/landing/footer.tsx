import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Examples", href: "#examples" },
    { label: "Themes", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-kikaru-border px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-block font-mono text-xl font-bold lowercase tracking-tight text-kikaru-text"
            >
              kikaru
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-kikaru-text-secondary">
              A smart creative platform for all creators. Build beautiful portfolio
              pages and link showcases that truly represent your art.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-kikaru-text-secondary">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-kikaru-text-secondary transition-colors hover:text-kikaru-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-kikaru-border pt-8">
          <p className="text-center text-xs text-kikaru-text-secondary">
            &copy; {new Date().getFullYear()} Kikaru. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
