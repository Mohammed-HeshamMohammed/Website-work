// filter-section.tsx
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export function FilterSection({ 
  title, 
  icon, 
  iconColor, 
  children, 
  expanded, 
  setExpanded 
}: FilterSectionProps) {
  return (
    <Collapsible open={expanded} onOpenChange={setExpanded} className="mb-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between px-2 py-1 mb-2">
          <span className="flex items-center gap-2">
            <div className={`h-4 w-4 ${iconColor}`}>{icon}</div>
            <span className="text-sm font-medium">{title}</span>
          </span>
          <span className="text-xs text-gray-500">
            {expanded ? "Hide" : "Show"}
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-gray-50 rounded-md p-3 space-y-2">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}