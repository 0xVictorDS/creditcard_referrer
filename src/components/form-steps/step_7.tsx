import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step7({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base mobile:text-left after:content-['*'] after:text-red-500 after:ml-1 last-line-center">
            What is your expected credit score?
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center ">
          <Label className="text-foreground font-medium text-sm">
            Please Select One Option
          </Label>
          <InfoCircle className="h-4 w-4 text-foreground" />
        </div>
        <Select
          value={data.creditScore.toString()}
          onValueChange={(value: string) => onUpdate('creditScore', value)}
        >
          <SelectTrigger>
            <SelectValue className="text-red-500 placeholder:text-red-900" placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='excellent'>Excellent</SelectItem>
            <SelectItem value='Very Good'>Very Good</SelectItem>
            <SelectItem value='Good'>Good</SelectItem>
            <SelectItem value='Fair'>Fair</SelectItem>
            <SelectItem value='Poor'>Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  )
}

