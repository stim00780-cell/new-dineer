// src/app/blog/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">Our Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Tips, stories, and updates from the Dinner O'Clock kitchen.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.filter(p => p.status === 'Published').map(post => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl hover:text-primary transition-colors">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                </div>
                 <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-muted-foreground flex-grow">
                A brief excerpt of the blog post would go here. This is placeholder text to demonstrate the layout of the blog listing page.
              </p>
              <Button asChild variant="link" className="p-0 mt-4 self-start">
                <Link href={`/blog/${post.id}`}>
                  Read More <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
