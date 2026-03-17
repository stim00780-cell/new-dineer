// src/app/plans/postpaid-signup/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Check, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 'Step 1', name: 'Personal Information' },
  { id: 'Step 2', name: 'Address Details' },
  { id: 'Step 3', name: 'Document Upload' },
  { id: 'Step 4', name: 'Completed' },
];

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
});

const addressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
});

const documentSchema = z.object({
  document: z
    .any()
    .refine((files) => files?.length == 1, 'Document is required.')
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      `Max file size is 5MB.`
    ),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type AddressInfo = z.infer<typeof addressSchema>;
type DocumentInfo = z.infer<typeof documentSchema>;

export default function PostpaidSignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  const personalInfoForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });
  const addressForm = useForm<AddressInfo>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      postalCode: '',
    },
  });
  const documentForm = useForm<DocumentInfo>({
    resolver: zodResolver(documentSchema),
  });

  const onSubmitPersonalInfo = (data: PersonalInfo) => {
    console.log(data);
    setCurrentStep(1);
  };

  const onSubmitAddress = (data: AddressInfo) => {
    console.log(data);
    setCurrentStep(2);
  };

  const onSubmitDocuments = (data: DocumentInfo) => {
    console.log(data);
    setCurrentStep(3); // Go to completion step
    toast({
      title: 'Application Submitted!',
      description:
        'Your application for the postpaid plan is under review. We will get back to you shortly.',
    });
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Progress value={progress} className="mb-2" />
          <p className="text-center text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length - 1}
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl md:text-3xl">
              Postpaid Plan Application
            </CardTitle>
            <CardDescription>
              {steps[currentStep].name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 0 && (
              <Form {...personalInfoForm}>
                <form
                  onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)}
                  className="space-y-4"
                >
                  <FormField
                    control={personalInfoForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalInfoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (234) 567-890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Next
                  </Button>
                </form>
              </Form>
            )}
            {currentStep === 1 && (
              <Form {...addressForm}>
                <form
                  onSubmit={addressForm.handleSubmit(onSubmitAddress)}
                  className="space-y-4"
                >
                  <FormField
                    control={addressForm.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Foodie Lane"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Flavor Town" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(0)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Next
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            {currentStep === 2 && (
              <Form {...documentForm}>
                <form
                  onSubmit={documentForm.handleSubmit(onSubmitDocuments)}
                  className="space-y-4"
                >
                  <FormField
                    control={documentForm.control}
                    name="document"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Document</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.png"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload a proof of address or identity (PDF, JPG, PNG,
                          max 5MB).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            {currentStep === 3 && (
              <div className="text-center space-y-4 flex flex-col items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h2 className="text-2xl font-bold">Application Complete!</h2>
                <p className="text-muted-foreground">
                  Thank you for submitting your application. We are now
                  reviewing your details and will get back to you within 2-3
                  business days.
                </p>
                <Button onClick={() => router.push('/')}>
                  Back to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
