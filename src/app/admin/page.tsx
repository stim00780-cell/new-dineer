// src/app/admin/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  Users,
  ShoppingBag,
  Activity,
  Star,
  FileText,
} from 'lucide-react';

const kpis = [
  { title: 'Total Revenue', value: '€45,231.89', icon: DollarSign, change: '+20.1% from last month' },
  { title: 'Subscriptions', value: '+2350', icon: Users, change: '+180.1% from last month' },
  { title: 'Total Orders', value: '+12,234', icon: ShoppingBag, change: '+19% from last month' },
  { title: 'Pending Applications', value: '12', icon: FileText, change: '+5 since yesterday' },
  { title: 'Pending Reviews', value: '5', icon: Star, change: '2 new today' },
  { title: 'Active Users', value: '573', icon: Activity, change: '+201 since last hour' },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <BarChart className="h-24 w-24 text-muted-foreground/20" />
            <p className="text-muted-foreground">Chart data will be here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions by Plan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <PieChart className="h-24 w-24 text-muted-foreground/20" />
             <p className="text-muted-foreground">Chart data will be here</p>
          </CardContent>
        </Card>
       </div>
    </div>
  );
}
