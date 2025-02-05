'use client'

import { useState } from 'react'
import { ProgressDots } from '@/components/progress_dots'
import { Step1 } from '@/components/form-steps/step_1'
import { Step2 } from '@/components/form-steps/step_2'
import { Step3 } from '@/components/form-steps/step_3'
import { Step4 } from '@/components/form-steps/step_4'
import { Step5 } from '@/components/form-steps/step_5'
import { Step6 } from '@/components/form-steps/step_6'
import { Step7 } from '@/components/form-steps/step_7'
import { Step8 } from '@/components/form-steps/step_8'
import { CardData, type FormData } from '@/components/types/form'
import { Button } from '@/components/ui/button'
import {PuffLoader} from "react-spinners";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import backendURL from '../utility/backendUrl'
import axios from 'axios'
import { Label } from '@radix-ui/react-label'

const TOTAL_STEPS = 7


export default function CreditCardWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    monthlySpend: '',
    cardCount: '',
    rewardType: '',
    annualFee: '',
    isFreelancer: '',
    travelPlans: '',
    creditScore: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardData, setCardData] = useState<Array<CardData>>([]);

  const handleUpdate = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const isNextDisabled = () => {
    if(currentStep === 1 && formData.monthlySpend === '') {
      return true
    }
    if(currentStep === 2 && formData.cardCount === '') {
      return true
    }
    if(currentStep === 3 && formData.rewardType === '') {
      return true
    }
    if(currentStep === 4 && formData.annualFee === '') {
      return true
    }
    if(currentStep === 5 && formData.isFreelancer === '') {
      return true
    }
    if(currentStep === 6 && formData.travelPlans === '') {
      return true
    }
    return false
  } 

  const sendData = async() => {
    setIsLoading(true);
    const selection = ['no', 'yes'];
    const creditScoreList = ['Excellent', 'Very Good', 'Good', "Fair", "Poor"];
    const monthlySpend = parseInt(formData.monthlySpend);
    const cardCount = parseInt(formData.cardCount);
    const rewardType = formData.rewardType;
    const annualFee = selection.findIndex(option => option === formData.annualFee);
    const isFreelancer = selection.findIndex(option => option === formData.isFreelancer);
    const isTravelNeeded = selection.findIndex(option => option === formData.travelPlans);
    const creditScore = creditScoreList.findIndex(option => option === formData.creditScore);
    const cardList: Array<CardData> = await axios.get(`${backendURL}/api/v1/check_card`, {
      params: {
        monthlySpend: monthlySpend,
        cardCount: cardCount,
        rewardType: rewardType,
        annualFee: annualFee,
        isFreelancer: isFreelancer,
        isTravelNeeded: isTravelNeeded,
        creditScore: creditScore
      }
    }).then(result => result.data.cardList)
    console.log("result",cardList)
    setCardData(cardList)
    handleNext()
    setIsLoading(false);
  }

  return (
    <div className={`py-16 px-5  h-full max-h-screen w-full desktop:w-4/5 flex flex-col ${isLoading ? "justify-center items-center" : "justify-between"} gap-8`}>
      {isLoading ? <PuffLoader size={200} color='#0099CC'/> :
        <>
        <header className="flex flex-col justify-center gap-8 pt-16">
          {currentStep === 8 ? 
            cardData.length ? <>
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex items-center">
                <Label className="text-foreground font-semibold desktop:text-left text-center whitespace-nowrap">
                  🎉 Congrats! Here Are the Best Cards for You! 🎉
                </Label>
              </div>
              <div className="flex flex-col gap-3">
                <Label className="text-foreground font-medium text-sm text-center desktop:text-left">
                  Based on your spending and preferences, we&apos;ve curated top credit card options that maximize your rewards and benefits—whether you&apos;re earning cash back, points, or miles.
                </Label>
                <div className='flex flex-col'>
                  <Label className="text-foreground font-medium text-sm text-center desktop:text-left">
                    💰 Boost your earnings on every purchase
                  </Label>
                  <Label className="text-foreground font-medium text-sm text-center desktop:text-left">
                    ✈️ Unlock exclusive travel perks & benefits
                  </Label>
                  <Label className="text-foreground font-medium text-sm text-center desktop:text-left">
                    🚀 Get the most value from your spending
                  </Label>
                </div>
                <div className='flex flex-col'>
                  <Label className="text-foreground font-medium text-sm text-center desktop:text-left">
                    Tap on a card to explore details and apply now!
                  </Label>
                </div>
                <Label className="text-foreground font-medium text-sm text-center desktop:text-left">👉 The right card can take your rewards to the next level—start earning today!</Label>
              </div> 
            </> : 
            <>
            <div className="flex items-center">
              <Label className="text-foreground font-semibold text-base desktop:text-left last-line-center">
                We Couldn&apos;t Find a Match Right Now.
              </Label>
            </div>
            <div className="flex flex-col gap-3">
                <Label className="text-foreground font-medium text-sm text-center desktop:text-left">
                Based on the information you provided, we weren&apos;t able to find any cards that fit your spending habits and preferences. But don&apos;t worry—there are plenty of great options out there!
                </Label>
                <Label className="text-foreground font-medium text-sm text-center desktop:text-left">Feel free to adjust your inputs or check back later as new offers and opportunities become available.</Label>
            </div> 
            </> :
            <ProgressDots totalSteps={TOTAL_STEPS} currentStep={currentStep} />
          }
        </header>

        <main className="bg-white border border-[#0000001A] rounded-xl p-6 w-full h-full transition-all duration-1000 shadow-md relative overflow-auto min-h-[400px]"> 
          
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

          <Step7
            show={currentStep === 7}
            data={formData}
            onUpdate={handleUpdate}
          />

          <Step8
            show={currentStep === 8}
            data={cardData} 
          />
          
        </main>
        <footer className='flex flex-col gap-3'>
          {currentStep == 8 && 
            <>
              <div className="flex flex-col gap-3  w-full overflow-x-hidden">
                <Label className="text-foreground font-semibold text-xs desktop:text-sm text-justify">  
                  The recommendations provided are for informational purposes only and do not constitute financial advice. Approval for any credit card is subject to the issuing bank&apos;s evaluation and criteria, and we cannot guarantee approval. Please review the terms and conditions of each card carefully before applying. 
                </Label>
                <Label className="text-foreground font-semibold text-xs desktop:text-sm text-justify">  
                  If you are approved for a card through one of our links, we may earn a commission. This does not influence our recommendations, which are based solely on your preferences and spending habits.
                </Label>
              </div>
            </>
          }
          <div className="flex flex-row justify-center gap-2 desktop:justify-end items-center">
            <div className="flex flex-row gap-2 w-fit mb-6">
              <Button onClick={handleBack} className={`font-bold h-9 w-fit desktop:h-14 desktop:w-36 bg-transparent gradient-text active:text-[#5442f4] active:scale-105 hover:scale-105 transition-all duration-100 group`} disabled={currentStep === 1}>
                <ArrowLeftIcon className="w-4 h-4 group-active:stroke-[#5442f4]" color='#06b6d4' /> &nbsp;Back
              </Button>
              <Button onClick={currentStep !== TOTAL_STEPS ? handleNext : sendData} className={`rounded-full font-bold h-9 w-fit desktop:h-14 desktop:w-36 ml-auto bg-gradient-to-r from-cyan-400 to-blue-500 ${currentStep == 8 && "hidden"} active:bg-gradient-to-r active:from-cyan-300 active:to-blue-700 active:scale-110 hover:scale-105 transition-all duration-100`} disabled={isNextDisabled()}>
                {currentStep === TOTAL_STEPS ? 'Find My Match' : `Next`}
                <ArrowRightIcon className={`w-4 h-4 ${currentStep === TOTAL_STEPS && 'hidden'}`}  />
              </Button>
              <Button onClick={() => setCurrentStep(1)} className={`rounded-full font-bold h-9 w-fit desktop:h-14 desktop:w-36 ml-auto bg-gradient-to-r from-cyan-400 to-blue-500 ${currentStep == 8 ? 'block' : 'hidden'}  active:bg-gradient-to-r active:from-cyan-300 active:to-blue-700 active:scale-105 hover:scale-105 transition-all duration-100`}>
                Start Over
              </Button>
            </div>
          </div>
        </footer>
      </>
      }
    </div>
  )
}

