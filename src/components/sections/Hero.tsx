'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { HeroCollage } from '@/components/ui/MagazineImages'
import { images } from '@/lib/images'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-accent-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-100/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-navy-100/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(36, 59, 83, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(36, 59, 83, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container className="text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-semibold border border-accent-100 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
            Construyendo el futuro del software
          </span>
        </motion.div>

        {/* Headline with kinetic typography */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-display)] tracking-tight text-gray-900 leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Software que se{' '}
          <span className="relative inline-block">
            <motion.span
              className="bg-gradient-to-r from-accent-500 via-accent-400 to-navy-400 bg-clip-text text-transparent"
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              adapta
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-300 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </span>
          <br />
          a tu vida
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Creamos productos digitales que las personas realmente disfrutan usar.
          Simples, intuitivos, y diseñados para el mundo real.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button href="/contact" size="lg">
            Empecemos un proyecto
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="/about" variant="secondary" size="lg">
            Conoce Creati
          </Button>
        </motion.div>

        {/* Magazine-style image collage */}
        <HeroCollage
          images={[
            images.hero.teamCollab,
            images.hero.codeOnScreen,
            images.hero.designProcess,
          ]}
        />
      </Container>
    </section>
  )
}
