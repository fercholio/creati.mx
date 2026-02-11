'use client'

import { EditorialStrip } from '@/components/ui/MagazineImages'
import { images } from '@/lib/images'

export function EditorialStripSection() {
  return (
    <EditorialStrip
      images={[
        images.editorial.detail,
        images.editorial.aerial,
        images.about.laptopWork,
      ]}
    />
  )
}
