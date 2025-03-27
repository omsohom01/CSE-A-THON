"use client"

import { Github, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3
              className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
              animate={{
                y: [0, -5, 0],
                filter: [
                  "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))",
                  "drop-shadow(0 0 12px rgba(59, 130, 246, 0.5))",
                  "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              CSE-THON
            </motion.h3>
            <p className="text-gray-400 mb-4">
              An electrifying tech fest to sharpen skills, spark creativity, and have an absolute blast!
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-400 hover:text-white transition-colors">
                  Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Event Details</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📅 March 29 - April 1</li>
              <li>📍 Online</li>
              <li>💥 No registration fee</li>
              <li>🚫 No AI tools allowed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} CSE-A-THON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
