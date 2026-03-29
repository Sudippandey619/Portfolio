import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React and Next.js",
    excerpt: "Learn the basics of building powerful web apps using React and Next.js framework.",
    date: "April 15, 2025",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/react-nextjs-getting-started",
    color: "bg-lavender-light",
  },
  {
    id: 2,
    title: "Tips to Improve Your CSS Skills",
    excerpt: "Sharpen your design skills with these practical CSS tips and modern techniques.",
    date: "April 10, 2025",
    readTime: "4 min read",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/css-improvement-tips",
    color: "bg-mint",
  },
  {
    id: 3,
    title: "How to Freelance as a Developer",
    excerpt: "A quick guide to finding freelance work and building your personal brand.",
    date: "April 5, 2025",
    readTime: "6 min read",
    category: "Career",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/freelance-developer-guide",
    color: "bg-peach",
  },
];

export const Blog = () => {
  const ref = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (cardsRef.current && isInView) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [isInView]);

  return (
    <section id="blog" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-mint/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            My Blog
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my development journey
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-hover transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 ${post.color} opacity-30 z-10`} />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
