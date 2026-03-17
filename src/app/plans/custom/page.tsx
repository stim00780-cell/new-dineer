// src/app/plans/custom/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { menuItems } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, PlusCircle, Search, Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSettings } from '@/hooks/use-app-settings';
import { format, differenceInDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 'Step 1', name: 'Select Duration' },
  { id: 'Step 2', name: 'Choose Your Meals' },
  { id: 'Step 3', name: 'Review & Confirm' },
];

const mealTypes = ['Breakfast', 'Lunch', 'Dinner'] as const;
type MealType = typeof mealTypes[number];

type SelectedMeals = Record<string, Record<MealType, MenuItem | null>>;

const MealSlot = ({ day, mealType, meal, onSelect }: { day: string; mealType: MealType; meal: MenuItem | null; onSelect: () => void }) => {
  return (
    <div className="border rounded-lg p-2 space-y-1">
      <p className="text-xs font-semibold text-muted-foreground">{mealType}</p>
      <div 
        className="h-20 flex flex-col items-center justify-center rounded-md border-2 border-dashed cursor-pointer hover:border-primary hover:bg-muted transition-colors"
        onClick={onSelect}
      >
        {meal ? (
          <div className="text-center">
            <Image src={meal.image} alt={meal.name} width={32} height={32} className="rounded-sm object-cover mx-auto mb-1" />
            <p className="text-xs font-medium leading-tight">{meal.name}</p>
          </div>
        ) : (
          <div className="text-center text-xs text-muted-foreground">
            <PlusCircle className="h-4 w-4 mx-auto mb-1" />
            Select Meal
          </div>
        )}
      </div>
    </div>
  )
};

