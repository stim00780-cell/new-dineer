// src/app/contact/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAppSettings } from '@/hooks/use-app-settings';

export default function ContactPage() {
  const { contactInfo } = useAppSettings();
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">Get In Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a message</CardTitle>
            <CardDescription>Our team will get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <h2 className="font-headline text-3xl">Contact Information</h2>
            <div className="space-y-4 text-lg">
                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">{contactInfo.email}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">{contactInfo.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">{contactInfo.address}</p>
                    </div>
                </div>
            </div>
             <div className="aspect-video w-full rounded-lg overflow-hidden border">
                {/* Google Maps Embed Placeholder */}
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be here</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
