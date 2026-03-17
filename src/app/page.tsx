// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { menuItems, howItWorks, testimonials, heroSlides, blogPosts, plans } from '@/lib/data';
import { ArrowRight, UtensilsCrossed, Star, Package, Utensils, Zap, MapPin, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { AIChatbot } from '@/components/ai-chatbot';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useAppSettings } from '@/hooks/use-app-settings';
import type { MenuItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


const icons: { [key: string]: LucideIcon } = {
  Package,
  Utensils,
  Zap,
};

export default function Home() {
  const featuredDishes = menuItems.filter(item => item.isFeatured).slice(0, 4);
  const featuredPlans = plans.filter(plan => plan.isFeatured).slice(0, 3);
  const recentPosts = blogPosts.filter(p => p.status === 'Published').slice(0, 3);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isDirectOrderingEnabled } = useAppSettings();

  const handleAddToCart = (dish: MenuItem) => {
      addToCart(dish.id);
      toast({
          title: "Added to Cart!",
          description: `${dish.name} has been added to your cart.`,
      })
  }
  
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <Carousel
          opts={{ loop: true }}
          className="absolute inset-0 w-full h-full"
          plugins={[
            Autoplay({ delay: 5000, stopOnInteraction: false }),
          ]}
        >
          <CarouselContent className="h-full">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-full">
                <div className="relative h-full w-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    data-ai-hint={slide.imageHint}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                     {slide.category && <Badge className="mb-2" variant="secondary">{slide.category}</Badge>}
                    <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href={slide.buttonLink}>
                        {slide.buttonText} <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-2 text-lg text-muted-foreground">A simple path to delicious meals.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {howItWorks.map((step) => {
            const Icon = icons[step.icon];
            return (
              <Card key={step.id} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {Icon && <Icon size={32} />}
                  </div>
                  <CardTitle className="font-headline text-2xl pt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className='text-center md:text-left'>
              <h2 className="font-headline text-4xl md:text-5xl">Featured Dishes</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Handpicked by our chefs, loved by our customers.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0 self-center md:self-auto">
              <Link href="/menu">
                View Full Menu <UtensilsCrossed className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden group">
                <div className="relative h-48 w-full">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    data-ai-hint={dish.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-headline text-xl">{dish.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1 h-10 overflow-hidden">
                    {dish.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-primary">€{dish.price.toFixed(2)}</p>
                    {isDirectOrderingEnabled && (
                       <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={() => handleAddToCart(dish)}>
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
       <section className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl">Choose Your Perfect Plan</h2>
          <p className="mt-2 text-lg text-muted-foreground">Flexible plans designed for your lifestyle.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {featuredPlans.map((plan) => (
             <Card key={plan.id} className={cn("flex flex-col", plan.isFeatured ? 'border-primary ring-2 ring-primary' : '')}>
               {plan.isFeatured && (
                 <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-semibold rounded-t-lg">Most Popular</div>
              )}
               <CardHeader className="text-center">
                 <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
                 <CardContent>
                    <span className="font-headline text-4xl text-foreground">€{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration.toLocaleLowerCase()}</span>
                 </CardContent>
               </CardHeader>
               <CardContent className="flex-grow">
                 <ul className="space-y-3">
                   {plan.features.slice(0, 3).map((feature, i) => (
                     <li key={i} className="flex items-start">
                       <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                       <span className="text-muted-foreground">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </CardContent>
               <CardFooter>
                 <Button asChild className="w-full" variant={plan.isFeatured ? 'default' : 'outline'}>
                   <Link href="/plans">Subscribe Now</Link>
                 </Button>
               </CardFooter>
             </Card>
          ))}
        </div>
         <div className="text-center mt-8">
            <Button asChild variant="link">
                <Link href="/plans">View All Plans <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-4xl md:text-5xl">What Our Customers Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">Your satisfaction is our success.</p>
          </div>
          <Carousel
            className="w-full max-w-4xl mx-auto mt-12"
            opts={{ align: 'start', loop: true }}
            plugins={[
              Autoplay({ delay: 4000, stopOnInteraction: true }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2">
                  <div className="p-4">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-4 border-4 border-primary/20">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-1 text-accent mb-2">
                          {[...Array(5)].map((_, i) => <Star key={i} className='w-4 h-4 fill-current' />)}
                        </div>
                        <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                        <h4 className="font-headline text-lg mt-4">{testimonial.name}</h4>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

       {/* Blog Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl">From Our Blog</h2>
          <p className="mt-2 text-lg text-muted-foreground">Latest news, tips, and stories from our kitchen.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <Card key={post.id} className="overflow-hidden group">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground text-sm">By {post.author} on {post.date}</p>
              </CardContent>
              <CardFooter>
                   <Button asChild variant="link" className="p-0">
                      <Link href={`/blog/${post.id}`}>Read More <ArrowRight className="ml-2" /></Link>
                   </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>


       {/* Location Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="font-headline text-4xl md:text-5xl">Our Location</h2>
                  <p className="mt-4 text-lg text-muted-foreground">Come visit us or get your meals delivered hot and fresh.</p>
                  <div className="mt-6 space-y-4">
                      <div className="flex items-start gap-4">
                          <MapPin className="h-6 w-6 text-primary mt-1" />
                          <div>
                              <h3 className="font-semibold">Address</h3>
                              <p className="text-muted-foreground">123 Foodie Lane, Flavor Town, 12345</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617544258387!2d-73.9878466845941!3d40.74844097932808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628 Empire State Building" 
                      width="100%" 
                      height="100%" 
                      style={{border:0}} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps Location"
                  ></iframe>
              </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl">Ready for a Delicious Change?</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Choose a plan that fits your lifestyle and let us handle the cooking.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/plans">
              View Meal Plans
            </Link>
          </Button>
        </div>
      </section>
      <AIChatbot />
    </div>
  );
}
