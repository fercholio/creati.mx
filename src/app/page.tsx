import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { Problem } from '@/components/sections/Problem'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { EditorialStripSection } from '@/components/sections/EditorialStripSection'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <SocialProof />
      <Problem />
      <Features />
      <EditorialStripSection />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
