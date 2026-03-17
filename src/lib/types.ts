export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner';
  preparationTime?: string;
  isFeatured?: boolean;
  tags?: string[];
}

export interface DailyMeal {
    day: number;
    meals: {
        breakfast?: string;
        lunch?: string;
        dinner?: string;
    }
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  type: 'Prepaid' | 'Postpaid' | 'Both';
  duration: string;
  features: string[];
  dailyMenu?: DailyMeal[];
  startDelay?: string;
  deliverySchedule?: string;
  isFeatured?: boolean;
  status?: 'Active' | 'Inactive';
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  prepaidDiscount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  image: string;
  imageHint: string;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageHint?: string;
  buttonText: string;
  buttonLink: string;
  category?: string;
}

export interface MenuCategory {
    name: string;
    icon: string;
}

export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    joinedDate?: string;
    status?: 'Active' | 'Inactive';
    phone?: string;
    address?: {
        street: string;
        city: string;
        postalCode: string;
    };
    isVerified?: boolean;
    subscriptions?: Subscription[];
}

export interface Application {
  id: string;
  customerName: string;
  email: string;
  planName: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Declined';
  documents: { name: string, url: string }[];
  declineReason?: string;
}


export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
}

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    status: 'Published' | 'Draft';
}

export interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    status: 'Approved' | 'Pending';
}

export interface Subscription {
    id: string;
    planName: string;
    price: number;
    status: 'Active' | 'Cancelled';
    nextBilling: string;
}
