// src/app/admin/menu/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { menuItems } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import { MoreHorizontal, PlusCircle, Edit, Trash2, Star, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };
  
  const handleCreateNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  }

  const handleDelete = (id: string) => {
    setItems(items.filter(p => p.id !== id));
  };
  
  const handleToggleFeatured = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, isFeatured: !item.isFeatured } : item));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>
              Manage all dishes available in the restaurant.
            </CardDescription>
          </div>
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2" />
            Add New Item
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name & Tags</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                   <TableCell>
                       <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
                    </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags?.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{item.category}</Badge></TableCell>
                   <TableCell>€{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                      {item.isFeatured ? <Star className="h-5 w-5 text-accent" /> : <XCircle className="h-5 w-5 text-muted-foreground" />}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFeatured(item.id)}>
                            {item.isFeatured ? <XCircle className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
                            {item.isFeatured ? 'Remove from Featured' : 'Add to Featured'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={editingItem?.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="price">Price (€)</Label>
                    <Input id="price" type="number" defaultValue={editingItem?.price} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" defaultValue={editingItem?.category} />
                </div>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} defaultValue={editingItem?.description} />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" defaultValue={editingItem?.tags?.join(', ')} placeholder="e.g. Vegetarian, Spicy, Healthy" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" defaultValue={editingItem?.image} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" defaultChecked={editingItem?.isFeatured} />
              <Label htmlFor="featured">Featured Item</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsDialogOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
