import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step2({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base desktop:text-left after:content-['*'] after:text-red-500 after:ml-1 last-line-center">
            How many personal credit cards have you applied for in the last 2 years?
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm">
            Credit Cards You&apos;ve Applied
          </Label>
          <InfoCircle className="h-4 w-4 text-foreground" />
        </div>
        <Select
          value={data.cardCount?.toString()}
          onValueChange={(value) => onUpdate('cardCount', value)}
        >
          <SelectTrigger>
            <SelectValue className="placeholder:text-red-500 w-1/2" placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i === 9 ? `${i + 1}+` : i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className={`text-sm last-line-center ${parseInt(data.cardCount) >= 5 ? 'text-red-500' : 'text-transparent'} text-center desktop:text-left`}>
          Please note: Based on Chase&apos;s application rules, your approval odds for a Chase-branded credit card may be affected if you have applied for 5 or more credit cards in the last 24 months.
        </p>
      </div>
    </div>
  )
}

