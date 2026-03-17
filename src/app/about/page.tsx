import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Award, ChefHat, Heart, Leaf } from 'lucide-react';


const teamMembers = [
  { name: 'John Doe', role: 'Head Chef', image: PlaceHolderImages.find(p => p.id === 'testimonial-2')?.imageUrl!, imageHint: 'smiling man' },
  { name: 'Jane Smith', role: 'Lead Nutritionist', image: PlaceHolderImages.find(p => p.id === 'testimonial-1')?.imageUrl!, imageHint: 'happy woman' },
  { name: 'Peter Jones', role: 'Operations Manager', image: PlaceHolderImages.find(p => p.id === 'testimonial-3')?.imageUrl!, imageHint: 'woman portrait' },
];

const values = [
    { icon: <Leaf className="h-8 w-8 text-primary" />, title: "Freshness First", description: "We source the finest local ingredients to ensure every meal is fresh and flavorful." },
    { icon: <Heart className="h-8 w-8 text-primary" />, title: "Made with Love", description: "Our chefs pour their passion and expertise into every dish they create." },
    { icon: <Award className="h-8 w-8 text-primary" />, title: "Uncompromising Quality", description: "From our kitchen to your table, we maintain the highest standards of quality and hygiene." },
]

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">About Dinner O'Clock</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We believe that great food brings people together. Our mission is to make delicious, healthy, and convenient meals accessible to everyone.
        </p>
      </div>

      {aboutImage && (
        <div className="mt-12 relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            data-ai-hint={aboutImage.imageHint}
            fill
            className="object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <section className="mt-16 md:mt-24">
        <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl">Our Core Values</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(value => (
                <Card key={value.title} className='text-center'>
                    <CardContent className="p-6">
                        <div className="flex justify-center mb-4">{value.icon}</div>
                        <h3 className="font-headline text-2xl">{value.title}</h3>
                        <p className="mt-2 text-muted-foreground">{value.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl">Meet the Team</h2>
          <p className="mt-2 text-lg text-muted-foreground">The passionate individuals behind your favorite meals.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <Card key={member.name} className="group overflow-hidden text-center">
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  data-ai-hint={member.imageHint}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-headline text-xl">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
