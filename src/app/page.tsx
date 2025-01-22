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
    // const rewardTypeList = ['cashback', 'miles', 'points'];
    const selection = ['yes', 'no']
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
    <div className={`p-6 h-full w-4/5 flex flex-col pb-16 ${isLoading ? "justify-center items-center" : "justify-between"} gap-8`}>
      {isLoading ? <PuffLoader size={200} color='blue'/> :
        <>
        <header className="flex flex-col justify-center gap-8">
          <img src='Image/logo.png' className='h-fit w-1/6'/>
          <h1 className="text-2xl float-start before:content-['Customize'] before:font-[700] font-[400]"> Your card</h1>
          <ProgressDots totalSteps={TOTAL_STEPS} currentStep={currentStep} />
        </header>

        <main className="bg-white border border-[#0000001A] rounded-xl p-6 pb-28 w-full h-full transition-all duration-1000 shadow-md relative overflow-y-auto"> 
          
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
          <div className="absolute flex flex-row justify-center gap-2 mobile:justify-end items-center right-6 bottom-10">
            <div className="flex flex-row gap-2 w-fit">
              <Button onClick={handleBack} className={`font-bold w-36 h-14 bg-transparent gradient-text active:text-[#4286f4a0]`} disabled={currentStep === 1}>
                <ArrowLeftIcon className="w-4 h-4" color='#06b6d4' /> &nbsp;Back
              </Button>
              <Button onClick={currentStep !== TOTAL_STEPS ? handleNext : sendData} className={`rounded-full font-bold w-36 h-14 ml-auto bg-gradient-to-r from-cyan-400 to-blue-500 ${currentStep == 8 && "hidden"}`} disabled={isNextDisabled()}>
                {currentStep === TOTAL_STEPS ? 'Submit' : `Next`}<ArrowRightIcon className="w-4 h-4" />
              </Button>
              <Button onClick={() => setCurrentStep(1)} className={`rounded-full font-bold w-36 h-14 ml-auto bg-gradient-to-r from-cyan-400 to-blue-500 ${currentStep == 8 ? 'block' : 'hidden'}`}>
                Return
              </Button>
            </div>
          </div>
        </main>
      </>
      }
    </div>
  )
}

