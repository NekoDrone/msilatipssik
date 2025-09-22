import { motion } from "motion/react";
import type { FC, ReactNode } from "react";

interface AnimatedLinkProps {
    href: string;
    children: ReactNode;
    className: string;
}

export const AnimatedUnderlineLink: FC<AnimatedLinkProps> = ({
    href,
    children,
    className,
}) => {
    return (
        <motion.a
            href={href}
            className={`relative inline-block ${className}`}
            initial="initial"
            whileHover="hover"
        >
            {children}
            <motion.span
                className="bg-ctp-blue absolute bottom-1 left-0 h-0.25 w-full origin-center"
                variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 },
                }}
                transition={{
                    type: "spring",
                    duration: 0.25,
                    bounce: 0.3,
                }}
            />
        </motion.a>
    );
};
