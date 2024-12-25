'use client'

import { useState } from 'react'
import { ProgressDots } from '@/components/progress_dots'
import { Step1 } from '@/components/form-steps/step_1'
import { Step2 } from '@/components/form-steps/step_2'
import { Step3 } from '@/components/form-steps/step_3'
import { Step4 } from '@/components/form-steps/step_4'
import { Step5 } from '@/components/form-steps/step_5'
import { Step6 } from '@/components/form-steps/step_6'
import type { FormData } from '@/components/types/form'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

const TOTAL_STEPS = 6

export default function CreditCardWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    monthlySpend: '',
    cardCount: '',
    rewardType: '',
    annualFee: '',
    isFreelancer: '',
    travelPlans: ''
  })

  const handleUpdate = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="p-6 h-4/5 w-4/5 flex flex-col justify-between gap-8">

      <header className="flex flex-col justify-center gap-8">
        <h1 className="text-2xl font-semibold float-start">Customize your card</h1>
        <ProgressDots totalSteps={TOTAL_STEPS} currentStep={currentStep} />
      </header>

      <main className="bg-white border border-[#0000001A] rounded-xl p-6 w-full h-full transition-all duration-1000"> 
        
          <Step1
            show={currentStep === 1}
            data={formData}
            onUpdate={handleUpdate}
        />
        
        <Step2
          show={currentStep === 2}
            data={formData}
            onUpdate={handleUpdate}
        />

        <Step3
            show={currentStep === 3}
            data={formData}
            onUpdate={handleUpdate}
          />
          
        
        <Step4
          show={currentStep === 4}
          data={formData}
          onUpdate={handleUpdate}
        />
        
        
        <Step5
          show={currentStep === 5}
          data={formData}
          onUpdate={handleUpdate}
        />
        
        
        <Step6
          show={currentStep === 6}
          data={formData}
          onUpdate={handleUpdate}
        />
        
      </main>

      <footer className="flex flex-row justify-end gap-2 ">
        <div className="flex flex-row gap-2 w-fit">
          <Button onClick={handleBack} className={`font-boldw-40 bg-transparent border border-[#4285F4]  text-[#4285F4]`} disabled={currentStep === 1}>
            <ArrowLeftIcon className="w-4 h-4" /> &nbsp;Back
          </Button>
          <Button onClick={handleNext} className={`font-bold w-40 ml-auto`} disabled={currentStep === TOTAL_STEPS}>
            Next&nbsp;<ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  )
}

