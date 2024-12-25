import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step3({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base">
            3&nbsp;&nbsp;Do you prefer cash back, points, or miles?*
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm">
            Please Select One Option
          </Label>
          <InfoCircle className="h-4 w-4 text-foreground" />
        </div>
        <Select
          value={data.rewardType}
          onValueChange={(value: 'cashback' | 'points' | 'miles') => onUpdate('rewardType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cashback">Cash Back</SelectItem>
            <SelectItem value="points">Points</SelectItem>
            <SelectItem value="miles">Miles</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