const MealSelectionDialog = ({ open, onOpenChange, onSelectMeal, allTags }: { open: boolean; onOpenChange: (open: boolean) => void; onSelectMeal: (meal: MenuItem) => void, allTags: string[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const filteredMeals = useMemo(() => {
        return menuItems.filter(meal => 
            meal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedTags.length === 0 || selectedTags.every(tag => meal.tags?.includes(tag)))
        )
    }, [searchTerm, selectedTags]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Select a Meal</DialogTitle>
                    <DialogDescription>Browse and filter our full menu to find the perfect dish.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                        <h3 className="text-sm font-semibold mb-2">Filter by Tags</h3>
                        <ScrollArea className="h-48 md:h-96">
                            <div className="flex flex-col gap-2 pr-4">
                                {allTags.map(tag => (
                                    <Button 
                                        key={tag} 
                                        variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => toggleTag(tag)}
                                        className="w-full justify-start"
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search meals..." 
                                className="pl-10" 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="h-96">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pr-4">
                                {filteredMeals.map(meal => (
                                    <Card 
                                        key={meal.id} 
                                        className="cursor-pointer hover:shadow-md transition-shadow" 
                                        onClick={() => { onSelectMeal(meal); onOpenChange(false); }}
                                    >
                                        <CardContent className="p-2 text-center">
                                            <Image src={meal.image} alt={meal.name} width={80} height={80} className="w-full h-20 object-cover rounded-md mb-2" />
                                            <p className="text-sm font-medium leading-tight">{meal.name}</p>
                                            <p className="text-xs text-muted-foreground">€{meal.price.toFixed(2)}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function CustomPlanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeals>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<{day: string, mealType: MealType} | null>(null);
  
  const router = useRouter();
  const { toast } = useToast();
  const { customPlanSettings } = useAppSettings();
  const { minDurationDays, discountTiers } = customPlanSettings;

  const { dates, totalPrice, discount, finalPrice } = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
        return { dates: [], totalPrice: 0, discount: 0, finalPrice: 0 };
    }
    const datesArray: Date[] = [];
    let currentDate = new Date(dateRange.from);
    while (currentDate <= dateRange.to) {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    let price = 0;
    Object.values(selectedMeals).forEach(dayMeals => {
        Object.values(dayMeals).forEach(meal => {
            if (meal) price += meal.price;
        })
    })

    const applicableTier = [...discountTiers]
        .sort((a, b) => b.amount - a.amount)
        .find(tier => price >= tier.amount);

    const discountPercentage = applicableTier ? applicableTier.discount : 0;
    const discountAmount = (price * discountPercentage) / 100;
    const finalPriceAmount = price - discountAmount;

    return { dates: datesArray, totalPrice: price, discount: discountAmount, finalPrice: finalPriceAmount };

  }, [dateRange, selectedMeals, discountTiers]);


  const allTags = useMemo(() => {
    const tags = new Set<string>();
    menuItems.forEach(item => item.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  useEffect(() => {
    const initialMeals: SelectedMeals = {};
    dates.forEach(date => {
        const dateString = format(date, 'yyyy-MM-dd');
        initialMeals[dateString] = {
            Breakfast: selectedMeals[dateString]?.Breakfast || null,
            Lunch: selectedMeals[dateString]?.Lunch || null,
            Dinner: selectedMeals[dateString]?.Dinner || null,
        }
    })
    setSelectedMeals(initialMeals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates.length]);

  const handleNext = () => {
    if (currentStep === 0) {
        const diff = dateRange?.to && dateRange?.from ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0;
        if (diff < minDurationDays) {
            toast({
                variant: 'destructive',
                title: 'Invalid Duration',
                description: `You must select a plan duration of at least ${minDurationDays} days.`
            })
            return;
        }
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  }
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleOpenDialog = (day: string, mealType: MealType) => {
    setActiveSlot({ day, mealType });
    setIsDialogOpen(true);
  }

  const handleSelectMeal = (meal: MenuItem) => {
    if (activeSlot) {
        setSelectedMeals(prev => ({
            ...prev,
            [activeSlot.day]: {
                ...prev[activeSlot.day],
                [activeSlot.mealType]: meal,
            }
        }))
    }
  }
  
  const progress = (currentStep / (steps.length -1)) * 100;
  
  if(currentStep === steps.length) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 flex justify-center">
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <CardTitle className="font-headline text-3xl mt-4">Plan Ready for Checkout!</CardTitle>
                <CardDescription>Your custom meal plan has been saved.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-lg">Total Price: <span className="font-bold text-primary">€{finalPrice.toFixed(2)}</span></p>
                {discount > 0 && <p className="text-sm text-green-600">You saved €{discount.toFixed(2)} with our volume discount!</p>}
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button className="w-full max-w-xs">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full max-w-xs" onClick={() => router.push('/plans')}>Back to Plans</Button>
            </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="font-headline text-4xl md:text-5xl text-primary">Create Your Own Plan</h1>
            <p className="mt-2 text-lg text-muted-foreground">Build a meal plan that perfectly fits your taste and lifestyle.</p>
        </div>
        <div className="mb-8">
            <Progress value={progress} className="mb-2" />
            <ol className="flex justify-between">
              {steps.map((step, index) => (
                <li key={step.id} className={cn("text-sm font-medium", currentStep >= index ? 'text-primary' : 'text-muted-foreground')}>
                  {step.name}
                </li>
              ))}
            </ol>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>{steps[currentStep].name}</CardTitle>
                {currentStep === 0 && <CardDescription>Select the start and end date for your meal plan. Minimum duration is {minDurationDays} days.</CardDescription>}
                {currentStep === 1 && <CardDescription>Click on a slot to select a meal for that day and time.</CardDescription>}
                {currentStep === 2 && <CardDescription>Review your custom plan and proceed to checkout.</CardDescription>}
            </CardHeader>
            <CardContent className="min-h-[500px]">
                {currentStep === 0 && (
                    <div className="flex flex-col items-center gap-8 pt-8">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            disabled={{ before: new Date() }}
                        />
                    </div>
                )}
                {currentStep === 1 && (
                     <ScrollArea className="h-[60vh]">
                        <div className="space-y-6 pr-4">
                            {dates.length > 0 ? dates.map(date => {
                                const dateString = format(date, 'yyyy-MM-dd');
                                return (
                                    <div key={dateString}>
                                        <h3 className="text-lg font-semibold border-b pb-2 mb-2">{format(date, 'EEEE, LLL d')}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {mealTypes.map(mealType => (
                                                <MealSlot 
                                                    key={mealType}
                                                    day={dateString}
                                                    mealType={mealType}
                                                    meal={selectedMeals[dateString]?.[mealType]}
                                                    onSelect={() => handleOpenDialog(dateString, mealType)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full min-h-[300px]">
                                    <AlertCircle className="w-12 h-12 text-muted-foreground mb-4"/>
                                    <p className="font-semibold">No Dates Selected</p>
                                    <p className="text-muted-foreground">Go back to the previous step to select your plan duration.</p>
                                </div>
                            )}
                        </div>
                     </ScrollArea>
                )}
                 {currentStep === 2 && (
                    <div className="space-y-6">
                        <ScrollArea className="h-[50vh]">
                            <div className="space-y-4 pr-4">
                            {dates.map(date => {
                                const dateString = format(date, 'yyyy-MM-dd');
                                const dayMeals = selectedMeals[dateString];
                                if (!dayMeals || Object.values(dayMeals).every(m => m === null)) return null;
                                
                                return (
                                    <div key={dateString}>
                                        <h4 className="font-bold text-lg border-b pb-1 mb-2">{format(date, 'EEEE, LLL d')}</h4>
                                        <ul className="list-disc list-inside text-muted-foreground grid grid-cols-1 md:grid-cols-3 gap-2">
                                            {mealTypes.map(type => {
                                                const meal = dayMeals[type];
                                                return meal ? <li key={type}><span className="font-semibold text-foreground">{type}:</span> {meal.name} (€{meal.price.toFixed(2)})</li> : null
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                            </div>
                        </ScrollArea>
                        <Separator className="my-6" />
                        <div className="text-right space-y-2">
                           <p className="text-xl">Subtotal: €{totalPrice.toFixed(2)}</p>
                           {discount > 0 && <p className="text-lg text-green-600">Discount: -€{discount.toFixed(2)}</p>}
                           <p className="text-2xl font-bold">Total: <span className="text-primary">€{finalPrice.toFixed(2)}</span></p>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6 mt-4">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
                     {currentStep === steps.length - 1 ? 'Finish & Create Plan' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
      </div>

       <MealSelectionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSelectMeal={handleSelectMeal} allTags={allTags} />
    </div>
  );
}
