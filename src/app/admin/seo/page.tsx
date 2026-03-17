// src/app/admin/seo/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, Globe, Eye, Trash2, PlusCircle, Search, Link as LinkIcon, Download, Upload, MoreVertical, FileCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';


const initialPages = [
  { id: 1, path: '/', title: "Dinner O'Clock - Fresh Meals Delivered", description: "Fresh, delicious, and healthy meals delivered right to your doorstep.", lastModified: '2024-07-30', indexStatus: 'Indexed', keywords: 'meal delivery, healthy food, dinner' },
  { id: 2, path: '/menu', title: "Our Menu - Dinner O'Clock", description: "Explore our wide variety of breakfast, lunch, and dinner options.", lastModified: '2024-07-29', indexStatus: 'Indexed', keywords: 'menu, food, dishes' },
  { id: 3, path: '/plans', title: "Meal Plans - Dinner O'Clock", description: "Choose a flexible meal plan that fits your lifestyle and budget.", lastModified: '2024-07-28', indexStatus: 'No Index', keywords: 'meal plans, subscription' },
  { id: 4, path: '/about', title: "About Us - Dinner O'Clock", description: "Learn more about our mission to make healthy eating easy.", lastModified: '2024-07-27', indexStatus: 'Indexed', keywords: 'about us, company, mission' },
  { id: 5, path: '/blog', title: "Blog - Dinner O'Clock", description: "Tips, stories, and updates from our kitchen.", lastModified: '2024-07-26', indexStatus: 'Indexed', keywords: 'blog, articles, food tips' },
];

const initialRedirects = [
    { id: 1, from: '/old-menu', to: '/menu' },
    { id: 2, from: '/pricing', to: '/plans' },
];

