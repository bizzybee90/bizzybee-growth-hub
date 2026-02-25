import { motion } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const AnimatedSection = ({ children, className = "", id }: SectionProps) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className={className}
  >
    {children}
  </motion.section>
);

export const AnimatedElement = ({
  children,
  className = "",
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
}) => {
  const variants = { fadeUp, fadeIn, scaleIn };
  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
};
