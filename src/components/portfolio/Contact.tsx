import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { SlideUpText, AnimatedWords, GlowingUnderline } from "./TextAnimations";
import { supabase } from "@/integrations/supabase/client";
import { MagneticWrapper } from "./CustomCursor";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+977 9745348929",
    href: "tel:+9779745348929",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sudippandey619@gmail.com",
    href: "mailto:sudippandey619@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nepal",
    href: "#",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Sudippandey619",
    color: "hover:bg-foreground hover:text-background",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sudip-pandey-99459b231/",
    color: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:sudippandey619@gmail.com",
    color: "hover:bg-primary hover:text-primary-foreground",
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);
      
      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: validated,
      });

      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send message');
      }
      
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <SlideUpText className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <GlowingUnderline>
              <AnimatedWords text="Let's Build Something Together" delay={0.2} />
            </GlowingUnderline>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss an opportunity? I'd love to hear from you!
          </p>
        </SlideUpText>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium text-foreground">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <MagneticWrapper key={social.label} strength={0.5}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center transition-all ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  </MagneticWrapper>
                ))}
              </div>
            </div>

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-primary/10 via-mint/10 to-secondary/10 rounded-3xl p-6 border border-border/50"
            >
              <p className="text-foreground font-medium mb-2">
                🚀 Currently available for:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Full-time positions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-foreground" />
                  Internship opportunities
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-peach-foreground" />
                  Freelance projects
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#0d1117] rounded-2xl p-6 border border-[#30363d] shadow-card font-mono">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363d]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[#8b949e] text-xs ml-2">contact_form.sh</span>
              </div>

              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-xs text-[#8b949e] mb-2">
                    <span className="text-[#58a6ff]">sudip@dev</span>
                    <span className="text-[#8b949e]">:</span>
                    <span className="text-[#7ee787]">~</span>
                    <span className="text-[#8b949e]">$ echo $YOUR_NAME</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sudip Pandey"
                    className={`h-11 rounded-lg bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff] focus:ring-[#58a6ff]/20 ${errors.name ? "border-[#f85149]" : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-[#f85149] font-mono">// Error: {errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-xs text-[#8b949e] mb-2">
                    <span className="text-[#58a6ff]">sudip@dev</span>
                    <span className="text-[#8b949e]">:</span>
                    <span className="text-[#7ee787]">~</span>
                    <span className="text-[#8b949e]">$ echo $EMAIL</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`h-11 rounded-lg bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff] focus:ring-[#58a6ff]/20 ${errors.email ? "border-[#f85149]" : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#f85149] font-mono">// Error: {errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="flex items-center gap-2 text-xs text-[#8b949e] mb-2">
                    <span className="text-[#58a6ff]">sudip@dev</span>
                    <span className="text-[#8b949e]">:</span>
                    <span className="text-[#7ee787]">~</span>
                    <span className="text-[#8b949e]">$ cat {">"} message.txt</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`rounded-lg resize-none bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff] focus:ring-[#58a6ff]/20 ${errors.message ? "border-[#f85149]" : ""}`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#f85149] font-mono">// Error: {errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="xl"
                  className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-mono rounded-lg border-0"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span className="font-mono text-sm">✓ Message sent successfully</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span className="font-mono text-sm">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      <span className="font-mono text-sm">$ send_message</span>
                    </>
                  )}
                </Button>

                {/* Terminal hint */}
                <p className="text-[10px] text-[#484f58] font-mono text-center">
                  // All messages are encrypted and delivered securely
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
