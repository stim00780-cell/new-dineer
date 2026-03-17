import { MenuItem, Plan, Testimonial, HowItWorksStep, MenuCategory, User, Application, Order, Review, BlogPost, HeroSlide, Subscription } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Avocado Toast', description: 'Toasted sourdough with fresh avocado, chili flakes, and a squeeze of lime.', price: 8.50, image: PlaceHolderImages.find(p => p.id === 'menu-1')?.imageUrl!, imageHint: 'avocado toast', category: 'Breakfast', preparationTime: '10-15 mins', tags: ['Vegetarian', 'Healthy', 'Spicy'] },
  { id: '2', name: 'Pancakes Stack', description: 'Fluffy buttermilk pancakes served with maple syrup and fresh berries.', price: 10.00, image: PlaceHolderImages.find(p => p.id === 'menu-2')?.imageUrl!, imageHint: 'pancakes berries', category: 'Breakfast', preparationTime: '15-20 mins', tags: ['Vegetarian', 'Sweet'] },
  { id: '3', name: 'Chicken Caesar Salad', description: 'Grilled chicken breast, romaine lettuce, croutons, and Caesar dressing.', price: 12.00, image: PlaceHolderImages.find(p => p.id === 'menu-3')?.imageUrl!, imageHint: 'chicken salad', category: 'Lunch', preparationTime: '10-15 mins', isFeatured: true, tags: ['Meat', 'Healthy'] },
  { id: '4', name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with pancetta, eggs, and pecorino cheese.', price: 14.50, image: PlaceHolderImages.find(p => p.id === 'menu-4')?.imageUrl!, imageHint: 'pasta carbonara', category: 'Dinner', preparationTime: '20-25 mins', isFeatured: true, tags: ['Meat', 'Pasta'] },
  { id: '5', name: 'Salmon Teriyaki', description: 'Grilled salmon fillet with a sweet teriyaki glaze, served with rice and steamed vegetables.', price: 18.00, image: PlaceHolderImages.find(p => p.id === 'menu-5')?.imageUrl!, imageHint: 'grilled salmon', category: 'Dinner', preparationTime: '25-30 mins', isFeatured: true, tags: ['Fish', 'Healthy', 'Asian'] },
  { id: '6', name: 'Mushroom Risotto', description: 'Creamy Arborio rice with wild mushrooms, parmesan, and a touch of truffle oil.', price: 15.00, image: PlaceHolderImages.find(p => p.id === 'menu-6')?.imageUrl!, imageHint: 'mushroom risotto', category: 'Dinner', preparationTime: '25-30 mins', isFeatured: true, tags: ['Vegetarian', 'Pasta'] },
  { id: '7', name: 'Greek Yogurt Bowl', description: 'Thick Greek yogurt with honey, walnuts, and seasonal fruits.', price: 7.00, image: PlaceHolderImages.find(p => p.id === 'menu-7')?.imageUrl!, imageHint: 'yogurt bowl', category: 'Breakfast', preparationTime: '5-10 mins', tags: ['Vegetarian', 'Healthy', 'Sweet'] },
  { id: '8', name: 'Club Sandwich', description: 'Triple-decker sandwich with turkey, bacon, lettuce, tomato, and mayo.', price: 11.50, image: PlaceHolderImages.find(p => p.id === 'menu-8')?.imageUrl!, imageHint: 'club sandwich', category: 'Lunch', preparationTime: '15-20 mins', tags: ['Meat'] },
  { id: '9', name: 'Beef Burger', description: 'Juicy beef patty with cheese, lettuce, tomato, and our special sauce on a brioche bun.', price: 13.00, image: PlaceHolderImages.find(p => p.id === 'menu-9')?.imageUrl!, imageHint: 'beef burger', category: 'Lunch', preparationTime: '20-25 mins', tags: ['Meat'] },
  { id: '10', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil.', price: 12.50, image: PlaceHolderImages.find(p => p.id === 'menu-10')?.imageUrl!, imageHint: 'margherita pizza', category: 'Dinner', preparationTime: '20-25 mins', tags: ['Vegetarian', 'Pizza'] },
  { id: '11', name: 'Vegan Bowl', description: 'A mix of quinoa, roasted sweet potatoes, chickpeas, kale and a tahini dressing.', price: 13.50, image: 'https://picsum.photos/seed/menu-11/400/400', imageHint: 'vegan bowl', category: 'Lunch', preparationTime: '15-20 mins', tags: ['Vegan', 'Healthy', 'Vegetable'] },
  { id: '12', name: 'Spicy Thai Curry', description: 'Aromatic red curry with chicken, bamboo shoots, and coconut milk.', price: 16.00, image: 'https://picsum.photos/seed/menu-12/400/400', imageHint: 'thai curry', category: 'Dinner', preparationTime: '25-30 mins', tags: ['Meat', 'Spicy', 'Asian'] },
];

const sampleDailyMenu = [
  { day: 1, meals: { breakfast: 'Avocado Toast', lunch: 'Club Sandwich', dinner: 'Salmon Teriyaki' } },
  { day: 2, meals: { breakfast: 'Pancakes Stack', lunch: 'Chicken Caesar Salad', dinner: 'Mushroom Risotto' } },
  { day: 3, meals: { breakfast: 'Greek Yogurt Bowl', lunch: 'Beef Burger', dinner: 'Spaghetti Carbonara' } },
  { day: 4, meals: { breakfast: 'Avocado Toast', lunch: 'Club Sandwich', dinner: 'Margherita Pizza' } },
  { day: 5, meals: { breakfast: 'Pancakes Stack', lunch: 'Chicken Caesar Salad', dinner: 'Salmon Teriyaki' } },
  { day: 6, meals: { breakfast: 'Greek Yogurt Bowl', lunch: 'Beef Burger', dinner: 'Mushroom Risotto' } },
  { day: 7, meals: { breakfast: 'Avocado Toast', lunch: 'Club Sandwich', dinner: 'Spaghetti Carbonara' } },
];


export const plans: Plan[] = [
  { id: '1', name: 'Weekly Solo', price: 70, type: 'Prepaid', duration: 'Weekly', features: ['7 meals per week', 'Choose from entire menu', 'Flexible delivery'], dailyMenu: sampleDailyMenu.slice(0, 7), startDelay: 'Starts in 1-2 days', deliverySchedule: 'Evening (6pm-8pm)' },
  { id: '2', name: 'Monthly Duo', price: 500, type: 'Prepaid', duration: 'Monthly', features: ['60 meals per month', 'For two people', '10% discount included', 'Priority support'], dailyMenu: sampleDailyMenu, startDelay: 'Starts in 2-3 days', deliverySchedule: 'Evening (6pm-8pm)', isFeatured: true },
  { id: '3', name: 'Basic Postpaid', price: 90, type: 'Postpaid', duration: 'Weekly', features: ['7 meals per week', 'Monthly billing', 'Standard menu'], dailyMenu: sampleDailyMenu, startDelay: 'Starts in 3-5 days', deliverySchedule: 'Lunch (12pm-2pm)' },
  { id: '4', name: 'Family Feast', price: 800, type: 'Postpaid', duration: 'Monthly', features: ['100 meals per month', 'For a family of four', 'Customizable menu', 'Monthly billing'], dailyMenu: sampleDailyMenu, startDelay: 'Starts in 3-5 days', deliverySchedule: 'Evening (6pm-8pm)', isFeatured: true },
  { id: '5', name: 'Trial Week', price: 50, type: 'Prepaid', duration: '7-day', features: ['5 meals for a week', 'Great for new customers', 'No commitment'], dailyMenu: sampleDailyMenu.slice(0, 5), startDelay: 'Starts tomorrow', deliverySchedule: 'Evening (6pm-8pm)', isFeatured: true },
  { id: '6', name: 'Office Lunch', price: 1200, type: 'Both', duration: 'Monthly', features: ['Daily lunches for 10 employees', 'Corporate account', 'Special event catering'], dailyMenu: sampleDailyMenu, startDelay: 'Contact for schedule', deliverySchedule: 'Lunch (12pm-2pm)' },
];

export const testimonials: Testimonial[] = [
  { id: '1', name: 'Jessica M.', text: "Dinner O'Clock has been a lifesaver! The meals are delicious and I love the variety. No more stress about what to cook for dinner.", image: PlaceHolderImages.find(p => p.id === 'testimonial-1')?.imageUrl!, imageHint: 'happy woman' },
  { id: '2', name: 'David L.', text: "The quality of the ingredients is top-notch. It feels like having a personal chef. Highly recommended for busy professionals.", image: PlaceHolderImages.find(p => p.id === 'testimonial-2')?.imageUrl!, imageHint: 'smiling man' },
  { id: '3', name: 'Sarah K.', text: "My family loves the meals, especially the Salmon Teriyaki. It's healthy, convenient, and tastes amazing. We're customers for life!", image: PlaceHolderImages.find(p => p.id === 'testimonial-3')?.imageUrl!, imageHint: 'woman portrait' },
];

export const howItWorks: HowItWorksStep[] = [
  { id: '1', title: 'Choose Your Plan', description: 'Select from our flexible weekly or monthly plans that fit your lifestyle.', icon: 'Package' },
  { id: '2', title: 'Select Your Meals', description: 'Browse our diverse menu and pick your favorite dishes for the week.', icon: 'Utensils' },
  { id: '3', title: 'Enjoy Your Food', description: 'We cook and deliver fresh, ready-to-eat meals right to your door.', icon: 'Zap' },
];

export const heroSlides: HeroSlide[] = [
    {
        id: '1',
        title: "Dinner O'Clock",
        subtitle: 'Fresh, delicious, and healthy meals delivered right to your doorstep. Your culinary journey starts here.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'hero-1')?.imageUrl!,
        imageHint: 'pasta dish',
        buttonText: 'Explore Our Menu',
        buttonLink: '/menu',
    },
    {
        id: '2',
        title: 'Healthy Eating Made Easy',
        subtitle: 'Discover our wide range of nutritious and flavorful salads, perfect for a light and healthy meal.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'hero-2')?.imageUrl!,
        imageHint: 'healthy salad',
        buttonText: 'View Salads',
        buttonLink: '/menu',
        category: 'New'
     },
    {
        id: '3',
        title: 'Start Your Day Right',
        subtitle: 'Our breakfast options are designed to give you the energy you need to conquer your day.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'hero-3')?.imageUrl!,
        imageHint: 'pancake stack',
        buttonText: 'See Breakfast Menu',
        buttonLink: '/menu',
    },
     {
        id: '4',
        title: 'Customizable Meal Plans',
        subtitle: 'Build your own plan that fits your taste, diet, and schedule perfectly.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'hero-4')?.imageUrl!,
        imageHint: 'meal prep containers',
        buttonText: 'Create Your Plan',
        buttonLink: '/plans/custom',
    },
    {
        id: '5',
        title: 'For The Whole Family',
        subtitle: 'Delicious and wholesome meals that everyone in the family will love.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'hero-5')?.imageUrl!,
        imageHint: 'family dinner',
        buttonText: 'View Family Plans',
        buttonLink: '/plans',
        category: 'Family'
    },
];

export const menuCategories: MenuCategory[] = [
  { name: 'All', icon: 'UtensilsCrossed' },
  { name: 'Breakfast', icon: 'ChefHat' },
  { name: 'Lunch', icon: 'Salad' },
  { name: 'Dinner', icon: 'Soup' },
]

export const demoUser: User = {
    id: '1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatar: `https://i.pravatar.cc/150?u=${'alex.doe@example.com'}`,
    phone: '123-456-7890',
    address: {
        street: '123 Main St',
        city: 'Anytown',
        postalCode: '12345'
    },
    subscriptions: [
      {
        id: 'SUB001',
        planName: 'Monthly Duo',
        price: 500,
        status: 'Active',
        nextBilling: '2024-08-15',
      },
    ]
};

export const demoCart: { [key: string]: number } = {
    '1': 2,
    '3': 1,
};

export const applications: Application[] = [
  {
    id: 'APP001',
    customerName: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    planName: 'Family Feast',
    date: '2024-07-28',
    status: 'Pending',
    documents: [{ name: 'proof_of_address.pdf', url: '#' }],
  },
  {
    id: 'APP002',
    customerName: 'Lucy van Pelt',
    email: 'lucy.vanpelt@example.com',
    planName: 'Office Lunch',
    date: '2024-07-27',
    status: 'Pending',
    documents: [
        { name: 'passport.jpg', url: '#' },
        { name: 'utility_bill.pdf', url: '#' }
    ],
  },
  {
    id: 'APP003',
    customerName: 'Linus van Pelt',
    email: 'linus.vanpelt@example.com',
    planName: 'Family Feast',
    date: '2024-07-26',
    status: 'Approved',
    documents: [{ name: 'id_card.png', url: '#' }],
  },
  {
    id: 'APP004',
    customerName: 'Snoopy',
    email: 'snoopy@example.com',
    planName: 'Office Lunch',
    date: '2024-07-25',
    status: 'Declined',
    documents: [],
    declineReason: 'Incomplete or blurry documents submitted.',
  },
];

export const orders: Order[] = [
    { id: 'ORD001', customer: 'Alex Doe', date: '2024-07-25', total: 45.5, status: 'Delivered' },
    { id: 'ORD002', customer: 'Jane Smith', date: '2024-07-25', total: 28.0, status: 'Processing' },
    { id: 'ORD003', customer: 'Alex Doe', date: '2024-07-24', total: 89.9, status: 'Shipped' },
    { id: 'ORD004', customer: 'Mary Jane', date: '2024-07-23', total: 15.0, status: 'Cancelled' },
    { id: 'ORD005', customer: 'Alex Doe', date: '2024-07-22', total: 32.75, status: 'Delivered' },
];

export const users: User[] = [
    { id: 'USR001', name: 'John Doe', email: 'john.doe@example.com', avatar: `https://i.pravatar.cc/150?u=${'john.doe@example.com'}`, joinedDate: '2024-01-15', status: 'Active' },
    { id: 'USR002', name: 'Jane Smith', email: 'jane.smith@example.com', avatar: `https://i.pravatar.cc/150?u=${'jane.smith@example.com'}`, joinedDate: '2024-02-20', status: 'Active' },
    { id: 'USR003', name: 'Peter Jones', email: 'peter.jones@example.com', avatar: `https://i.pravatar.cc/150?u=${'peter.jones@example.com'}`, joinedDate: '2024-03-10', status: 'Inactive' },
    { id: 'USR004', name: 'Mary Jane', email: 'mary.jane@example.com', avatar: `https://i.pravatar.cc/150?u=${'mary.jane@example.com'}`, joinedDate: '2024-05-01', status: 'Active' },
];

export const reviews: Review[] = [
    { id: 'REV001', customerName: 'Jessica M.', rating: 5, comment: "Dinner O'Clock has been a lifesaver! The meals are delicious...", date: '2024-07-20', status: 'Approved' },
    { id: 'REV002', customerName: 'David L.', rating: 4, comment: "The quality of the ingredients is top-notch...", date: '2024-07-18', status: 'Approved' },
    { id: 'REV003', customerName: 'Anonymous', rating: 3, comment: "It was okay, could be better.", date: '2024-07-15', status: 'Pending' },
];

export const blogPosts: BlogPost[] = [
    { id: 'BLOG001', title: '10 Tips for Healthy Eating', author: 'Jane Smith', date: '2024-07-22', status: 'Published' },
    { id: 'BLOG002', title: 'The Story Behind Our Signature Dish', author: 'John Doe', date: '2024-07-10', status: 'Published' },
    { id: 'BLOG003', title: 'Upcoming Summer Menu', author: 'John Doe', date: '2024-07-29', status: 'Draft' },
    { id: 'BLOG004', title: 'Why Meal Prep is a Game Changer', author: 'Jane Smith', date: '2024-06-15', status: 'Published' },
];
