"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
  autoPlay?: boolean
  interval?: number
}

export default function HeroSlider({ slides, autoPlay = true, interval = 6000 }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, slides.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const currentSlide = slides[currentIndex]

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentSlide.image || "/placeholder.svg"}
          alt={currentSlide.title}
          className="w-full h-full object-cover transition-transform duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl text-white">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">{currentSlide.title}</h1>
          <h2 className="text-2xl lg:text-4xl font-semibold mb-6 text-blue-100 animate-fade-in-delay-1">
            {currentSlide.subtitle}
          </h2>
          <p className="text-xl mb-12 max-w-3xl leading-relaxed animate-fade-in-delay-2">{currentSlide.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href={currentSlide.ctaLink} className="flex items-center">
                {currentSlide.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {currentSlide.secondaryCtaText && currentSlide.secondaryCtaLink && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                <Link href={currentSlide.secondaryCtaLink}>{currentSlide.secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white z-20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white z-20"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
