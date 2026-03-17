// src/app/admin/reviews/page.tsx
'use client';
import { useState } from 'react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { reviews } from '@/lib/data';
import type { Review } from '@/lib/types';
import { MoreHorizontal, Check, X, Star } from 'lucide-react';

export default function ReviewsManagementPage() {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const handleStatusChange = (id: string, status: 'Approved' | 'Pending') => {
    setReviewList(
      reviewList.map((review) => (review.id === id ? { ...review, status } : review))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        <CardDescription>
          Approve or reject customer reviews for public display.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewList.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.customerName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-sm truncate">{review.comment}</TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <Badge variant={review.status === 'Approved' ? 'default' : 'secondary'}>
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStatusChange(review.id, 'Approved')}>
                        <Check className="mr-2 h-4 w-4" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(review.id, 'Pending')}>
                        <X className="mr-2 h-4 w-4" /> Reject (Mark as Pending)
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
  );
}
