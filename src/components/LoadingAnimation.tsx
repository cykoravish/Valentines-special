import { motion } from "framer-motion"

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-16 h-16 border-t-4 border-pink-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-lg text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Initializing a special journey...
      </motion.p>
    </div>
  )
}

export default LoadingAnimation

