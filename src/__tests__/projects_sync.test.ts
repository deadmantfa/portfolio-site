import { describe, it, expect } from 'vitest'
import { careerData } from '../data/career'
import { projects } from '../data/projects'

describe('Dynamic Project Synchronization', () => {
  it('should find corresponding projects for milestones using company matching', () => {
    careerData.forEach((milestone) => {
      const project = projects.find(p => 
        milestone.company.toLowerCase().includes(p.company.toLowerCase()) ||
        p.company.toLowerCase().includes(milestone.company.toLowerCase())
      )

      // We expect specific milestones to have projects now
      const expectedCompanies = ['Rooftop', 'Food Darzee', 'EasyTech', 'IndieFolio', 'ePaisa', 'CouponDunia', 'WNS', 'Tata']
      
      const shouldHaveProject = expectedCompanies.some(c => milestone.company.includes(c))
      
      if (shouldHaveProject) {
        expect(project).toBeDefined()
      }
    })
  })

  it('should map milestones to correct slugs', () => {
    const getProjectForMilestone = (companyName: string) => {
      return projects.find(p => 
        companyName.toLowerCase().includes(p.company.toLowerCase()) ||
        p.company.toLowerCase().includes(companyName.toLowerCase())
      )
    }

    expect(getProjectForMilestone('IndieFolio Network')?.slug).toBe('indiefolio')
    expect(getProjectForMilestone('ePaisa Services')?.slug).toBe('epaisa')
    expect(getProjectForMilestone('WNS')?.slug).toBe('tcs-wns')
    expect(getProjectForMilestone('CouponDunia')?.slug).toBe('coupon-dunia')
  })
})
