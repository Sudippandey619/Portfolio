import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Wifi } from "lucide-react";
import { MagneticWrapper } from "./CustomCursor";
import { useState, useEffect, useRef } from "react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Sudippandey619", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sudip-pandey-99459b231/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:sudippandey619@gmail.com", label: "Email" },
];

// Network Speed Tester Component
const NetworkSpeedTester = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);
  const [ping, setPing] = useState<number | null>(null);
  const [connectionType, setConnectionType] = useState("unknown");

  useEffect(() => {
    const nav = navigator as any;
    if (nav.connection) {
      setConnectionType(nav.connection.effectiveType || "unknown");
      if (nav.connection.downlink) {
        setSpeed(nav.connection.downlink);
      }
    }
  }, []);

  const testSpeed = async () => {
    setTesting(true);
    const start = performance.now();
    try {
      await fetch("https://www.google.com/favicon.ico?_=" + Date.now(), { mode: "no-cors", cache: "no-store" });
      const end = performance.now();
      setPing(Math.round(end - start));
      const nav = navigator as any;
      if (nav.connection?.downlink) {
        setSpeed(nav.connection.downlink);
      }
    } catch {
      setPing(null);
    }
    setTesting(false);
  };

  return (
    <div className="bg-[#0d1117] rounded-xl p-4 border border-[#30363d] font-mono text-sm">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#30363d]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#8b949e] text-xs ml-1">network_test.sh</span>
      </div>

      <div className="space-y-1.5">
        <p className="text-[#8b949e]">
          <span className="text-[#58a6ff]">sudip@dev</span>:<span className="text-[#7ee787]">~</span>$ speedtest --simple
        </p>
        {testing ? (
          <motion.p
            className="text-[#febc2e]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ⏳ Testing connection...
          </motion.p>
        ) : (
          <>
            <p className="text-[#c9d1d9]">
              <Wifi className="inline h-3 w-3 mr-1 text-[#7ee787]" />
              Type: <span className="text-[#7ee787]">{connectionType}</span>
            </p>
            {speed !== null && (
              <p className="text-[#c9d1d9]">
                ↓ Download: <span className="text-[#58a6ff]">{speed} Mbps</span>
              </p>
            )}
            {ping !== null && (
              <p className="text-[#c9d1d9]">
                ⚡ Ping: <span className={ping < 100 ? "text-[#7ee787]" : "text-[#febc2e]"}>{ping}ms</span>
              </p>
            )}
          </>
        )}
        <button
          onClick={testSpeed}
          disabled={testing}
          className="mt-2 text-xs text-[#58a6ff] hover:text-[#79c0ff] transition-colors disabled:opacity-50"
        >
          $ ./run_test.sh
        </button>
      </div>
    </div>
  );
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Scroll to top button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#home" className="text-2xl font-bold">
              <span className="text-gradient">Sudip</span>
              <span className="text-foreground"> Pandey</span>
            </a>
            <p className="text-muted-foreground max-w-xs">
              Full-Stack Developer building modern web applications with passion and precision.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <MagneticWrapper key={social.label} strength={0.5}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:sudippandey619@gmail.com" className="hover:text-primary transition-colors">
                  sudippandey619@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+9779745348929" className="hover:text-primary transition-colors">
                  +977 9745348929
                </a>
              </li>
              <li>Nepal</li>
            </ul>
          </div>
        </div>

        {/* Terminal Celebration + Network Speed side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-8 border-t border-border grid md:grid-cols-2 gap-6"
        >
          {/* Celebration Terminal */}
          <div className="bg-[#0d1117] rounded-xl p-6 border border-[#30363d] font-mono">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363d]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[#8b949e] text-xs ml-1">celebration.sh</span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-[#8b949e]">
                <span className="text-[#58a6ff]">sudip@dev</span>:<span className="text-[#7ee787]">~</span>$ ./celebrate.sh
              </p>
              <motion.p
                className="text-[#7ee787] font-semibold"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                🎉 Congratulations! You've reached the end!
              </motion.p>
              <p className="text-[#c9d1d9] text-xs">
                Thanks for scrolling through my portfolio. Let's build something amazing together!
              </p>
              <motion.div 
                className="flex gap-2 pt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {["🎆", "✨", "🚀", "💫", "🎊"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-xl"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
              <p className="text-[#484f58] text-[10px] pt-2">
                // Process exited with code 0 (success)
              </p>
            </div>
          </div>

          {/* Network Speed Tester */}
          <NetworkSpeedTester />
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Sudip Pandey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
