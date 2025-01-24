import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step4({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base desktop:text-left last-line-center">
            Do you prefer cards with an annual fee or no annual <span className="after:content-['*'] after:text-red-500 after:ml-1 after:inline-block text-nowrap">fee?</span>
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm">
            Please Select One Option
          </Label>
          <InfoCircle className="h-4 w-4 text-foreground" />
        </div>
        <RadioGroup
          value={data.annualFee}
          onValueChange={(value: 'no' | 'yes') => onUpdate('annualFee', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-fee" />
            <Label htmlFor="no-fee">No Annual Fee</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="with-fee" />
            <Label htmlFor="with-fee">I&apos;m Okay with an Annual Fee</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