export default function SeoPage() {
    const { toast } = useToast();
    const [pageMetadata, setPageMetadata] = useState(initialPages);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [previewingPage, setPreviewingPage] = useState<typeof initialPages[0] | null>(null);
    const [robotsTxt, setRobotsTxt] = useState("User-agent: *\nAllow: /\n\nDisallow: /admin");
    const [redirects, setRedirects] = useState(initialRedirects);
    const [schemaMarkup, setSchemaMarkup] = useState(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Dinner O'Clock",
        "image": "",
        "url": "https://yourwebsite.com",
        "telephone": "+1-234-567-890",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Foodie Lane",
            "addressLocality": "Flavor Town",
            "postalCode": "12345",
            "addressCountry": "US"
        }
    }, null, 2));


    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your SEO settings have been successfully updated.",
        });
        setEditingId(null);
    }
    
    const handleGenerateSitemap = () => {
        toast({
            title: "Sitemap Generated",
            description: "sitemap.xml has been successfully created and is up to date.",
        });
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Globe /> SEO Management</h1>
      </div>

      <Tabs defaultValue="pages">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">Page Metadata</TabsTrigger>
          <TabsTrigger value="global">Global Settings</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page-Specific SEO</CardTitle>
              <CardDescription>
                Customize the title, meta description, and keywords for individual pages.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex justify-between items-center mb-4">
                 <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search pages..." className="pl-8" />
                 </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Bulk Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Set Selected to 'Indexed'</DropdownMenuItem>
                        <DropdownMenuItem>Set Selected to 'No Index'</DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">Delete Selected</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
               </div>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"><Checkbox /></TableHead>
                      <TableHead>Page Path</TableHead>
                      <TableHead>SEO Title</TableHead>
                      <TableHead>Meta Description</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Index Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageMetadata.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell className="font-medium">{page.path}</TableCell>
                        <TableCell>
                          {editingId === page.id ? <Input defaultValue={page.title} /> : page.title}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {editingId === page.id ? <Textarea defaultValue={page.description} className="h-20" /> : page.description}
                        </TableCell>
                         <TableCell className="max-w-xs truncate">
                          {editingId === page.id ? <Input defaultValue={page.keywords} /> : page.keywords}
                        </TableCell>
                         <TableCell>
                            <Badge variant={page.indexStatus === 'Indexed' ? 'default' : 'secondary'}>{page.indexStatus}</Badge>
                         </TableCell>
                        <TableCell>
                           <div className="flex gap-2">
                             {editingId === page.id ? (
                                <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
                            ) : (
                                <Button variant="outline" size="sm" onClick={() => setEditingId(page.id)}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                            )}
                             <Button variant="ghost" size="sm" onClick={() => setPreviewingPage(page)}><Eye className="mr-2 h-4 w-4" /> Preview</Button>
                           </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="global">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Global Meta Settings</CardTitle>
                        <CardDescription>
                            Set default SEO tags for your entire website. These are used if a page-specific tag isn't set.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title-template">Title Template</Label>
                            <Input id="title-template" defaultValue="%s | Dinner O'Clock" />
                            <p className="text-sm text-muted-foreground">`%s` will be replaced with the page title.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meta-description">Default Meta Description</Label>
                            <Textarea id="meta-description" defaultValue="Fresh, healthy, and delicious meals delivered to your door. Dinner O'Clock makes eating well easy." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="global-keywords">Global Keywords</Label>
                            <Input id="global-keywords" defaultValue="meal delivery, food subscription, healthy eating, dinner, lunch" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave}>Save Global Settings</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Social Sharing (Open Graph)</CardTitle>
                        <CardDescription>
                           Customize how your site appears when shared on social media.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label>Default OG Image</Label>
                            <div className="border rounded-md p-4 flex flex-col items-center gap-2 text-center">
                                <Image src="https://picsum.photos/seed/og-image/1200/630" alt="OG Image Preview" width={200} height={105} className="rounded-md" />
                                <Button variant="outline" size="sm"><Upload className="mr-2" /> Upload New Image</Button>
                                <p className="text-xs text-muted-foreground">Recommended size: 1200x630px.</p>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </TabsContent>

         <TabsContent value="tools">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Sitemap</CardTitle>
                        <CardDescription>
                            Generate a sitemap.xml file to help search engines understand your site structure.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Last generated: 2024-07-29</p>
                        <p className="text-sm text-muted-foreground">URLs included: {pageMetadata.length}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button onClick={handleGenerateSitemap}><Globe className="mr-2" /> Generate Sitemap</Button>
                        <Button variant="outline">View Sitemap</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Robots.txt</CardTitle>
                        <CardDescription>
                            Manage which parts of your site search engines can crawl.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea rows={6} value={robotsTxt} onChange={(e) => setRobotsTxt(e.target.value)} className="font-code" />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave}>Save robots.txt</Button>
                    </CardFooter>
                </Card>
            </div>
        </TabsContent>
        
        <TabsContent value="advanced">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Schema Markup (JSON-LD)</CardTitle>
                        <CardDescription>
                           Provide structured data for your organization to search engines.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            value={schemaMarkup} 
                            onChange={(e) => setSchemaMarkup(e.target.value)} 
                            rows={15} 
                            className="font-code text-xs" 
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                         <Button onClick={handleSave}><Save className="mr-2" /> Save Schema</Button>
                         <Button variant="outline"><FileCode className="mr-2" /> Validate Schema</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>URL Redirects (301)</CardTitle>
                        <CardDescription>
                           Manage URL redirects to avoid broken links.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                           {redirects.map(redirect => (
                               <div key={redirect.id} className="flex items-center gap-2">
                                   <Input defaultValue={redirect.from} placeholder="/old-path" />
                                   <LinkIcon className="shrink-0" />
                                   <Input defaultValue={redirect.to} placeholder="/new-path" />
                                   <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                               </div>
                           ))}
                        </div>
                    </CardContent>
                     <CardFooter className="flex justify-between">
                         <Button variant="outline" size="sm"><PlusCircle className="mr-2"/> Add Redirect</Button>
                         <div>
                            <Button variant="ghost" size="sm"><Upload className="mr-2" /> Import</Button>
                            <Button variant="ghost" size="sm"><Download className="mr-2" /> Export</Button>
                         </div>
                    </CardFooter>
                </Card>
            </div>
        </TabsContent>

      </Tabs>
      
      {previewingPage && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setPreviewingPage(null)}>
            <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                    <CardTitle>Google Search Preview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-background rounded-lg">
                        <p className="text-sm text-gray-800">https://yourwebsite.com{previewingPage.path}</p>
                        <h3 className="text-xl text-blue-800 font-medium group-hover:underline">{previewingPage.title}</h3>
                        <p className="text-sm text-gray-600">{previewingPage.description}</p>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" onClick={() => setPreviewingPage(null)}>Close</Button>
                </CardFooter>
            </Card>
        </div>
      )}
    </div>
  );
}
