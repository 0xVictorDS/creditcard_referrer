import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { StepProps } from "@/components/types/form"

export function Step5({ show, data, onUpdate }: StepProps) {
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-foreground font-semibold text-base desktop:text-left last-line-center">
            Are you a small business owner or <span className="after:content-['*'] after:text-red-500 after:ml-1 after:inline-block text-nowrap">freelancer?</span>
          </Label>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Label className="text-foreground font-medium text-sm last-line-center tablet:text-left">
            <InfoCircle className="h-4 w-4 text-foreground inline mr-2" />
            If you select yes, we&apos;ll only show business credit cards, which offer great rewards on business expenses. If you want to see personal credit cards, select no instead.
          </Label>
        </div>
        <Select
          value={data.isFreelancer}
          onValueChange={(value: 'yes' | 'no') => onUpdate('isFreelancer', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
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

