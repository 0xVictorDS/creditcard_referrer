export type FormData = {
    monthlySpend: string;
    cardCount: string;
    rewardType: 'cashback' | 'points' | 'miles' | '';
    annualFee: 'no' | 'yes' | '';
    isFreelancer: 'yes' | 'no' | '';
    travelPlans: 'yes' | 'no' | '';
  }
  
  export type StepProps = {
    show: boolean;
    data: FormData;
    onUpdate: (key: keyof FormData, value: string) => void;
  }
  
  