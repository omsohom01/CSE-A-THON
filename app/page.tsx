"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Calendar, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import BinaryBackground from "@/components/binary-background"
import FloatingTitle from "@/components/floating-title"
import IntroAnimation from "@/components/intro-animation"
import JudgePanel from "@/components/judge-panel"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const events = [
    
    {
      title: "Hackathon",
      description: "Build, innovate, and showcase your next big idea! AI tools are allowed for this event.",
      icon: "🚀",
      color: "bg-gradient-to-r from-cyan-600 to-blue-500",
      aiAllowed: true,
    }
  ]

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedBackground />
      <BinaryBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.3) 0%, rgba(0, 0, 0, 1) 70%)",
          }}
        />

        <div className="absolute inset-0 z-0">
          {/* 3D Cube Animation */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
            <motion.div
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                width: "200px",
                height: "200px",
                position: "relative",
                transformStyle: "preserve-3d",
              }}
            >
              {[...Array(6)].map((_, index) => {
                const positions = [
                  { transform: "rotateY(0deg) translateZ(100px)" },
                  { transform: "rotateY(180deg) translateZ(100px)" },
                  { transform: "rotateY(90deg) translateZ(100px)" },
                  { transform: "rotateY(-90deg) translateZ(100px)" },
                  { transform: "rotateX(90deg) translateZ(100px)" },
                  { transform: "rotateX(-90deg) translateZ(100px)" },
                ]

                return (
                  <div
                    key={index}
                    className="absolute w-full h-full border-2 border-blue-500/30"
                    style={{
                      ...positions[index],
                      background: "rgba(30, 64, 175, 0.1)",
                    }}
                  />
                )
              })}
            </motion.div>
          </div>
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-700 hover:bg-blue-600">March 29 - April 1</Badge>
            <FloatingTitle
              text="CSE-A-THON"
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
              Get ready for an electrifying tech fest this holiday! Sharpen your skills, spark creativity, and have an
              absolute blast!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 rounded-full px-8"
              onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Events
            </Button>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-0 right-0 mx-auto w-8 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section id="events" className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Add a subtle tech pattern background */}
        <div className="absolute inset-0 opacity-5 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233b82f6' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Thrilling Events</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Participate in our exciting lineup of tech challenges and competitions!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 overflow-hidden h-full relative group">
                  <div className={`h-2 ${event.color}`}></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute inset-0 ${event.color} opacity-10 blur-xl`}></div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="text-4xl mb-2"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1,
                        }}
                      >
                        {event.icon}
                      </motion.div>
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        Tech Event
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <CardDescription className="text-gray-400">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>March 29 - April 1</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Online</span>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <span>{event.aiAllowed ? "AI tools allowed" : "No AI tools allowed"}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${event.color} hover:opacity-90 text-white relative overflow-hidden group`}
                      onClick={() => window.open("https://your-gform-link-here.com", "_blank")}
                    >
                      <span className="relative z-10">Register for {event.title}</span>
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Judge Panel Section */}
      <JudgePanel />

      {/* Important Notice */}
      <section className="py-16 bg-gray-900 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwUzAgNDYuNTY5IDAgMzAgMTMuNDMxIDAgMzAgMHMzMCAxMy40MzEgMzAgMzB6IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bXVsdGlwbHkiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-2xl p-8 border border-blue-800 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                className="text-5xl mb-4 md:mb-0 md:mr-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              >
                ⚠️
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-2">IMPORTANT NOTICE</h3>
                <p className="text-gray-300">
                  To keep it fair and enjoyable for everyone, we request NO use of AI tools for most events (except
                  Hackathon)! This is all about your own skills, creativity, and learning – so let's make it a real
                  challenge!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

