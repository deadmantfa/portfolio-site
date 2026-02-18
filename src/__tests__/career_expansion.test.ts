import { describe, it, expect } from 'vitest'
import { careerData } from '../data/career'

describe('Career Data Enrichment Audit', () => {
  it('should contain microscopic impact details for IndieFolio Network', () => {
    const indieFolio = careerData.find(m => m.company.includes('IndieFolio'))
    expect(indieFolio?.highlights).toContain('Architected Creative Field CQ algorithm for user discovery')
    expect(indieFolio?.highlights).toContain('Developed real-time messaging with WebSockets and RBAC')
  })

  it('should contain microscopic details for ePaisa Services', () => {
    const ePaisa = careerData.find(m => m.company.includes('ePaisa'))
    expect(ePaisa?.highlights).toContain('Architected Voodle: AWS-based Blender render farm')
    expect(ePaisa?.highlights).toContain('Implemented Dugna Security (MFA) for payment integrity')
  })

  it('should reflect foundational automation at TCS and WNS', () => {
    const tcs = careerData.find(m => m.company.includes('Tata'))
    expect(tcs?.highlights).toContain('Automated market questionnaire analysis via Shell Scripts')

    const wns = careerData.find(m => m.company.includes('WNS') && m.role === 'Junior Analyst')
    expect(wns?.highlights).toContain('Earned highest productivity hours award')
  })

  it('should include specific payment gateway integrations for Food Darzee', () => {
    const foodDarzee = careerData.find(m => m.company.includes('Food Darzee'))
    expect(foodDarzee?.highlights).toContain('Integrated PayTM, PhonePe, and Axis Bank gateways')
  })
})
