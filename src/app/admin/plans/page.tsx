// src/app/admin/plans/page.tsx
'use client';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { plans as initialPlans } from '@/lib/data';
import type { Plan, DailyMeal } from '@/lib/types';
import { PlusCircle, Edit, Trash2, Check, X, Ban, Save, Utensils, Soup, Salad } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PlanForm = ({ plan, onSave, onCancel }: { plan: Partial<Plan> | null, onSave: (plan: Plan) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Plan>>(
        plan || {
            name: '',
            price: 0,
            type: 'Prepaid',
            duration: 'Weekly',
            startDelay: '',
            deliverySchedule: '',
            status: 'Active',
            isFeatured: false,
            features: [],
            dailyMenu: Array.from({ length: 7 }, (_, i) => ({
                day: i + 1,
                meals: { breakfast: '', lunch: '', dinner: '' }
            }))
        }
    );

    useEffect(() => {
        if (plan) {
            const fullDailyMenu = Array.from({ length: 7 }, (_, i) => {
                const existingDay = plan.dailyMenu?.find(d => d.day === i + 1);
                return existingDay || { day: i + 1, meals: { breakfast: '', lunch: '', dinner: '' } };
            });
            setFormData({ ...plan, dailyMenu: fullDailyMenu });
        }
    }, [plan]);

    const handleChange = (field: keyof Plan, value: any) => {
        setFormData(prev => ({...prev, [field]: value}));
    }

    const handleMealChange = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', value: string) => {
        const newDailyMenu = [...(formData.dailyMenu || [])];
        if (!newDailyMenu[dayIndex]) {
            newDailyMenu[dayIndex] = { day: dayIndex + 1, meals: {} };
        }
        (newDailyMenu[dayIndex].meals as any)[mealType] = value;
        handleChange('dailyMenu', newDailyMenu);
    };

    const handleSave = () => {
        if (!formData.name || formData.price! <= 0) {
            alert('Plan Name and a valid Price are required.');
            return;
        }
        onSave(formData as Plan);
    }
    
    return (
        <div className="p-4 my-4 border bg-muted rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">{plan?.id ? 'Edit Plan' : 'Create New Plan'}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="planName">Plan Name</Label>
                    <Input id="planName" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="planPrice">Price (€)</Label>
                    <Input id="planPrice" type="number" value={formData.price} onChange={(e) => handleChange('price', Number(e.target.value))} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="planDuration">Duration</Label>
                    <Input id="planDuration" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="planStartDelay">Start Delay</Label>
                    <Input id="planStartDelay" value={formData.startDelay} onChange={(e) => handleChange('startDelay', e.target.value)} placeholder="e.g. Starts in 1-2 days" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="planDeliverySchedule">Delivery Schedule</Label>
                    <Input id="planDeliverySchedule" value={formData.deliverySchedule} onChange={(e) => handleChange('deliverySchedule', e.target.value)} placeholder="e.g. 12pm-2pm Daily" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="planType">Type</Label>
                     <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                        <SelectTrigger id="planType">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Prepaid">Prepaid</SelectItem>
                            <SelectItem value="Postpaid">Postpaid</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="planStatus">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                        <SelectTrigger id="planStatus">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-end pb-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="planFeatured" checked={formData.isFeatured} onCheckedChange={(checked) => handleChange('isFeatured', !!checked)} />
                        <Label htmlFor="planFeatured">Featured Plan</Label>
                    </div>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="planFeatures">Features (comma-separated)</Label>
                <Input id="planFeatures" value={formData.features?.join(', ')} onChange={(e) => handleChange('features', e.target.value.split(',').map(s => s.trim()))} />
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="daily-menu">
                    <AccordionTrigger>Daily Meal Schedule</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            {formData.dailyMenu?.map((day, dayIndex) => (
                                <div key={day.day} className="p-3 border rounded-md">
                                    <h4 className="font-medium mb-2">Day {day.day}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor={`day-${day.day}-bf`} className="text-xs flex items-center gap-1"><Salad className="h-3 w-3" /> Breakfast</Label>
                                            <Input id={`day-${day.day}-bf`} value={day.meals.breakfast || ''} onChange={(e) => handleMealChange(dayIndex, 'breakfast', e.target.value)} placeholder="e.g. Avocado Toast"/>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`day-${day.day}-lunch`} className="text-xs flex items-center gap-1"><Soup className="h-3 w-3" /> Lunch</Label>
                                            <Input id={`day-${day.day}-lunch`} value={day.meals.lunch || ''} onChange={(e) => handleMealChange(dayIndex, 'lunch', e.target.value)} placeholder="e.g. Chicken Salad" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`day-${day.day}-dinner`} className="text-xs flex items-center gap-1"><Utensils className="h-3 w-3" /> Dinner</Label>
                                            <Input id={`day-${day.day}-dinner`} value={day.meals.dinner || ''} onChange={(e) => handleMealChange(dayIndex, 'dinner', e.target.value)} placeholder="e.g. Salmon Teriyaki"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={onCancel}><Ban className="mr-2 h-4 w-4" /> Cancel</Button>
                <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Plan</Button>
            </div>
        </div>
    )
}


export default function PlansManagementPage() {
  const [planList, setPlanList] = useState<Plan[]>(() => initialPlans);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSave = (planToSave: Plan) => {
    if(planToSave.id && editingPlanId) {
        // Update existing plan
        setPlanList(planList.map(p => p.id === planToSave.id ? planToSave : p));
        setEditingPlanId(null);
    } else {
        // Create new plan
        const newPlan = { ...planToSave, id: `PLAN-${Date.now()}` };
        setPlanList([newPlan, ...planList]);
        setIsCreatingNew(false);
    }
  }

  const handleDelete = (id: string) => {
    setPlanList(planList.filter(p => p.id !== id));
  };

  const getStatusVariant = (status?: 'Active' | 'Inactive') => {
    if (status === 'Active') return 'default';
    if (status === 'Inactive') return 'secondary';
    return 'outline';
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Meal Plan Management</CardTitle>
          <CardDescription>
            Create, edit, and manage all meal plans available for subscription.
          </CardDescription>
        </div>
        <Button onClick={() => { setIsCreatingNew(true); setEditingPlanId(null); }}>
          <PlusCircle className="mr-2" />
          Create New Plan
        </Button>
      </CardHeader>
      <CardContent>
        {isCreatingNew && (
            <PlanForm plan={null} onSave={handleSave} onCancel={() => setIsCreatingNew(false)} />
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Start Delay</TableHead>
              <TableHead>Delivery Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planList.map((plan) => (
              <React.Fragment key={plan.id}>
                <TableRow>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>€{plan.price.toFixed(2)}</TableCell>
                  <TableCell>{plan.duration ?? 'N/A'}</TableCell>
                  <TableCell>{plan.startDelay ?? 'N/A'}</TableCell>
                  <TableCell>{plan.deliverySchedule ?? 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(plan.status)}>{plan.status ?? 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>
                    {plan.isFeatured ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-muted-foreground" />}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => { setEditingPlanId(plan.id); setIsCreatingNew(false); }}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(plan.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {editingPlanId === plan.id && (
                    <TableRow>
                        <TableCell colSpan={8}>
                            <PlanForm plan={plan} onSave={handleSave} onCancel={() => setEditingPlanId(null)} />
                        </TableCell>
                    </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
