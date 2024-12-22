import ShowCodeComponent from '@/components/codeComponent/ShowCodeComponent'
import React from 'react'
import { componentParams } from '@/types/Params'

export default function page(prod:componentParams) {

  const componentKey = prod.params.componentKey;

  return (
    <ShowCodeComponent componentKey={componentKey} />
  )
}
