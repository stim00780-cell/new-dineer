// src/app/plans/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Salad, Soup, Utensils, Clock, Sparkles, FileText } from 'lucide-react';
import { plans } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useAppSettings } from '@/hooks/use-app-settings';


type PlanTypeFilter = 'Prepaid' | 'Postpaid';

export default function PlansPage() {
  const [planTypeFilter, setPlanTypeFilter] = useState<PlanTypeFilter>('Prepaid');
  const router = useRouter();
  const { isCustomPlanEnabled } = useAppSettings();

  const handleSubscribe = (planType: 'Prepaid' | 'Postpaid' | 'Both') => {
    if (planType === 'Postpaid' || (planType === 'Both' && planTypeFilter === 'Postpaid')) {
      router.push('/plans/postpaid-signup');
    } else {
      // Handle prepaid subscription logic (e.g., redirect to checkout)
      alert('Redirecting to checkout for Prepaid plan...');
    }
  };
  
  const handleCustomPlan = () => {
    router.push('/plans/custom');
  }

  const filteredPlans = plans.filter(plan => plan.type === planTypeFilter || plan.type === 'Both');

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">Our Meal Plans</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Choose a plan that fits your lifestyle. Simple, flexible, and delicious.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center space-x-4">
        <Label htmlFor="plan-switch" className={cn(planTypeFilter === 'Prepaid' ? 'text-foreground' : 'text-muted-foreground')}>Prepaid</Label>
        <Switch
          id="plan-switch"
          checked={planTypeFilter === 'Postpaid'}
          onCheckedChange={(checked) => setPlanTypeFilter(checked ? 'Postpaid' : 'Prepaid')}
          aria-label="Toggle between prepaid and postpaid plans"
        />
        <Label htmlFor="plan-switch" className={cn(planTypeFilter === 'Postpaid' ? 'text-foreground' : 'text-muted-foreground')}>Postpaid</Label>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredPlans.map((plan) => (
            <Card key={plan.id} className={cn("flex flex-col", plan.isFeatured ? 'border-primary ring-2 ring-primary' : '')}>
              {plan.isFeatured && (
                 <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-semibold rounded-t-lg">Most Popular</div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
                {plan.deliverySchedule && (
                    <Badge variant="outline" className="w-fit mx-auto">
                        <Clock className="mr-1.5 h-3 w-3" />
                        {plan.deliverySchedule}
                    </Badge>
                )}
                <CardDescription className='pt-2'>
                  <span className="font-headline text-4xl text-foreground">€{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.duration.toLocaleLowerCase()}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <Accordion type="single" collapsible className="w-full" defaultValue='features'>
                    <AccordionItem value="features">
                      <AccordionTrigger>Features</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pl-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    {plan.dailyMenu && (
                      <AccordionItem value="daily-menu">
                        <AccordionTrigger>Daily Menu</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm text-muted-foreground">
                            {plan.dailyMenu.map(day => (
                               <div key={day.day}>
                                  <h4 className='font-semibold text-foreground mb-1'>Day {day.day}</h4>
                                  <ul className="space-y-1 pl-2">
                                      <li className='flex items-center gap-2'><Salad className='h-4 w-4 text-primary' /> B: {day.meals.breakfast}</li>
                                      <li className='flex items-center gap-2'><Soup className='h-4 w-4 text-primary' /> L: {day.meals.lunch}</li>
                                      <li className='flex items-center gap-2'><Utensils className='h-4 w-4 text-primary' /> D: {day.meals.dinner}</li>
                                  </ul>
                               </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                 </Accordion>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.isFeatured ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.type)}
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
        ))}
        
        {isCustomPlanEnabled && (
           <Card className="flex flex-col border-accent ring-2 ring-accent">
                <div className="bg-accent text-accent-foreground text-center py-1 text-sm font-semibold rounded-t-lg">Build Your Own</div>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Custom Plan</CardTitle>
                <CardDescription className='pt-2'>
                  Design a meal plan that perfectly fits your tastes and schedule.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <ul className="space-y-3">
                    <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Pick any item from our menu</span>
                    </li>
                     <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Choose your delivery frequency</span>
                    </li>
                     <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Set your own plan duration</span>
                    </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant='default'
                  onClick={handleCustomPlan}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Your Own Plan
                </Button>
              </CardFooter>
            </Card>
        )}

        {planTypeFilter === 'Postpaid' && filteredPlans.length === 0 && (
          <Card className="flex flex-col border-blue-500 ring-2 ring-blue-500">
            <div className="bg-blue-500 text-white text-center py-1 text-sm font-semibold rounded-t-lg">Apply for Postpaid</div>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Apply for Postpaid</CardTitle>
              <CardDescription className='pt-2'>
                Enjoy the convenience of monthly billing. A short application is required.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                  <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Pay at the end of the month</span>
                  </li>
                  <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Greater flexibility and higher limits</span>
                  </li>
                  <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Ideal for corporate or long-term clients</span>
                  </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => router.push('/plans/postpaid-signup')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

       <Card className="mt-16 bg-secondary">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Need a Corporate or Event Plan?</CardTitle>
          <CardDescription className="max-w-lg mx-auto">
            We offer customizable packages for events, corporate needs, or special dietary requirements. Get in touch to discuss your needs.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
            <Button>Contact Us for a Quote</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
