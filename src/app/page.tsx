import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { IntegrationsGrid } from '@/components/sections/IntegrationsGrid'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { ProjectEstimator } from '@/components/sections/ProjectEstimator'
import { TrustGuarantees } from '@/components/sections/TrustGuarantees'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CTA } from '@/components/sections/CTA'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <SocialProof />
      <IntegrationsGrid />
      <CaseStudies />
      <ProjectEstimator />
      <TrustGuarantees />
      <HowItWorks />
      <CTA />
    </>
  )
}
