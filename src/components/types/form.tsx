export type FormData = {
    monthlySpend: string;
    cardCount: string;
    rewardType: 'Cash' | 'points' | 'miles' | '';
    annualFee: 'no' | 'yes' | '';
    isFreelancer: 'yes' | 'no' | '';
    travelPlans: 'yes' | 'no' | '';
    creditScore: string;
  }
  
  export type StepProps = {
    show: boolean;
    data: FormData;
    onUpdate: (key: keyof FormData, value: string) => void;
  }
  
  export type CardData = {
    cardName: string,
    cardIssuer: string,
    cardKey: string,
    cardIconUrl: string,
    cardSignUrl: string,
    isReferralUrl: boolean
    rewardContent: string;
  }
  