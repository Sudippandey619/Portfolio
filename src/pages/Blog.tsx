import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "@/components/portfolio";

gsap.registerPlugin(ScrollTrigger);

const allBlogPosts = [
  {
    id: 1,
    title: "Getting Started with React and Next.js",
    excerpt: "Learn the basics of building powerful web apps using React and Next.js framework. This comprehensive guide covers everything from setup to deployment.",
    content: "Full blog content here...",
    date: "April 15, 2025",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["React", "Next.js", "JavaScript"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/react-nextjs-getting-started",
  },
  {
    id: 2,
    title: "Tips to Improve Your CSS Skills",
    excerpt: "Sharpen your design skills with these practical CSS tips and modern techniques that will take your styling to the next level.",
    content: "Full blog content here...",
    date: "April 10, 2025",
    readTime: "4 min read",
    category: "CSS",
    tags: ["CSS", "Design", "Frontend"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/css-improvement-tips",
  },
  {
    id: 3,
    title: "How to Freelance as a Developer",
    excerpt: "A quick guide to finding freelance work and building your personal brand as a software developer.",
    content: "Full blog content here...",
    date: "April 5, 2025",
    readTime: "6 min read",
    category: "Career",
    tags: ["Freelance", "Career", "Tips"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/freelance-developer-guide",
  },
  {
    id: 4,
    title: "Understanding TypeScript Generics",
    excerpt: "Deep dive into TypeScript generics and learn how to write more flexible and reusable code.",
    content: "Full blog content here...",
    date: "March 28, 2025",
    readTime: "8 min read",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Programming"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/typescript-generics",
  },
  {
    id: 5,
    title: "Building REST APIs with Node.js",
    excerpt: "Complete guide to building scalable and secure REST APIs using Node.js and Express.",
    content: "Full blog content here...",
    date: "March 20, 2025",
    readTime: "10 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "API"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/nodejs-rest-api",
  },
  {
    id: 6,
    title: "Mastering Git and GitHub",
    excerpt: "Essential Git commands and GitHub workflows every developer should know for effective collaboration.",
    content: "Full blog content here...",
    date: "March 15, 2025",
    readTime: "7 min read",
    category: "Tools",
    tags: ["Git", "GitHub", "Version Control"],
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
    url: "https://www.sudippandey.info.np/blog/mastering-git",
  },
];

const categories = ["All", "Tutorial", "CSS", "Career", "TypeScript", "Backend", "Tools"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [selectedCategory, searchQuery]);

  const filteredPosts = allBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={headerRef}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                My Blog
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Insights & Tutorials
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thoughts, tutorials, and insights from my development journey. Learn from my
                experiences and discoveries.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 rounded-2xl border-border bg-card"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                    >
                      Read article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
