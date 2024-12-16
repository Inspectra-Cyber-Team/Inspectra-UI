
import React from 'react'
import { ruleName } from '@/types/Params'
import RuleComponent from '@/components/RuleComponent/RuleComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rule - Inspectra",
  description:
    "Inspectra provides a comprehensive list of rules to help you identify and address code vulnerabilities. Learn more about our rules and how they can help you secure your code.",
};


export default function page(prop:ruleName) {
  
  const ruleName = prop?.params?.ruleName;

  return (
    <section>
        <RuleComponent ruleKey={ruleName} />
    </section>
  )
}
