// src/app/forgot-password/page.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Password Reset Link Sent",
        description: "If an account exists for this email, a reset link has been sent.",
    });
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleReset}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" required />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
        <CardContent className="flex justify-center">
           <Button variant="link" asChild>
             <Link href="/login">
                <ChevronLeft className="mr-2" />
                Back to Login
             </Link>
           </Button>
        </CardContent>
      </Card>
    </div>
  );
}
