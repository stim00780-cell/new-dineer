import { Utensils } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Utensils className="h-7 w-7" />
      <span className="font-headline text-xl font-semibold tracking-tight">
        Dinner O'Clock
      </span>
    </div>
  );
}
