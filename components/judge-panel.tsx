"use client"

import { motion } from "framer-motion"
import { User, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Judge {
  name: string
  title: string
  description: string
  imageSrc: string
  socialLinks?: {
    type: string
    url: string
  }[]
}

export default function JudgePanel() {
  const judges: Judge[] = [
    {
      name: "Rishi Paul",
      title: "SBH Finalist",
      description:
        "Experienced tech professional with expertise in evaluating innovative solutions and technical implementations. As an SBH finalist, brings valuable insights to judge participants' work.",
      imageSrc: "/Rishi.jpg?height=400&width=400",
      socialLinks: [
        {
          type: "linkedin",
          url: "#",
        },
        {
          type: "github",
          url: "#",
        },
      ],
    },
    // You can add more judges here later
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-3 py-1 text-sm bg-blue-700 hover:bg-blue-600">Expert Evaluation</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Judge</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our distinguished judge will evaluate your work and provide valuable feedback
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {judges.map((judge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 lg:col-span-3"
            >
              <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    <motion.div
                      className="relative w-full lg:w-1/3 h-80 lg:h-auto overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20" />
                      <img
                        src={judge.imageSrc || "/placeholder.svg"}
                        alt={judge.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3" />
                    </motion.div>

                    <div className="w-full lg:w-2/3 p-6 lg:p-8">
                      <div className="flex flex-col h-full">
                        <div>
                          <div className="flex items-center mb-2">
                            <Award className="w-5 h-5 mr-2 text-blue-400" />
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700/50">
                              {judge.title}
                            </Badge>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                            {judge.name}
                          </h3>
                          <motion.div
                            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>

                        <p className="text-gray-300 mb-6 flex-grow">{judge.description}</p>

                        <div className="flex items-center space-x-4">
                          {judge.socialLinks?.map((link, linkIndex) => (
                            <motion.a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                              whileHover={{ scale: 1.2, color: "#3b82f6" }}
                            >
                              <ExternalLink className="h-5 w-5" />
                            </motion.a>
                          ))}
                          <div className="flex-grow"></div>
                          <Button variant="outline" className="border-blue-700 text-blue-400 hover:bg-blue-900/30">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

+