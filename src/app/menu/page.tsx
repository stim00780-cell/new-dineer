
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { menuItems, menuCategories } from '@/lib/data';
import { Search, UtensilsCrossed, ChefHat, Salad, Soup, type LucideIcon, Clock } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { MenuItem } from '@/lib/types';
import { useAppSettings } from '@/hooks/use-app-settings';
import { Badge } from '@/components/ui/badge';


const menuIcons: { [key: string]: LucideIcon } = {
  UtensilsCrossed,
  ChefHat,
  Salad,
  Soup,
};

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isDirectOrderingEnabled, showPreparationTime } = useAppSettings();

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item.id);
    toast({
      title: 'Added to cart!',
      description: `${item.name} has been added to your cart.`,
    });
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">Our Menu</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A culinary journey with dishes crafted from the freshest ingredients.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Search for a dish..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue="All" className="w-full mt-8">
        <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 md:grid-cols-4">
            {menuCategories.map(category => {
              const Icon = menuIcons[category.icon];
              return (
                <TabsTrigger key={category.name} value={category.name}>
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {category.name}
                </TabsTrigger>
              )
            })}
            </TabsList>
        </div>

        {menuCategories.map(category => (
            <TabsContent key={category.name} value={category.name}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {filteredMenuItems
                    .filter(item => category.name === 'All' || item.category === category.name)
                    .map(item => (
                    <Card key={item.id} className="overflow-hidden group flex flex-col">
                        <div className="relative h-48 w-full">
                        <Image
                            src={item.image}
                            alt={item.name}
                            data-ai-hint={item.imageHint}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        </div>
                        <CardContent className="p-4 flex flex-col flex-grow">
                          <h3 className="font-headline text-xl">{item.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags?.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                          </div>
                          {showPreparationTime && item.preparationTime && (
                            <Badge variant="secondary" className="mt-2 w-fit">
                                <Clock className="mr-1.5 h-3 w-3" />
                                {item.preparationTime}
                            </Badge>
                          )}
                          <p className="text-muted-foreground text-sm mt-2 flex-grow">
                              {item.description}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                              <p className="text-lg font-bold text-primary">€{item.price.toFixed(2)}</p>
                              {isDirectOrderingEnabled && (
                                <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                              )}
                          </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
