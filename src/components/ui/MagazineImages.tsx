'use client'

import { motion } from 'framer-motion'

interface MagazineImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'landscape' | 'portrait' | 'square'
  rotate?: number
  priority?: boolean
}

/**
 * Single magazine-style image with hover effects and optional rotation.
 */
export function MagazineImage({
  src,
  alt,
  className = '',
  aspectRatio = 'landscape',
  rotate = 0,
  priority = false,
}: MagazineImageProps) {
  const aspectClasses = {
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ rotate: `${rotate}deg` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ scale: 1.02, rotate: 0 }}
    >
      <div className={`${aspectClasses[aspectRatio]} overflow-hidden rounded-2xl bg-gray-100`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
    </motion.div>
  )
}

/**
 * Hero-style magazine collage — 3 images in asymmetric layout.
 * Large image on left, two stacked on right with slight overlap and rotation.
 */
export function HeroCollage({
  images,
}: {
  images: { src: string; alt: string }[]
}) {
  return (
    <div className="relative max-w-5xl mx-auto mt-16 lg:mt-20 px-4">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 items-start">
        {/* Large featured image */}
        <motion.div
          className="col-span-12 md:col-span-7 relative z-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl bg-gray-100 shadow-2xl shadow-gray-200/50">
            <img
              src={images[0].src}
              alt={images[0].alt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-2xl lg:rounded-3xl ring-1 ring-inset ring-black/5" />
        </motion.div>

        {/* Stacked right column */}
        <div className="col-span-12 md:col-span-5 space-y-4 lg:space-y-5 md:-ml-8 md:mt-12">
          <motion.div
            className="relative z-20"
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 shadow-xl shadow-gray-200/40">
              <img
                src={images[1].src}
                alt={images[1].alt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </motion.div>

          <motion.div
            className="relative z-20 md:mr-6"
            initial={{ opacity: 0, y: 30, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-lg shadow-gray-200/30">
              <img
                src={images[2].src}
                alt={images[2].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-200/40 rounded-full blur-2xl -z-10" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -z-10" />
    </div>
  )
}

/**
 * About-page style — editorial split with overlapping images.
 */
export function EditorialStack({
  images,
  className = '',
}: {
  images: { src: string; alt: string }[]
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Primary large image */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="aspect-[4/5] overflow-hidden rounded-2xl lg:rounded-3xl bg-gray-100 shadow-2xl shadow-gray-200/40">
          <img
            src={images[0].src}
            alt={images[0].alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl ring-1 ring-inset ring-black/5" />
      </motion.div>

      {/* Overlapping secondary image */}
      {images[1] && (
        <motion.div
          className="absolute -bottom-8 -right-6 lg:-right-12 w-2/3 z-20"
          initial={{ opacity: 0, y: 30, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
        >
          <div className="aspect-[3/2] overflow-hidden rounded-xl lg:rounded-2xl bg-gray-100 shadow-xl shadow-gray-300/40 border-4 border-white">
            <img
              src={images[1].src}
              alt={images[1].alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Decorative dot pattern */}
      <div className="absolute -top-4 -left-4 w-20 h-20 opacity-20 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)',
          backgroundSize: '10px 10px',
        }}
      />
    </div>
  )
}

/**
 * Full-bleed editorial image strip — magazine divider between sections.
 */
export function EditorialStrip({
  images,
}: {
  images: { src: string; alt: string }[]
}) {
  return (
    <section className="py-2 overflow-hidden">
      <div className="flex gap-4 lg:gap-6 -mx-4 px-4">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            className="flex-shrink-0"
            style={{ width: i === 1 ? '45%' : '35%' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className={`${i === 1 ? 'aspect-[16/9]' : 'aspect-[3/2]'} overflow-hidden rounded-2xl bg-gray-100`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
