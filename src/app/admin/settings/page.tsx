// src/app/admin/settings/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppSettings } from '@/hooks/use-app-settings';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2 } from 'lucide-react';
import type { DiscountTier, SocialLink } from '@/hooks/use-app-settings';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  const {
    isDirectOrderingEnabled,
    setDirectOrderingEnabled,
    showPreparationTime,
    setShowPreparationTime,
    isCustomPlanEnabled,
    setCustomPlanEnabled,
    customPlanSettings,
    setCustomPlanSettings,
    contactInfo,
    setContactInfo,
    socialLinks,
    setSocialLinks,
  } = useAppSettings();
  const { toast } = useToast();

  const handleTierChange = (index: number, field: keyof DiscountTier, value: string) => {
    const newTiers = [...customPlanSettings.discountTiers];
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      newTiers[index] = { ...newTiers[index], [field]: numericValue };
      setCustomPlanSettings({ ...customPlanSettings, discountTiers: newTiers });
    }
  };

  const addTier = () => {
    const newTiers = [...customPlanSettings.discountTiers, { amount: 0, discount: 0 }];
    setCustomPlanSettings({ ...customPlanSettings, discountTiers: newTiers });
  };

  const removeTier = (index: number) => {
    const newTiers = customPlanSettings.discountTiers.filter((_, i) => i !== index);
    setCustomPlanSettings({ ...customPlanSettings, discountTiers: newTiers });
  };
  
  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: any) => {
    const newLinks = [...socialLinks];
    (newLinks[index] as any)[field] = value;
    setSocialLinks(newLinks);
  }

  const handleSaveSettings = () => {
    // Here you would typically save to a backend.
    // For this demo, the state is already updated in the context.
    toast({
      title: 'Settings Saved',
      description: 'Your settings have been successfully updated.',
    });
  }


  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Tabs defaultValue="general">
            <TabsList className="w-full justify-start overflow-x-auto md:grid md:w-full md:grid-cols-5 md:overflow-x-hidden">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="custom-plan">Custom Plan</TabsTrigger>
                <TabsTrigger value="contact">Contact &amp; Socials</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                    <CardTitle>General App Settings</CardTitle>
                    <CardDescription>
                        Manage general settings for the customer-facing application.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>Enable Direct Ordering</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow users to add individual menu items to a cart.
                            </p>
                        </div>
                        <Switch
                        checked={isDirectOrderingEnabled}
                        onCheckedChange={setDirectOrderingEnabled}
                        />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>Show Preparation Time</Label>
                            <p className="text-sm text-muted-foreground">
                                Display estimated food preparation time on the menu.
                            </p>
                        </div>
                        <Switch
                        checked={showPreparationTime}
                        onCheckedChange={setShowPreparationTime}
                        />
                    </div>
                     <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>Enable "Build Your Own" Plan</Label>
                            <p className="text-sm text-muted-foreground">
                                Show the custom plan builder on the plans page.
                            </p>
                        </div>
                        <Switch
                        checked={isCustomPlanEnabled}
                        onCheckedChange={setCustomPlanEnabled}
                        />
                    </div>
                     <Separator />
                     <div className="space-y-2">
                        <Label>Maintenance Mode</Label>
                        <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 bg-background">
                            <p className="text-sm text-muted-foreground">
                                Temporarily disable the customer-facing app for maintenance.
                            </p>
                            <Button variant="outline">Enable</Button>
                        </div>
                    </div>
                    </CardContent>
                     <CardFooter>
                        <Button onClick={handleSaveSettings}>Save General Settings</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="custom-plan">
                <Card>
                    <CardHeader>
                        <CardTitle>Custom Plan Settings</CardTitle>
                        <CardDescription>
                            Configure the rules for the "Create Your Own Plan" feature.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="min-duration">Minimum Plan Duration (in days)</Label>
                            <Input 
                                id="min-duration" 
                                type="number" 
                                value={customPlanSettings.minDurationDays}
                                onChange={(e) => setCustomPlanSettings({...customPlanSettings, minDurationDays: Number(e.target.value)})}
                                className="w-[180px]"
                            />
                            <p className="text-sm text-muted-foreground">
                                The minimum number of days a user must select for a custom plan.
                            </p>
                        </div>
                        <Separator />
                         <div className="space-y-4">
                            <Label>Tiered Discounts</Label>
                            <p className="text-sm text-muted-foreground">
                                Offer discounts based on the total order value of the custom plan.
                            </p>
                            <div className="space-y-2">
                                {customPlanSettings.discountTiers.map((tier, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <p className="text-sm">If total is over €</p>
                                        <Input
                                            type="number"
                                            value={tier.amount}
                                            onChange={(e) => handleTierChange(index, 'amount', e.target.value)}
                                            className="w-24"
                                        />
                                        <p className="text-sm">, give a</p>
                                        <Input
                                            type="number"
                                            value={tier.discount}
                                            onChange={(e) => handleTierChange(index, 'discount', e.target.value)}
                                            className="w-20"
                                        />
                                        <p className="text-sm">% discount.</p>
                                        <Button variant="ghost" size="icon" onClick={() => removeTier(index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                             <Button variant="outline" size="sm" onClick={addTier}>Add Discount Tier</Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Custom Plan Settings</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="contact">
                 <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                           Manage the contact details and social media links for your website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="contact-email">Email Address</Label>
                                <Input 
                                    id="contact-email" 
                                    value={contactInfo.email}
                                    onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact-phone">Phone Number</Label>
                                <Input 
                                    id="contact-phone" 
                                    value={contactInfo.phone}
                                    onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-address">Address</Label>
                            <Textarea 
                                id="contact-address" 
                                value={contactInfo.address}
                                onChange={e => setContactInfo({...contactInfo, address: e.target.value})}
                                rows={3}
                            />
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <Label>Social Media Links</Label>
                             {socialLinks.map((link, index) => (
                                <div key={link.id} className="flex items-center gap-4">
                                    <Label className="w-20">{link.name}</Label>
                                    <Input 
                                        className="flex-1"
                                        value={link.url}
                                        onChange={e => handleSocialLinkChange(index, 'url', e.target.value)}
                                        disabled={!link.enabled}
                                    />
                                    <Switch
                                        checked={link.enabled}
                                        onCheckedChange={checked => handleSocialLinkChange(index, 'enabled', checked)}
                                    />
                                </div>
                             ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Contact Settings</Button>
                    </CardFooter>
                 </Card>
            </TabsContent>
            <TabsContent value="appearance">
                 <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                           Customize the look and feel of your storefront.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Logo</Label>
                            <Input type="file" />
                        </div>
                         <div className="space-y-2">
                            <Label>Primary Color</Label>
                            <Input type="color" defaultValue="#849474" />
                        </div>
                    </CardContent>
                 </Card>
            </TabsContent>
             <TabsContent value="advanced">
                 <Card>
                    <CardHeader>
                        <CardTitle>Advanced</CardTitle>
                        <CardDescription>
                            Advanced settings and dangerous actions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2 rounded-lg border border-destructive p-4">
                            <Label className="text-destructive">Reset Application Data</Label>
                             <p className="text-sm text-muted-foreground">
                                This will permanently delete all orders, users, and settings. This action cannot be undone.
                            </p>
                            <Button variant="destructive">Reset Data</Button>
                        </div>
                    </CardContent>
                 </Card>
             </TabsContent>
        </Tabs>
    </div>
  );
}
