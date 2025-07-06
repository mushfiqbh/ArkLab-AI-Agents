import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function AgentHero({
  scrollToContent,
}: {
  scrollToContent: () => void;
}) {
  return (
    <div>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] opacity-10" />

      {/* Multiple Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 dark:from-blue-500/3 dark:via-purple-500/5 dark:to-pink-500/3" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-transparent animate-pulse" />

      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden">
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000" />

        {/* Additional decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float animation-delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-green-400/10 to-teal-500/10 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float animation-delay-3000" />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="text-center mb-16"
          >
            {/* Decorative Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 mb-6"
            >
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                ✨ Next-Gen AI Solutions
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ArkLab AI Agents Catalog
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Discover and explore our comprehensive collection of AI agents
              designed to streamline your business operations
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Button
                size="lg"
                onClick={scrollToContent}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Agents
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
