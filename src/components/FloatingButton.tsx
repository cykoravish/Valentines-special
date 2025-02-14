import type React from "react";
import { motion } from "framer-motion";

interface FloatingButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?:string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  text,
  onClick,
  disabled,
}: any) => {
  return (
    <motion.button
      className="relative group px-6 py-3 md:px-8 md:py-4 bg-transparent rounded-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Enhanced glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-60 animate-pulse" />

      <div className="relative bg-black rounded-full px-6 py-3 md:px-8 md:py-4 border border-pink-500/20">
        <motion.span
          className="relative bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 text-lg md:text-xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          {text}
        </motion.span>
      </div>
    </motion.button>
  );
};

export default FloatingButton;
