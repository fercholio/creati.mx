import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { TechCatalogSection } from '@/components/sections/TechCatalogSection'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { ProjectEstimator } from '@/components/sections/ProjectEstimator'
import { IntegrationsGrid } from '@/components/sections/IntegrationsGrid'
import { TrustGuarantees } from '@/components/sections/TrustGuarantees'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <SocialProof />
      <TechCatalogSection />
      <CaseStudies />
      <ProjectEstimator />
      <IntegrationsGrid />
      <TrustGuarantees />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
