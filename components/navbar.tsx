"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingTitle from "@/components/floating-title"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Events", href: "#events" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <a href="#" className="flex items-center">
                <FloatingTitle
                  text="CSE-THON"
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
                />
              </a>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4">
                <FloatingTitle
                  text="CSE-THON"
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
                />
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-white">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 space-y-8 p-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-2xl text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
