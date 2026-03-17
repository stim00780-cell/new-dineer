// src/components/footer.tsx
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Twitter, Github, Linkedin, Send, Facebook, Instagram, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAppSettings } from '@/hooks/use-app-settings';
import type { SocialLink } from '@/hooks/use-app-settings';

const iconMap: { [key: string]: LucideIcon } = {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Github,
};


const Footer = () => {
  const { contactInfo, socialLinks } = useAppSettings();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16 md:mt-24">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Delicious meals, delivered on time. Experience the joy of hassle-free dining with our fresh and healthy options.
            </p>
            <div className="flex space-x-2">
              {socialLinks.filter(link => link.enabled).map(link => {
                const Icon = iconMap[link.name];
                return (
                  <Button key={link.name} variant="ghost" size="icon" asChild>
                    <Link href={link.url} aria-label={link.name} target="_blank" rel="noopener noreferrer">
                      {Icon && <Icon className="h-5 w-5" />}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="/plans" className="text-muted-foreground hover:text-primary transition-colors">Plans</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
               <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Email: {contactInfo.email}</li>
              <li>Phone: {contactInfo.phone}</li>
              <li>Address: {contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dinner O'Clock. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
