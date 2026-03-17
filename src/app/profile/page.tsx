'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { orders, demoUser } from '@/lib/data';
import { LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import type { Subscription } from '@/lib/types';


export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const userOrders = orders.filter((order) => order.customer === user.name);
  // Using demoUser's subscription for display as user from auth doesn't have it.
  const userSubscriptions: Subscription[] = demoUser.subscriptions || [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-headline text-4xl md:text-5xl">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="subscription">My Subscription</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={user.phone} />
                </div>
              </div>
               <Separator />
               <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" defaultValue={user.address?.street} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue={user.address?.city} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" defaultValue={user.address?.postalCode} />
                    </div>
                   </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Here is a list of your most recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className='font-medium'>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>€{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge>{order.status}</Badge>
                      </TableCell>
                       <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subscription" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>My Subscription</CardTitle>
                    <CardDescription>Manage your current meal plan subscription.</CardDescription>
                </CardHeader>
                 <CardContent>
                    {userSubscriptions.length > 0 ? (
                        userSubscriptions.map(sub => (
                            <div key={sub.id} className="border p-4 rounded-lg">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div>
                                        <p className="font-headline text-xl">{sub.planName}</p>
                                        <p className="text-muted-foreground text-sm">€{sub.price}/month</p>
                                    </div>
                                    <Badge variant={sub.status === 'Active' ? 'default' : 'secondary'} className='mt-2 sm:mt-0 w-fit'>{sub.status}</Badge>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center text-sm">
                                   <p className="text-muted-foreground">Next billing on: <span className="font-medium text-foreground">{sub.nextBilling}</span></p>
                                   <Button variant="outline" className="mt-4 sm:mt-0">Manage Subscription</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">You don't have any active subscriptions.</p>
                            <Button className="mt-4" onClick={() => router.push('/plans')}>Explore Plans</Button>
                        </div>
                    )}
                 </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="settings" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-6">
                   <div>
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                           <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                        </div>
                   </div>
                    <Separator />
                     <div>
                        <h3 className="text-lg font-medium">Notification Settings</h3>
                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <p className="text-sm font-medium">Order Updates</p>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-3">
                                <p className="text-sm font-medium">Promotional Emails</p>
                                <Switch />
                            </div>
                        </div>
                   </div>
                   <Separator />
                    <div>
                        <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                         <div className="mt-2 flex items-center justify-between rounded-lg border border-destructive/50 p-3">
                            <div>
                                <p className="text-sm font-medium">Log Out</p>
                                <p className="text-xs text-muted-foreground">End your current session.</p>
                            </div>
                            <Button variant="destructive" onClick={logout}><LogOut className="mr-2 h-4 w-4" /> Log Out</Button>
                         </div>
                    </div>
                 </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
