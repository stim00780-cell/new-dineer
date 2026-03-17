// src/app/admin/applications/page.tsx
'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { applications as initialApplications } from '@/lib/data';
import type { Application } from '@/lib/types';
import Link from 'next/link';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(() => initialApplications);
  const [decliningApp, setDecliningApp] = useState<Application | null>(null);
  const [declineReason, setDeclineReason] = useState('');

  const getStatusVariant = (status: 'Pending' | 'Approved' | 'Declined') => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Declined':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleApprove = (appId: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === appId ? { ...app, status: 'Approved', declineReason: undefined } : app
      )
    );
  };

  const startDecline = (app: Application) => {
    setDecliningApp(app);
    setDeclineReason('');
  };

  const confirmDecline = () => {
    if (!decliningApp) return;

    setApplications(apps =>
      apps.map(app =>
        app.id === decliningApp.id
          ? { ...app, status: 'Declined', declineReason: declineReason || 'No reason provided.' }
          : app
      )
    );
    setDecliningApp(null);
    setDeclineReason('');
  };

  const cancelDecline = () => {
    setDecliningApp(null);
    setDeclineReason('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>Review and manage postpaid plan applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <React.Fragment key={app.id}>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">{app.customerName}</div>
                    <div className="text-sm text-muted-foreground">{app.email}</div>
                  </TableCell>
                  <TableCell>{app.planName}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                    {app.status === 'Declined' && app.declineReason && (
                        <p className="text-xs text-muted-foreground mt-1">Reason: {app.declineReason}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {app.documents.length > 0 ? (
                        app.documents.map((doc, index) => (
                          <Link
                            key={index}
                            href={doc.url}
                            target="_blank"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <FileText className="h-3 w-3" /> {doc.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">None</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {app.status === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => handleApprove(app.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => startDecline(app)}>
                                <XCircle className="mr-2 h-4 w-4" /> Decline
                            </Button>
                        </div>
                    )}
                  </TableCell>
                </TableRow>
                {decliningApp?.id === app.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <Label htmlFor="declineReason">Reason for Decline (Optional)</Label>
                        <Textarea
                          id="declineReason"
                          value={declineReason}
                          onChange={(e) => setDeclineReason(e.target.value)}
                          placeholder={`Why is ${app.customerName}'s application being declined?`}
                        />
                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="ghost" size="sm" onClick={cancelDecline}>
                            Cancel
                          </Button>
                          <Button variant="destructive" size="sm" onClick={confirmDecline}>
                            Confirm Decline
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
