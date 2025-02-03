import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step6({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base desktop:text-left last-line-center">
            Do you plan to travel <span className="after:content-['*'] after:text-red-500 after:ml-1 after:inline-block text-nowrap">internationally?</span>
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm last-line-center desktop:text-left">
            If you travel abroad, we&apos;ll prioritize cards with no foreign transaction fees, global travel perks, and rewards that help you save on flights and hotels.
          </Label>
          <InfoCircle className="h-4 w-4 text-foreground" />
        </div>
        <Select
          value={data.travelPlans}
          onValueChange={(value: 'yes' | 'no') => onUpdate('travelPlans', value)}
        >
          <SelectTrigger>
            <SelectValue className="text-red-500 placeholder:text-red-900" placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  )
}

