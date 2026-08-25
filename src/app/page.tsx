import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { Problem } from '@/components/sections/Problem'
import { Features } from '@/components/sections/Features'
import { ShowroomSection } from '@/components/sections/ShowroomSection'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { ProjectEstimator } from '@/components/sections/ProjectEstimator'
import { IntegrationsGrid } from '@/components/sections/IntegrationsGrid'
import { TrustGuarantees } from '@/components/sections/TrustGuarantees'
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
      <CaseStudies />
      <ShowroomSection />
      <ProjectEstimator />
      <Problem />
      <Features />
      <IntegrationsGrid />
      <TrustGuarantees />
      <EditorialStripSection />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
