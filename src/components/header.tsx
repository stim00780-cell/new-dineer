// src/components/header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu as MenuIcon,
  ShoppingCart,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/plans', label: 'Plans' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {user && (
             <Link
              href="/admin"
              className="font-headline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
           <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                    </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/admin">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                    </Link>
                    </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2" /> Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">
                    <UserPlus className="mr-2" /> Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          <LanguageToggle />
          <ThemeToggle />
          
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cartItemCount}
            </span>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <div className="p-4">
                <Link href="/" className="mb-8 block" onClick={() => setSheetOpen(false)}>
                  <Logo />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className="font-headline text-lg text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                   {user && (
                    <Link
                      href="/admin"
                      onClick={() => setSheetOpen(false)}
                      className="font-headline text-lg text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Admin
                    </Link>
                  )}
                </nav>
                <div className="mt-8 border-t pt-8 flex flex-col gap-4">
                    { user ? (
                        <>
                         <Link href="/profile" onClick={() => setSheetOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">
                                <User className="mr-2" /> Profile
                            </Button>
                        </Link>
                         <Button variant="ghost" onClick={() => { logout(); setSheetOpen(false); }} className="w-full justify-start">
                            <LogOut className="mr-2" /> Logout
                        </Button>
                        </>
                    ) : (
                        <>
                         <Link href="/login" onClick={() => setSheetOpen(false)}>
                            <Button variant="ghost" asChild className="w-full justify-start">
                                <div><LogIn className="mr-2" /> Login</div>
                            </Button>
                         </Link>
                        <Link href="/signup" onClick={() => setSheetOpen(false)}>
                           <Button asChild className="w-full justify-start">
                             <div><UserPlus className="mr-2" /> Sign Up</div>
                           </Button>
                        </Link>
                        </>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
