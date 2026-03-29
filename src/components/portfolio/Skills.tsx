import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./TextAnimations";
const skillCategories = [
  {
    title: "Frontend",
    color: "from-primary to-primary/60",
    bgColor: "bg-lavender-light",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3 / Tailwind", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    title: "Backend",
    color: "from-mint-foreground to-mint-foreground/60",
    bgColor: "bg-mint",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 90 },
      { name: "Python", level: 88 },
      { name: "Django", level: 73 },
    ],
  },
  {
    title: "Database",
    color: "from-peach-foreground to-peach-foreground/60",
    bgColor: "bg-peach",
    skills: [
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 65 },
      { name: "MySQL", level: 60 },
    ],
  },
  {
    title: "Tools & Others",
    color: "from-sky-foreground to-sky-foreground/60",
    bgColor: "bg-sky",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "Docker", level: 60 },
      { name: "C / C++", level: 82 },
      { name: "Figma", level: 70 },
    ],
  },
];

const SkillBar = ({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header with scroll-triggered animation */}
        <SectionHeading
          badge="My Skills"
          title="Technologies I Work With"
          description="A comprehensive overview of my technical skills and proficiency levels"
          className="mb-16"
        />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border hover:shadow-hover transition-shadow duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={categoryIndex * 0.1 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">Also experienced with:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Vercel", "Netlify", "Prisma", "JWT", "REST APIs", "Responsive Design", "Agile"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
