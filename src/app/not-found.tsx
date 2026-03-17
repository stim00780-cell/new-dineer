import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <UtensilsCrossed className="h-24 w-24 text-muted-foreground/50" />
      <h1 className="mt-8 font-headline text-6xl font-bold">404</h1>
      <p className="mt-4 text-2xl text-muted-foreground">Page Not Found</p>
      <p className="mt-2 max-w-md text-muted-foreground">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
