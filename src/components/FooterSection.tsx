const FooterSection = () => {
  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/DouglasStrattonPhotography" },
    { label: "Instagram", href: "https://instagram.com/douglasstrattonphotography/" },
  ];

  return (
    <footer id="contact" className="border-t border-border bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-foreground">
              Douglas Stratton
            </p>
            <p className="mt-3 font-body text-sm font-light text-muted-foreground">
              Fine Art Travel Photography
            </p>
          </div>
          <div>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-primary">Quick Links</p>
            <div className="space-y-2">
              {["Gallery", "About", "Prints", "Videos"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
            <p className="font-body text-sm text-muted-foreground">
              For inquiries about prints, commissions, or collaborations.
            </p>
            <a
              href="mailto:douglasstratton@me.com"
              className="mt-2 inline-block font-body text-sm text-primary transition-colors hover:text-gold-light"
            >
              douglasstratton@me.com
            </a>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-center md:flex-row">
          <p className="font-body text-xs text-muted-foreground">© {new Date().getFullYear()} Douglas Stratton Photography.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://douglasstratton.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://douglasstratton.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
