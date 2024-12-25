interface ProgressDotsProps {
    totalSteps: number;
    currentStep: number;
  }
  
  export function ProgressDots({ totalSteps, currentStep }: ProgressDotsProps) {
    return (
      <div className="flex gap-2  w-full items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-full rounded-full transition-colors duration-1000 ${
              index <= currentStep - 1 ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }
  
  