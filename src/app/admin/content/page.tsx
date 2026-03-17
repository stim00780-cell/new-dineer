// src/app/admin/content/page.tsx
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, PlusCircle, Edit, Trash2, GripVertical } from "lucide-react"
import { heroSlides, testimonials } from "@/lib/data"
import { useState } from "react"
import type { HeroSlide, Testimonial } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function ContentManagementPage() {
    const [slides, setSlides] = useState<HeroSlide[]>(heroSlides);
    const [reviews, setReviews] = useState<Testimonial[]>(testimonials);

    // In a real app, these handlers would call an API
    const handleAddSlide = () => console.log("Add new slide");
    const handleEditSlide = (id: string) => console.log("Edit slide", id);
    const handleDeleteSlide = (id: string) => setSlides(slides.filter(s => s.id !== id));

    const handleAddTestimonial = () => console.log("Add new testimonial");
    const handleEditTestimonial = (id: string) => console.log("Edit testimonial", id);
    const handleDeleteTestimonial = (id: string) => setReviews(reviews.filter(r => r.id !== id));


    return (
        <Tabs defaultValue="hero-slider">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hero-slider">Hero Slider</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            <TabsContent value="hero-slider">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Hero Slider Management</CardTitle>
                            <CardDescription>Manage the slides on the homepage hero section.</CardDescription>
                        </div>
                         <Button onClick={handleAddSlide}>
                            <PlusCircle className="mr-2" /> Add New Slide
                        </Button>
                    </CardHeader>
                    <CardContent>
                       <Table>
                           <TableHeader>
                               <TableRow>
                                   <TableHead></TableHead>
                                   <TableHead>Preview</TableHead>
                                   <TableHead>Title</TableHead>
                                   <TableHead>Subtitle</TableHead>
                                   <TableHead>Button Text & Link</TableHead>
                                   <TableHead>Actions</TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                               {slides.map(slide => (
                                   <TableRow key={slide.id}>
                                       <TableCell className="w-10 cursor-grab"><GripVertical /></TableCell>
                                       <TableCell>
                                           <Image src={slide.imageUrl} alt={slide.title} width={100} height={56} className="rounded-md object-cover" />
                                       </TableCell>
                                       <TableCell className="font-medium">{slide.title}</TableCell>
                                       <TableCell className="text-muted-foreground max-w-xs truncate">{slide.subtitle}</TableCell>
                                       <TableCell>
                                           <div>{slide.buttonText}</div>
                                           <div className="text-xs text-muted-foreground">{slide.buttonLink}</div>
                                       </TableCell>
                                       <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleEditSlide(slide.id)}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteSlide(slide.id)} className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                       </TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="testimonials">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                         <div>
                            <CardTitle>Testimonial Management</CardTitle>
                            <CardDescription>Manage customer testimonials shown on the homepage.</CardDescription>
                        </div>
                         <Button onClick={handleAddTestimonial}>
                            <PlusCircle className="mr-2" /> Add New Testimonial
                        </Button>
                    </CardHeader>
                    <CardContent>
                         <Table>
                           <TableHeader>
                               <TableRow>
                                   <TableHead>Avatar</TableHead>
                                   <TableHead>Name</TableHead>
                                   <TableHead>Text</TableHead>
                                   <TableHead>Actions</TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                               {reviews.map(testimonial => (
                                   <TableRow key={testimonial.id}>
                                        <TableCell>
                                           <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full object-cover" />
                                       </TableCell>
                                       <TableCell className="font-medium">{testimonial.name}</TableCell>
                                       <TableCell className="text-muted-foreground italic max-w-md truncate">"{testimonial.text}"</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleEditTestimonial(testimonial.id)}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteTestimonial(testimonial.id)} className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                       </TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
