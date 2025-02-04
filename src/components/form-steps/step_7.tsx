import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step7({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base desktop:text-left last-line-center">
            What is your approximate credit <span className="after:content-['*'] after:text-red-500 after:ml-1 after:inline-block text-nowrap">score?</span>
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm last-line-center tablet:text-left">
            <InfoCircle className="h-4 w-4 text-foreground inline mr-2" />
            Credit cards have different approval requirements. Knowing your credit score range helps us suggest cards you’re most likely to get approved for.
          </Label>
        </div>
        <Select
          value={data.creditScore.toString()}
          onValueChange={(value: string) => onUpdate('creditScore', value)}
        >
          <SelectTrigger>
            <SelectValue className="text-red-500 placeholder:text-red-900" placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Excellent'>Excellent (781 ~ 850)</SelectItem>
            <SelectItem value='Very Good'>Very Good (661 ~ 780)</SelectItem>
            <SelectItem value='Good'>Good (601 ~ 660)</SelectItem>
            <SelectItem value='Fair'>Fair (500 ~ 600)</SelectItem>
            <SelectItem value='Poor'>Poor (300 ~ 499)</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  )
}

