'use client';
import { useStep } from '@/components/elements/formSteps/StepContext';

const StepEdit = ({ styles, num, children }: {styles:string, num:number, children:React.ReactNode}) => {
    const { setStepNumber } = useStep();
    return (
        <p className={styles} onClick={() => setStepNumber(num)}>{children}</p>
    )
};

export default StepEdit;