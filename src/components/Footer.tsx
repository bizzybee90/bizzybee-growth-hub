import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/features" },
    { label: "Changelog", href: "/about" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about" },
    { label: "Blog", href: "/about" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
    { label: "Cookie Policy", href: "/contact" },
  ],
};

const Footer = () => (
  <footer className="relative noise-overlay" style={{ backgroundColor: "hsl(20, 44%, 16%)" }}>
    <div className="container mx-auto px-6 py-16 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🐝</span>
            <span className="text-xl font-bold tracking-tight text-white">
              Bizzy<span style={{ color: "hsl(40, 78%, 67%)" }}>Bee</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>
            AI-powered customer service hub built for UK service businesses.
          </p>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-mono-label mb-4" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>{heading}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-primary-light"
                    style={{ color: "hsla(40, 20%, 92%, 0.6)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid hsla(40, 20%, 92%, 0.1)" }}>
        <p className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>
          © {new Date().getFullYear()} BizzyBee Ltd. Registered in England & Wales.
        </p>
        <p className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>
          Made with 🍯 in the UK
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
