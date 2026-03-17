// src/app/admin/analytics/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Users, DollarSign, ShoppingBag, ArrowUpRight, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string, value: string, icon: React.ElementType, change: string, changeType: 'increase' | 'decrease' }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className={`h-4 w-4 mr-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`} />
                {change}
            </p>
        </CardContent>
    </Card>
);


export default function AnalyticsPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Analytics</h1>
                 <div className="flex items-center space-x-2">
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            id="date"
                            variant={"outline"}
                            className="w-[300px] justify-start text-left font-normal"
                            >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                                ) : (
                                format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <Select defaultValue="overview">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="overview">Overview</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="users">User Behavior</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><Filter className="mr-2" /> More Filters</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Visitors" value="12,402" icon={Users} change="+15.2% from last month" changeType="increase" />
                <StatCard title="Total Revenue" value="€84,120" icon={DollarSign} change="+22.1% from last month" changeType="increase" />
                <StatCard title="Conversion Rate" value="4.8%" icon={ShoppingBag} change="-0.5% from last month" changeType="decrease" />
                <StatCard title="Avg. Order Value" value="€68.50" icon={DollarSign} change="+3.2% from last month" changeType="increase" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                        <CardDescription>
                            Showing revenue for the selected period.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] flex items-center justify-center">
                       <LineChart className="h-32 w-32 text-muted-foreground/20" />
                       <p className="text-muted-foreground">Chart data will be here</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Top Traffic Sources</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px] flex items-center justify-center">
                        <PieChart className="h-32 w-32 text-muted-foreground/20" />
                        <p className="text-muted-foreground">Chart data will be here</p>
                    </CardContent>
                </Card>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Most Viewed Menu Items</CardTitle>
                    </CardHeader>
                     <CardContent className="h-[300px] flex items-center justify-center">
                       <BarChart className="h-24 w-24 text-muted-foreground/20" />
                       <p className="text-muted-foreground">Chart data will be here</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>User Signups</CardTitle>
                    </CardHeader>
                     <CardContent className="h-[300px] flex items-center justify-center">
                       <LineChart className="h-24 w-24 text-muted-foreground/20" />
                       <p className="text-muted-foreground">Chart data will be here</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Device Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                        <PieChart className="h-24 w-24 text-muted-foreground/20" />
                        <p className="text-muted-foreground">Chart data will be here</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
