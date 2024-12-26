import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step1({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base">
            1&nbsp;&nbsp;How much do you spend (or expect to spend) per month?*
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm">
            Monthly Expectation
          </Label>
          <InfoCircle className="h-4 w-4 text-foreground" />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-2">$</span>
          <Input
            id="monthlySpend"
            type="number"
            value={data.monthlySpend}
            onChange={(e) => onUpdate('monthlySpend', e.target.value)}
            className="pl-6 text-md"
            required
          />
        </div>
      </div>
    </div>
  )
}

