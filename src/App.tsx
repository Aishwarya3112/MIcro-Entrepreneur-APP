/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  Mic,
  Home, 
  Grid, 
  ShoppingBag, 
  User, 
  ChevronLeft, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Upload,
  BarChart3,
  Package,
  AlertCircle,
  FileText,
  Plus,
  Sparkles,
  Loader2,
  Phone,
  Mail,
  Store,
  ShieldCheck,
  Star,
  ChevronDown,
  Truck,
  Minus,
  Trash2,
  TrendingUp,
  Edit3,
  Check,
  Camera,
  CheckCircle,
  XCircle,
  PlusCircle,
  Heart,
  Leaf,
  Shield,
  Lock,
  LayoutDashboard,
  LayoutGrid,
  ChevronRight,
  LogIn,
  LogOut,
  Eye,
  Settings,
  HelpCircle,
  CreditCard,
  Bell,
  X,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

type Screen = 
  | 'splash' 
  | 'role-selection' 
  | 'buyer-home' 
  | 'buyer-categories' 
  | 'buyer-seller-menu'
  | 'buyer-product-detail' 
  | 'buyer-order-tracking' 
  | 'buyer-support'
  | 'buyer-profile'
  | 'buyer-cart'
  | 'buyer-orders'
  | 'buyer-search-results'
  | 'buyer-address-management'
  | 'buyer-add-address'
  | 'buyer-checkout'
  | 'seller-reg-flow'
  | 'seller-dashboard'
  | 'seller-add-product'
  | 'seller-manage-shop'
  | 'seller-profile'
  | 'buyer-login'
  | 'seller-login'
  | 'seller-basic-info'
  | 'seller-verification'
  | 'seller-verification-success'
  | 'buyer-wishlist';

const MARKETPLACE_DATA: any = {
  farm: {
    id: 'farm',
    name: 'Homemade Bakery',
    subcategories: [
      { id: 'bakery', name: 'Artisan Breads' },
      { id: 'snack', name: 'Sweet Treats' }
    ],
    sellers: [
      {
        id: 's1',
        name: 'The Crust & Crumb',
        city: 'Ahmedabad',
        rating: '4.9',
        dist: '1.2 km',
        distValue: 1.2,
        deliveryTime: '30-45 mins',
        desc: 'Traditional sourdough and hand-kneaded pastries.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
        isVerified: true,
        products: [
          { id: 'p1', name: 'Blueberry Cheesecake', priceValue: 450, type: 'VEG', isVeg: true, rating: 4.9, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400', desc: 'Velvety smooth cheesecake topped with a luscious, hand-picked blueberry compote.', subcat: 'bakery', tags: ['Home Made', 'Freshly Baked', 'Artisanal', 'Fresh & Home Made'], isFeatured: true },
          { id: 'p2', name: 'Almond Croissants', priceValue: 350, type: 'VEG', isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', desc: 'Flaky, buttery croissants with almond filling.', subcat: 'bakery', tags: ['Freshly Baked', 'Buttery', 'Artisanal', 'Fresh & Home Made'] }
        ]
      },
      {
        id: 's5',
        name: 'Pune Patisserie',
        city: 'Pune',
        rating: '4.8',
        dist: '2.1 km',
        distValue: 2.1,
        deliveryTime: '45 mins',
        desc: 'Elegant French-inspired bakes in the heart of Pune.',
        image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p18', name: 'Walnut Croissant', priceValue: 320, type: 'VEG', isVeg: true, rating: 4.7, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', desc: 'Flaky croissant topped with toasted walnuts.', subcat: 'bakery', tags: ['Freshly Baked', 'Nutty', 'Artisanal', 'Fresh & Home Made'] },
          { id: 'p19', name: 'Pistachio Cupcakes', priceValue: 400, type: 'VEG', isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400', desc: 'Delicate pistachio sponge with cream frosting.', subcat: 'bakery', tags: ['Home Made', 'Freshly Baked', 'Gourmet', 'Fresh & Home Made'] }
        ]
      },
      {
        id: 's11',
        name: 'Marina Bakes',
        city: 'Chennai',
        rating: '4.7',
        dist: '3.5 km',
        distValue: 3.5,
        deliveryTime: '1 hour',
        desc: 'Coastal flavors infused into classic bakery items.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p33', name: 'Coconut Macaroons', priceValue: 220, type: 'VEG', isVeg: true, rating: 4.7, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', desc: 'Sweet, chewy coconut delights.', subcat: 'snack', tags: ['Home Made', 'Traditional', 'Gluten Free', 'Fresh & Home Made'] }
        ]
      },
      {
        id: 's14',
        name: 'Garden City Bakes',
        city: 'Bangalore',
        rating: '4.9',
        dist: '1.8 km',
        distValue: 1.8,
        deliveryTime: '40 mins',
        desc: 'Organic, wholesome bakes for the modern soul.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p36', name: 'Whole Wheat Sourdough', priceValue: 300, type: 'VEG', isVeg: true, rating: 4.9, image: 'https://sallysbakingaddiction.com/wp-content/uploads/2024/01/whole-wheat-sandwich-bread-2-600x900.jpg', desc: 'Healthy and hearty whole wheat bread.', subcat: 'bakery', tags: ['Freshly Baked', 'Organic', 'Healthy', 'Fresh & Home Made'] },
          { id: 'p37', name: 'Artisan Coffee Beans', priceValue: 650, type: 'VEG', isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', desc: 'Freshly roasted local coffee beans.', subcat: 'snack', tags: ['Freshly Roasted', 'Artisanal', 'Local', 'Fresh & Home Made'] }
        ]
      }
    ]
  },
  natural: {
    id: 'natural',
    name: 'Natural Care',
    subcategories: [
      { id: 'soap', name: 'Handmade Soaps' },
      { id: 'skin', name: 'Botanical Skincare' }
    ],
    sellers: [
      {
        id: 's2',
        name: 'The Herb Garden',
        city: 'Ahmedabad',
        rating: 'New',
        dist: '2.5 km',
        distValue: 2.5,
        deliveryTime: 'Next Day',
        desc: 'Small-batch skincare made with garden-fresh herbs.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
        isVerified: false,
        isNew: true,
        products: [
          { id: 'p6', name: 'Aloe Vera Gel (Natural Skincare)', priceValue: 350, type: 'VEG', isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1598440441973-1675005af43e?auto=format&fit=crop&q=80&w=800', desc: 'Pure aloe vera gel for soothing skin care, made with natural ingredients.', subcat: 'skin', tags: ['100% Organic', 'Handmade', 'Chemical Free', 'Pure & Natural'] },
          { id: 'p7', name: 'Rosehip Facial Oil', priceValue: 550, type: 'VEG', isVeg: true, rating: 4.9, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400', desc: 'Pure rosehip oil for a natural glow.', subcat: 'skin', tags: ['Botanical', 'Cold Pressed', 'Natural', 'Pure & Natural'] }
        ]
      },
      {
        id: 's6',
        name: 'Deccan Botanics',
        city: 'Pune',
        rating: '4.7',
        dist: '3.5 km',
        distValue: 3.5,
        deliveryTime: 'Next Day',
        desc: 'Ayurvedic wisdom meets modern skincare.',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p22', name: 'Handmade Face Mask', priceValue: 350, type: 'VEG', isVeg: true, rating: 4.7, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400', desc: 'Brightening clay mask with organic turmeric.', subcat: 'skin', tags: ['Handmade', 'Organic', 'Ayurvedic', 'Pure & Natural'] },
          { id: 'p23', name: 'Charcoal Face Scrub', priceValue: 450, type: 'VEG', isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400', desc: 'Deep cleansing scrub with activated charcoal.', subcat: 'skin', tags: ['Deep Cleansing', 'Natural', 'Vegan', 'Pure & Natural'] }
        ]
      },
      {
        id: 's16',
        name: 'Coastal Care',
        city: 'Chennai',
        rating: '4.7',
        dist: '4.2 km',
        distValue: 4.2,
        deliveryTime: '2 days',
        desc: 'Natural skincare inspired by the sea.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p38', name: 'Sea Salt Scrub', priceValue: 380, type: 'VEG', isVeg: true, rating: 4.7, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400', desc: 'Refreshing scrub with natural sea salt.', subcat: 'soap', tags: ['Natural', 'Mineral Rich', 'Exfoliating', 'Pure & Natural'] }
        ]
      }
    ]
  },
  crafts: {
    id: 'crafts',
    name: 'Handmade Crafts',
    subcategories: [
      { id: 'wall', name: 'Wall Decor' },
      { id: 'pottery', name: 'Ceramics' }
    ],
    sellers: [
      {
        id: 's3',
        name: 'Earth & Fire Studio',
        city: 'Ahmedabad',
        rating: '4.9',
        dist: '1.5 km',
        distValue: 1.5,
        deliveryTime: '2-3 days',
        desc: 'Hand-thrown ceramics and minimalist home decor.',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
        isVerified: true,
        products: [
          { id: 'p10', name: 'Speckled Stoneware Mug', priceValue: 899, type: 'ARTISAN', rating: 4.9, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400', desc: 'Hand-thrown stoneware mug with a speckled glaze.', subcat: 'pottery', tags: ['Hand-Thrown', 'Unique Piece', 'Artisanal', 'Skillfully Crafted'], isFeatured: true },
          { id: 'p11', name: 'Abstract Clay Wall Art', priceValue: 2500, type: 'ARTISAN', rating: 5.0, image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=400', desc: 'Unique clay relief sculpture for your wall.', subcat: 'wall', tags: ['Hand-Carved', 'One of a Kind', 'Artisanal', 'Skillfully Crafted'] }
        ]
      },
      {
        id: 's7',
        name: 'Sahyadri Weaves',
        city: 'Pune',
        rating: '4.7',
        dist: '3.1 km',
        distValue: 3.1,
        deliveryTime: '3–5 days',
        desc: 'Traditional weaving techniques reimagined.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p26', name: 'Handcrafted Pottery Vase', priceValue: 1200, type: 'ARTISAN', rating: 4.8, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400', desc: 'Beautifully hand-thrown pottery vase.', subcat: 'wall', tags: ['Hand-Thrown', 'Traditional', 'Artisanal', 'Skillfully Crafted'] }
        ]
      },
      {
        id: 's15',
        name: 'The Madras Potter',
        city: 'Chennai',
        rating: '4.6',
        dist: '5.5 km',
        distValue: 5.5,
        deliveryTime: '3-4 days',
        desc: 'Artisanal pottery from the heart of Madras.',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p39', name: 'Terracotta Planter', priceValue: 550, type: 'ARTISAN', rating: 4.6, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400', desc: 'Hand-painted terracotta planter.', subcat: 'pottery', tags: ['Hand-Painted', 'Traditional', 'Eco-Friendly', 'Skillfully Crafted'] }
        ]
      }
    ]
  },
  sustainable: {
    id: 'sustainable',
    name: 'Sustainable Living',
    subcategories: [
      { id: 'eco', name: 'Eco-Home' },
      { id: 'zero', name: 'Zero Waste' }
    ],
    sellers: [
      {
        id: 's8',
        name: 'The Conscious Home',
        city: 'Ahmedabad',
        rating: '4.7',
        dist: '2.8 km',
        distValue: 2.8,
        deliveryTime: '2 days',
        desc: 'Curated essentials for a waste-free lifestyle.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
        isVerified: true,
        products: [
          { id: 'p14_bags', name: 'Reusable Cotton Grocery Bags', priceValue: 399, type: 'VEG', isVeg: true, rating: 4.9, image: 'https://www.neway-ecobag.com/Uploads/202412/cotton-bags-780-x572.jpg', desc: 'Eco-friendly reusable cotton bags designed to reduce plastic waste in daily shopping.', subcat: 'zero', tags: ['Zero Waste', 'Plastic Free', 'Eco-Friendly', 'Eco-Conscious'], isFeatured: true },
          { id: 'p15', name: 'Eco-Friendly Bamboo Toothbrush Set', priceValue: 299, type: 'VEG', isVeg: true, rating: 4.9, image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800', desc: 'Sustainable bamboo toothbrush set designed for an eco-friendly daily routine.', subcat: 'eco', tags: ['Zero Waste', 'Biodegradable', 'Eco-Friendly', 'Eco-Conscious'] }
        ]
      },
      {
        id: 's12',
        name: 'Garden City Eco',
        city: 'Bangalore',
        rating: '4.9',
        dist: '1.5 km',
        distValue: 1.5,
        deliveryTime: 'Same Day',
        desc: 'Bangalore\'s favorite zero-waste store.',
        image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p34', name: 'Beeswax Food Wraps', priceValue: 350, type: 'VEG', isVeg: true, rating: 4.9, image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=400', desc: 'Natural alternative to plastic wrap.', subcat: 'zero', tags: ['Plastic Free', 'Reusable', 'Natural', 'Eco-Conscious'] }
        ]
      }
    ]
  },
  gifting: {
    id: 'gifting',
    name: 'Gifting & Hampers',
    subcategories: [
      { id: 'hamper', name: 'Artisan Hampers' },
      { id: 'box', name: 'Curated Boxes' }
    ],
    sellers: [
      {
        id: 's4',
        name: 'The Gift Atelier',
        city: 'Ahmedabad',
        rating: '4.9',
        dist: '4.5 km',
        distValue: 4.5,
        deliveryTime: 'Same Day',
        desc: 'Bespoke gifting experiences for every occasion.',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p14', name: 'Artisan Tea Hamper', priceValue: 2500, type: 'PREMIUM', isVeg: true, rating: 4.9, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400', desc: 'A selection of hand-picked teas and local honey.', subcat: 'hamper', tags: ['Premium', 'Curated', 'Gift Ready', 'Thoughtfully Curated'] }
        ]
      },
      {
        id: 's10',
        name: 'Bangalore Curations',
        city: 'Bangalore',
        rating: '4.8',
        dist: '3.2 km',
        distValue: 3.2,
        deliveryTime: 'Next Day',
        desc: 'The best of Bangalore in a box.',
        image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p32', name: 'The Garden City Box', priceValue: 1800, type: 'PREMIUM', isVeg: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400', desc: 'Curated local treats and handmade items.', subcat: 'box', tags: ['Local Favorites', 'Curated', 'Gift Ready', 'Thoughtfully Curated'] }
        ]
      },
      {
        id: 's13',
        name: 'Chennai Gifting Co.',
        city: 'Chennai',
        rating: '4.8',
        dist: '2.5 km',
        distValue: 2.5,
        deliveryTime: 'Next Day',
        desc: 'Traditional and modern gifts from Tamil Nadu.',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
        products: [
          { id: 'p35', name: 'Silk & Spice Hamper', priceValue: 3200, type: 'PREMIUM', isVeg: true, rating: 4.9, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400', desc: 'A luxurious blend of local silk and spices.', subcat: 'hamper', tags: ['Premium', 'Traditional', 'Gift Ready', 'Thoughtfully Curated'] }
        ]
      }
    ]
  }
};

const TRENDING_IDS: Record<string, string[]> = {
  Ahmedabad: ['p1', 'p10', 'p14_bags'],
  Pune: ['p18', 'p26'],
  Chennai: ['p33', 'p35', 'p39'],
  Bangalore: ['p32', 'p36']
};

const DISCOVER_SHOP_IDS = [
  { id: 's1', city: 'Ahmedabad' },
  { id: 's3', city: 'Ahmedabad' },
  { id: 's8', city: 'Ahmedabad' },
  { id: 's2', city: 'Ahmedabad' },
  { id: 's5', city: 'Pune' },
  { id: 's6', city: 'Pune' },
  { id: 's7', city: 'Pune' },
  { id: 's11', city: 'Chennai' },
  { id: 's13', city: 'Chennai' },
  { id: 's15', city: 'Chennai' },
  { id: 's16', city: 'Chennai' },
  { id: 's12', city: 'Bangalore' },
  { id: 's10', city: 'Bangalore' },
];

const DISCOVERY_CARDS = [
  { id: 'c1', title: 'Artisan Bakery', category: 'farm', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800' },
  { id: 'c2', title: 'Natural Care', category: 'natural', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800' },
  { id: 'c3', title: 'Handmade Crafts', category: 'crafts', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' },
  { id: 'c4', title: 'Sustainable Living', category: 'sustainable', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800' },
  { id: 'c5', title: 'Gifting & Hampers', category: 'gifting', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800' },
];


const categories = [
  { id: 'farm', name: 'Homemade Bakery', icon: '🥖' },
  { id: 'natural', name: 'Natural Care', icon: '🌿' },
  { id: 'crafts', name: 'Handmade Crafts', icon: '🎨' },
  { id: 'sustainable', name: 'Sustainable Living', icon: '♻️' },
  { id: 'gifting', name: 'Gifting & Hampers', icon: '🎁' }
];

// --- Components ---

const FeaturedSection = ({ city, navigate, setSelectedProduct, setSelectedSeller }: { city: string, navigate: (s: any) => void, setSelectedProduct: any, setSelectedSeller: any }) => {
  const featuredProducts = (Object.values(MARKETPLACE_DATA) as any[]).flatMap(cat => 
    cat.sellers.flatMap((seller: any) => 
      seller.products
        .filter((p: any) => p.isFeatured && seller.city === city)
        .map((p: any) => ({ ...p, seller }))
    )
  ).slice(0, 4);

  if (featuredProducts.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-text-primary tracking-tight">⭐ Featured Near You</h3>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Handpicked local excellence</p>
        </div>
      </div>
      <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 pb-4">
        {featuredProducts.map((product: any) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setSelectedProduct(product); setSelectedSeller(product.seller); navigate('buyer-product-detail'); }}
            className="flex-shrink-0 w-72 bg-white rounded-[40px] border border-border-light overflow-hidden shadow-sm group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-accent-primary text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Featured
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest opacity-60">{product.seller.name}</p>
                <h4 className="text-sm font-bold text-text-primary tracking-tight line-clamp-1">{product.name}</h4>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-text-primary">₹{product.priceValue}</span>
                <div className="flex items-center gap-1 text-accent-primary">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold">{product.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TrendingSection = ({ city, navigate, setSelectedProduct, setSelectedSeller }: { city: string, navigate: (s: any) => void, setSelectedProduct: any, setSelectedSeller: any }) => {
  const trendingIds = TRENDING_IDS[city] || [];
  
  const products = useMemo(() => {
    const found: any[] = [];
    trendingIds.forEach(id => {
      for (const cat of Object.values(MARKETPLACE_DATA) as any[]) {
        for (const seller of cat.sellers) {
          const prod = seller.products.find((p: any) => p.id === id);
          if (prod) {
            found.push({ ...prod, sellerName: seller.name, sellerData: seller });
            break;
          }
        }
      }
    });
    return found;
  }, [city, trendingIds]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [city]);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length, city]);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[currentIndex] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - 24,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setSelectedSeller(product.sellerData);
    navigate('buyer-product-detail');
  };

  if (products.length === 0) {
    return (
      <div className="px-6 py-4">
        <EmptyState 
          icon={Sparkles}
          title="Fresh Finds Brewing"
          message="Our artisans are busy crafting new treasures for your city! Check back soon for something magical."
          actionText="Explore Categories"
          onAction={() => navigate('buyer-categories')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between px-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-text-primary tracking-tight">Trending Near You</h3>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Most loved by your community</p>
        </div>
        <button onClick={() => navigate('buyer-categories')} className="text-[10px] font-bold text-accent-primary uppercase tracking-widest hover:underline">View All</button>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 px-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="flex-shrink-0 w-[280px] snap-start bg-white rounded-[40px] border border-border-light overflow-hidden shadow-sm group relative transition-all"
            whileHover={{ y: -8, shadow: "0 25px 30px -10px rgb(0 0 0 / 0.08)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleProductClick(product)}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
              
              {/* Trending Badge */}
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border-light shadow-sm flex items-center gap-2">
                  <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">🔥 Trending</span>
                </div>
                {product.isFeatured && (
                  <div className="bg-amber-500/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/30 shadow-sm flex items-center gap-2">
                    <Sparkles size={10} className="text-white" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Featured</span>
                  </div>
                )}
                <div className="bg-emerald-500/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/30 shadow-sm flex items-center gap-2">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Available Now</span>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-border-light shadow-sm flex items-center gap-1.5">
                <Star size={12} className="text-accent-primary fill-accent-primary" />
                <span className="text-[10px] font-bold text-text-primary">{product.rating}</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.2em]">by {product.sellerName}</p>
                  <h4 className="text-lg font-bold tracking-tight leading-tight product-title">{product.name}</h4>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Price</span>
                    <span className="text-xl font-bold">₹{product.priceValue}</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-accent-primary group-hover:border-accent-primary transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BuyerProtection = ({ categoryId }: { categoryId?: string }) => {
  const getPolicy = (id?: string) => {
    switch (id) {
      case 'farm': 
        return { label: 'Non-returnable', subtext: 'Due to hygiene and safety reasons' };
      case 'natural': 
        return { label: '3-Day Return', subtext: 'Eligible if damaged or defective' };
      case 'sustainable': 
        return { label: '7-Day Return', subtext: 'Eligible if wrong item or damaged' };
      case 'crafts': 
        return { label: '7-Day Return', subtext: 'Eligible if broken or not as described' };
      default: 
        return { label: '7-Day Return', subtext: 'Eligible if damaged or defective' };
    }
  };

  const policy = getPolicy(categoryId);

  return (
    <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm">
          <ShieldCheck size={18} />
        </div>
        <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-tight">Buyer Protection</h4>
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <CheckCircle2 size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <p className="text-[10px] text-emerald-800 font-bold leading-none mb-1">
              {policy.label}
            </p>
            <p className="text-[9px] text-emerald-700/70 font-medium leading-relaxed">
              {policy.subtext}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-[9px] text-emerald-700/70 font-medium leading-relaxed">
            Payment is held securely until buyer confirms satisfaction
          </p>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, title, message, actionText, onAction }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-8 bg-accent-primary/5 rounded-[40px] border border-accent-primary/10 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent-primary/10 transition-colors" />
    <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-accent-primary/10 relative z-10 border border-border-light">
      <Icon size={32} className="text-accent-primary opacity-80" />
    </div>
    <div className="space-y-3 relative z-10">
      <h3 className="text-lg font-bold text-text-primary tracking-tight font-serif">{title}</h3>
      <p className="text-[10px] text-text-secondary leading-relaxed max-w-[220px] mx-auto opacity-70 uppercase tracking-widest font-bold small-text">{message}</p>
    </div>
    {actionText && (
      <button 
        onClick={onAction}
        className="bg-accent-primary text-white text-[9px] font-bold px-10 py-4 rounded-2xl shadow-xl shadow-accent-primary/20 hover:bg-accent-brown transition-all uppercase tracking-widest relative z-10"
      >
        {actionText}
      </button>
    )}
  </motion.div>
);

const Layout = ({ 
  children, 
  showNav = false, 
  title = "", 
  onBack, 
  showSearch = false,
  role,
  currentScreen,
  totalCartItems,
  selectedCity,
  setSelectedCity,
  searchQuery,
  handleSearch,
  setSelectedCategory,
  navigate,
  isThinking,
  toast,
  setToast,
  isCustomOrderModalOpen,
  setIsCustomOrderModalOpen,
  selectedSeller,
  isListening,
  handleVoiceSearch
}: {
  children: React.ReactNode;
  showNav?: boolean;
  title?: string;
  onBack?: () => void;
  showSearch?: boolean;
  role?: any;
  currentScreen?: any;
  totalCartItems?: any;
  selectedCity?: any;
  setSelectedCity?: any;
  searchQuery?: any;
  handleSearch?: any;
  setSelectedCategory?: any;
  navigate?: any;
  isThinking?: any;
  toast?: any;
  setToast?: any;
  isCustomOrderModalOpen?: any;
  setIsCustomOrderModalOpen?: any;
  selectedSeller?: any;
  isListening?: boolean;
  handleVoiceSearch?: () => void;
}) => {
  const hideNavScreens = ['buyer-login', 'seller-login', 'splash', 'role-selection'];
  const shouldShowNav = showNav && !hideNavScreens.includes(currentScreen);

  return (
    <div className="flex justify-center bg-bg-secondary h-screen font-body overflow-hidden">
      <div className="w-full max-w-[430px] bg-bg-primary shadow-2xl h-screen relative flex flex-col overflow-hidden md:border-x border-border-light">
        {(title || showSearch || onBack) && (
          <div className="border-b border-border-light sticky top-0 bg-bg-primary/95 backdrop-blur-md z-30">
            {showSearch ? (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {onBack && (
                      <button 
                        onClick={onBack} 
                        className="w-10 h-10 bg-bg-secondary rounded-xl flex items-center justify-center border border-border-light hover:border-accent-primary/30 transition-all active:scale-90 mr-1"
                      >
                        <ChevronLeft size={20} className="text-text-primary" />
                      </button>
                    )}
                    <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center shadow-xl shadow-accent-primary/10 overflow-hidden">
                      <div className="text-white font-serif text-2xl font-bold">N</div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-accent-primary font-bold text-xl tracking-tight leading-none font-serif" style={{ fontFamily: 'Times New Roman, serif' }}>Nearora</span>
                      <span className="text-[9px] text-accent-primary/60 font-medium uppercase tracking-[0.2em] mt-1 small-text">Curated Local Finds</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-text-primary bg-white px-4 py-2.5 rounded-2xl border border-border-light shadow-sm transition-all hover:border-accent-primary/30">
                      <MapPin size={14} className="text-accent-primary" />
                      <div className="flex flex-col">
                        <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest leading-none mb-0.5 opacity-60">Location</span>
                        <select 
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="text-[11px] font-bold bg-transparent border-none outline-none text-text-primary uppercase tracking-widest cursor-pointer small-text"
                        >
                          <option value="Ahmedabad" className="bg-white">Ahmedabad</option>
                          <option value="Pune" className="bg-white">Pune</option>
                          <option value="Chennai" className="bg-white">Chennai</option>
                          <option value="Bangalore" className="bg-white">Bangalore</option>
                          <option value="Surat" className="bg-white">Surat</option>
                        </select>
                      </div>
                    </div>
                    {role === 'buyer' && (
                      <button onClick={() => navigate('buyer-wishlist')} className="p-3 bg-bg-secondary rounded-2xl border border-border-light hover:border-accent-primary/30 transition-all">
                        <Heart size={20} className="text-text-primary" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
                  <input 
                    type="text"
                    placeholder="Search nearby products or sellers"
                    value={searchQuery}
                    onChange={(e) => {
                      handleSearch(e.target.value);
                      if (currentScreen !== 'buyer-search-results' && e.target.value.length > 0) {
                        navigate('buyer-search-results');
                      } else if (e.target.value.length === 0) {
                        navigate('buyer-home');
                      }
                    }}
                    className="w-full bg-white border border-border-light rounded-2xl py-5 pl-12 pr-12 text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-accent-primary/30 transition-all shadow-sm hover:shadow-md"
                  />
                  <button 
                    onClick={handleVoiceSearch}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors p-1 rounded-full ${isListening ? 'text-accent-primary bg-accent-primary/10 animate-pulse' : 'text-text-secondary hover:text-accent-primary'}`}
                  >
                    <Mic size={18} />
                  </button>
                  {isThinking && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                      <Loader2 size={18} className="text-accent-primary animate-spin" />
                    </div>
                  )}
                </div>
                
                {/* Category Icons below Search */}
                {currentScreen === 'buyer-home' && (
                  <div className="flex items-center justify-between px-1 overflow-x-auto no-scrollbar gap-4 py-2">
                    {[
                      { id: 'farm', icon: '🌾', label: 'Farm' },
                      { id: 'natural', icon: '🌿', label: 'Care' },
                      { id: 'crafts', icon: '🎨', label: 'Crafts' },
                      { id: 'sustainable', icon: '♻️', label: 'Eco' }
                    ].map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          navigate('buyer-categories');
                        }}
                        className="flex flex-col items-center gap-2 min-w-[60px] group"
                      >
                        <div className="w-12 h-12 bg-bg-secondary rounded-2xl flex items-center justify-center text-xl border border-border-light group-hover:border-accent-primary/30 group-hover:bg-white transition-all shadow-sm">
                          {cat.icon}
                        </div>
                        <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest opacity-60 group-hover:text-accent-primary transition-colors">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-24 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={onBack || (() => navigate(role === 'buyer' ? 'buyer-home' : 'seller-dashboard'))} 
                    className="w-12 h-12 bg-bg-secondary rounded-2xl flex items-center justify-center border border-border-light hover:border-accent-primary/30 transition-all active:scale-90"
                  >
                    <ChevronLeft size={24} className="text-text-primary" />
                  </button>
                  <h1 className="text-base font-medium text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>{title}</h1>
                </div>
                {currentScreen !== 'buyer-cart' && role === 'buyer' && (
                  <button onClick={() => navigate('buyer-wishlist')} className="w-12 h-12 bg-bg-secondary rounded-2xl flex items-center justify-center border border-border-light hover:border-accent-primary/30 transition-all">
                    <Heart size={22} className="text-text-primary" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div className={`flex-1 overflow-y-auto no-scrollbar ${shouldShowNav ? 'pb-24' : ''}`}>
          {children}
        </div>

        {role === 'buyer' && totalCartItems > 0 && !['buyer-cart', 'buyer-order-tracking', 'buyer-product-detail', 'buyer-login', 'splash', 'role-selection'].includes(currentScreen) && (
          <div className={`fixed ${shouldShowNav ? 'bottom-28' : 'bottom-8'} left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[342px] z-40`}>
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('buyer-cart')}
              className="w-full bg-accent-primary text-white p-5 rounded-[24px] shadow-[0_20px_40px_rgba(74,62,53,0.3)] flex items-center justify-between group transition-all border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                  <ShoppingBag size={20} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-70 leading-none mb-1">{totalCartItems} {totalCartItems === 1 ? 'Item' : 'Items'} in Cart</span>
                  <span className="text-sm font-bold tracking-tight">Proceed to Checkout</span>
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          </div>
        )}

        {shouldShowNav && (
          <div className="border-t border-border-light bg-bg-primary/95 backdrop-blur-md fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-24 flex items-center justify-around z-30 px-4">
            {(role === 'buyer' ? [
              { id: 'buyer-home', icon: Home, label: 'Home' },
              { id: 'buyer-categories', icon: Grid, label: 'Explore' },
              { id: 'buyer-cart', icon: ShoppingBag, label: 'Cart', badge: totalCartItems },
              { id: 'buyer-orders', icon: Package, label: 'Orders' },
              { id: 'buyer-profile', icon: User, label: 'Profile' }
            ] : [
              { id: 'seller-dashboard', icon: Home, label: 'Dashboard' },
              { id: 'seller-add-product', icon: Plus, label: 'Add' },
              { id: 'seller-manage-shop', icon: Settings, label: 'Manage' },
              { id: 'seller-profile', icon: User, label: 'Profile' }
            ]).map((item) => (
              <button 
                key={item.id}
                onClick={() => navigate(item.id as any)}
                className={`flex flex-col items-center gap-1.5 transition-all relative ${currentScreen === item.id ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {currentScreen === item.id && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute -top-3 w-1 h-1 bg-accent-primary rounded-full"
                  />
                )}
                <div className={`transition-transform ${currentScreen === item.id ? 'scale-110' : ''} relative`}>
                  <item.icon size={22} strokeWidth={currentScreen === item.id ? 2.5 : 2} />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-accent-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-bg-primary">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: shouldShowNav ? -100 : -20, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute left-6 right-6 bg-bg-primary border border-border-light text-text-primary px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-4"
            >
              <div className="w-8 h-8 bg-accent-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 size={18} className="text-accent-primary" />
              </div>
              <span className="text-sm font-medium">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <RequestCustomOrderModal 
          isOpen={isCustomOrderModalOpen}
          onClose={() => setIsCustomOrderModalOpen(false)}
          onSubmit={(details: any) => {
            console.log("Custom Order Request:", details);
            setIsCustomOrderModalOpen(false);
            setToast("Custom order request sent to " + selectedSeller?.name + "!");
          }}
          sellerName={selectedSeller?.name}
        />
      </div>
    </div>
  );
};

const DiscoverShopsSection = ({ city, navigate, setSelectedSeller }: { city: string, navigate: (s: any) => void, setSelectedSeller: (s: any) => void }) => {
  const filteredShopIds = DISCOVER_SHOP_IDS.filter(shop => shop.city === city);

  const shops = useMemo(() => {
    const found: any[] = [];
    filteredShopIds.forEach(shopId => {
      for (const cat of Object.values(MARKETPLACE_DATA) as any[]) {
        const seller = cat.sellers.find((s: any) => s.id === shopId.id);
        if (seller) {
          found.push({ ...seller, categoryName: cat.name });
          break;
        }
      }
    });
    return found;
  }, [city, filteredShopIds]);

  if (shops.length === 0) {
    return (
      <div className="px-6 py-4">
        <EmptyState 
          icon={Store}
          title="New Shops Incoming"
          message="We're curating the finest local artisans in your area. The next big find is just around the corner!"
          actionText="Browse All"
          onAction={() => navigate('buyer-categories')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between px-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-text-primary tracking-tight">Nearby Sellers</h3>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Handpicked artisans in {city}</p>
        </div>
        <button onClick={() => navigate('buyer-categories')} className="text-[10px] font-bold text-accent-primary uppercase tracking-widest hover:underline">View All</button>
      </div>
      <div className="flex gap-5 overflow-x-auto no-scrollbar pb-6 px-6">
        {shops.map((shop) => (
          <motion.div
            key={shop.id}
            className="flex-shrink-0 w-[260px] bg-white rounded-[40px] border border-border-light overflow-hidden shadow-sm group transition-all"
            whileHover={{ y: -8, shadow: "0 25px 30px -10px rgb(0 0 0 / 0.08)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setSelectedSeller(shop);
              navigate('buyer-seller-menu');
            }}
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img 
                src={shop.image} 
                alt={shop.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40" />
              
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-border-light shadow-sm flex items-center gap-1.5">
                <Star size={12} className="text-accent-primary fill-accent-primary" />
                <span className="text-[10px] font-bold text-text-primary">{shop.rating}</span>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {shop.isVerified && (
                  <div className="bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-border-light shadow-sm flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-text-primary uppercase tracking-widest">Verified</span>
                  </div>
                )}
                <div className="bg-emerald-500/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-emerald-400/30 shadow-sm flex items-center gap-1.5">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Open Now</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-text-primary tracking-tight product-title leading-tight">{shop.name}</h4>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">{shop.categoryName}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border-light">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-accent-primary" />
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{shop.dist}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-accent-primary font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>Visit Shop</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BuyerLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col h-full bg-bg-primary p-8 justify-center space-y-12">
      <div className="space-y-4 text-center">
        <div className="w-20 h-20 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 mx-auto mb-8">
          <span className="text-white font-serif text-5xl font-bold">N</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Welcome to Nearora</h1>
        <p className="text-text-secondary text-sm max-w-[240px] mx-auto leading-relaxed">Discover extraordinary artisan products from your local community.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 pl-12 pr-4 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 pl-12 pr-4 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all"
            />
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full bg-accent-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all"
        >
          Sign In
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
          <span>Don't have an account?</span>
          <button className="text-accent-primary font-bold hover:underline">Create One</button>
        </div>
      </div>
    </div>
  );
};

const SellerLogin = ({ onLogin, setOnboardingData }: { onLogin: () => void, setOnboardingData: (data: any) => void }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="flex flex-col h-full bg-bg-primary p-8 justify-center space-y-12 relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="space-y-4 text-center relative z-10">
        <div className="w-20 h-20 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 mx-auto mb-8">
          <span className="text-white font-serif text-5xl font-bold">N</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Grow your local business with Nearora</h1>
        <p className="text-text-secondary text-sm max-w-[280px] mx-auto leading-relaxed">Reach nearby customers and manage your business easily</p>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="space-y-4">
          {!showOtp ? (
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
              <input 
                type="tel" 
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-border-light rounded-2xl py-5 pl-12 pr-4 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all shadow-sm focus:shadow-md"
              />
            </div>
          ) : (
            <div className="relative group">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white border border-border-light rounded-2xl py-5 pl-12 pr-4 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all shadow-sm focus:shadow-md text-center tracking-[1em] font-bold"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => {
              if (!showOtp) {
                setShowOtp(true);
              } else {
                setOnboardingData((prev: any) => ({ ...prev, phone }));
                onLogin();
              }
            }}
            className="w-full bg-accent-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <span>{showOtp ? "Continue" : "Continue with OTP"}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[10px] text-text-secondary text-center font-medium opacity-60">
            Free to start • Secure login • No hidden charges
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-text-secondary pt-4">
          <span>New to Nearora?</span>
          <button className="text-accent-primary font-bold hover:underline">Register Your Shop</button>
        </div>
      </div>
    </div>
  );
};

const SellerBasicInfo = ({ onContinue, data, setData }: { onContinue: () => void, data: any, setData: (data: any) => void }) => {
  return (
    <div className="flex flex-col h-full bg-bg-primary p-8 justify-center space-y-12">
      <div className="space-y-4 text-center">
        <div className="w-20 h-20 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 mx-auto mb-8">
          <span className="text-white font-serif text-5xl font-bold">N</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Basic Information</h1>
        <p className="text-text-secondary text-sm leading-relaxed">Tell us a bit about yourself and your shop.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Your Name"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 px-6 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Shop Name (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. The Artisan's Corner"
              value={data.shopName}
              onChange={(e) => setData({ ...data, shopName: e.target.value })}
              className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 px-6 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">City</label>
              <input 
                type="text" 
                placeholder="City"
                value={data.city}
                onChange={(e) => setData({ ...data, city: e.target.value })}
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 px-6 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Pincode</label>
              <input 
                type="text" 
                placeholder="Pincode"
                value={data.pincode}
                onChange={(e) => setData({ ...data, pincode: e.target.value })}
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 px-6 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Address</label>
            <textarea 
              placeholder="Full Address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="w-full bg-bg-secondary border border-border-light rounded-2xl py-4 px-6 text-sm text-text-primary focus:border-accent-primary/30 outline-none transition-all min-h-[100px] resize-none"
            />
          </div>
        </div>

        <button 
          onClick={onContinue}
          className="w-full bg-accent-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const SellerVerification = ({ onVerify, onLater, setDoc, toast }: { onVerify: () => void, onLater: () => void, setDoc: (doc: string) => void, toast: (msg: string) => void }) => {
  const [step, setStep] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const docs = [
    { id: 'aadhaar', name: 'Aadhaar', icon: <User size={18} /> },
    { id: 'pan', name: 'PAN', icon: <CreditCard size={18} /> },
    { id: 'bank', name: 'Bank Proof', icon: <FileText size={18} /> },
    { id: 'gst', name: 'GST (Optional)', icon: <Shield size={18} /> },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (showGuide) {
    return (
      <div className="flex flex-col h-full bg-bg-primary p-8">
        <button onClick={() => setShowGuide(false)} className="mb-8 flex items-center gap-2 text-text-secondary">
          <ChevronLeft size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </button>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-text-primary tracking-tight font-serif">How to get verified</h2>
            <p className="text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">Follow these simple steps</p>
          </div>

          <div className="space-y-6">
            {[
              { step: "01", title: "Select Document", desc: "Choose any one valid government ID (Aadhaar, PAN, GST, etc.)" },
              { step: "02", title: "Upload Photo", desc: "Take a clear photo of the document. Ensure all details are visible." },
              { step: "03", title: "Submit for Review", desc: "Our team will verify your details within 24-48 hours." },
              { step: "04", title: "Get Verified Badge", desc: "Once approved, a blue tick will appear on your shop profile." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 p-6 bg-bg-secondary rounded-[32px] border border-border-light">
                <span className="text-2xl font-serif font-bold text-accent-primary opacity-30">{item.step}</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">{item.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowGuide(false)}
            className="w-full bg-accent-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all"
          >
            Got it, Let's Start
          </button>
        </div>
      </div>
    );
  }

  const Logo = () => (
    <div className="w-20 h-20 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 mx-auto mb-8">
      <span className="text-white font-serif text-5xl font-bold">N</span>
    </div>
  );

  if (step === 2) {
    return (
      <div className="flex flex-col h-full bg-bg-primary p-8 justify-center space-y-12">
        <div className="space-y-4 text-center">
          <Logo />
          <h1 className="text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Upload {docs.find(d => d.id === selectedDoc)?.name}</h1>
          <p className="text-text-secondary text-sm leading-relaxed">Please upload a clear photo of your document for verification.</p>
        </div>

        <div className="space-y-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video bg-bg-secondary border-2 border-dashed border-accent-primary/20 rounded-[32px] flex flex-col items-center justify-center gap-4 group hover:border-accent-primary transition-all cursor-pointer relative overflow-hidden shadow-sm"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            {photo ? (
              <img src={photo} alt="Document" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="p-4 bg-bg-primary rounded-2xl text-accent-primary shadow-sm">
                  {uploading ? <Loader2 className="animate-spin" size={24} /> : <Camera size={24} />}
                </div>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  {uploading ? 'Uploading...' : 'Tap to capture or upload'}
                </span>
              </>
            )}
          </div>

          <div className="space-y-4">
            <button 
              onClick={onVerify}
              disabled={!photo || uploading}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                photo && !uploading
                  ? 'bg-accent-primary text-white shadow-xl shadow-accent-primary/20 active:scale-[0.98]' 
                  : 'bg-bg-secondary text-text-secondary cursor-not-allowed'
              }`}
            >
              Submit for Verification
            </button>
            <button 
              onClick={() => setStep(1)}
              className="w-full text-text-secondary text-xs font-bold hover:text-text-primary transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary p-8 justify-center space-y-12">
      <div className="space-y-4 text-center">
        <Logo />
        <h1 className="text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Build trust with customers</h1>
        <p className="text-text-secondary text-sm leading-relaxed">Get verified to increase visibility and customer trust</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Upload any one document</h3>
          <div className="grid grid-cols-1 gap-3">
            {docs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc.id)}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  selectedDoc === doc.id 
                    ? 'bg-accent-primary/5 border-accent-primary shadow-sm' 
                    : 'bg-bg-secondary border-border-light hover:border-accent-primary/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${selectedDoc === doc.id ? 'bg-accent-primary text-white' : 'bg-bg-primary text-text-secondary'}`}>
                    {doc.icon}
                  </div>
                  <span className={`text-sm font-bold ${selectedDoc === doc.id ? 'text-text-primary' : 'text-text-secondary'}`}>{doc.name}</span>
                </div>
                {selectedDoc === doc.id && <CheckCircle size={20} className="text-accent-primary" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={() => {
              if (selectedDoc) {
                setDoc(selectedDoc);
                setStep(2);
              }
            }}
            disabled={!selectedDoc}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
              selectedDoc 
                ? 'bg-accent-primary text-white shadow-xl shadow-accent-primary/20 active:scale-[0.98]' 
                : 'bg-bg-secondary text-text-secondary cursor-not-allowed'
            }`}
          >
            Verify Now
          </button>

          <div className="text-center space-y-4">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Don't have documents?</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowGuide(true)}
                className="text-accent-primary text-xs font-bold hover:underline"
              >
                Learn how to get verified
              </button>
              <button 
                onClick={onLater}
                className="text-text-secondary text-xs font-medium hover:text-text-primary transition-colors"
              >
                Do it later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerVerificationSuccess = ({ onDashboard }: { onDashboard: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-bg-primary p-8 justify-center items-center text-center space-y-12">
      <div className="w-20 h-20 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 mx-auto">
        <span className="text-white font-serif text-5xl font-bold">N</span>
      </div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20"
      >
        <Check size={48} />
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Verification Submitted 🎉</h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-[280px] mx-auto">
          Thanks for verifying your shop. We’ll review your details and notify you soon.
        </p>
        <p className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">
          You can continue selling while verification is in progress.
        </p>
      </div>

      <button 
        onClick={onDashboard}
        className="w-full bg-accent-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

const BuyerWishlist = ({ wishlist, MARKETPLACE_DATA, setSelectedProduct, navigate, toggleWishlist }: any) => {
  const wishlistedProducts = useMemo(() => {
    return Object.values(MARKETPLACE_DATA).flatMap((cat: any) => 
      cat.sellers.flatMap((s: any) => 
        s.products.map((p: any) => ({ ...p, seller: s }))
      )
    ).filter((p: any) => wishlist.includes(p.id));
  }, [wishlist, MARKETPLACE_DATA]);

  return (
    <div className="p-6 space-y-8 pb-32">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight font-serif">Your Wishlist</h2>
        <p className="text-xs text-text-secondary uppercase tracking-widest font-bold opacity-40">{wishlistedProducts.length} Items Saved</p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="px-2">
          <EmptyState 
            icon={Heart}
            title="Your Wishlist is Waiting"
            message="Your future favorites are out there! Start exploring and save the pieces that speak to you."
            actionText="Start Exploring"
            onAction={() => navigate('buyer-home')}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {wishlistedProducts.map((product: any) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3 group"
              onClick={() => { setSelectedProduct(product); navigate('buyer-product-detail'); }}
            >
              <div className="aspect-square rounded-[24px] overflow-hidden border border-border-light shadow-sm relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-red-500"
                >
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text-primary truncate uppercase tracking-tight">{product.name}</h4>
                <p className="text-[10px] text-text-secondary font-medium">₹{product.priceValue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuantitySelector = ({ productId, product, sellerInfo, updateCart, quantity }: any) => {
  if (quantity === 0) {
    return (
      <button 
        onClick={() => updateCart(product, 1, sellerInfo)}
        className="bg-accent-primary text-white text-[10px] font-bold px-6 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-accent-primary/10"
      >
        ADD
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-bg-secondary px-3 py-2 rounded-xl border border-border-light shadow-sm">
      <button 
        onClick={() => updateCart(product, -1, sellerInfo)}
        className="text-text-secondary font-bold w-6 h-6 flex items-center justify-center hover:text-accent-primary transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="text-xs font-bold text-text-primary w-6 text-center">{quantity}</span>
      <button 
        onClick={() => updateCart(product, 1, sellerInfo)}
        className="text-text-secondary font-bold w-6 h-6 flex items-center justify-center hover:text-accent-primary transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

const TermsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-primary/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-navy-secondary w-full max-w-md max-h-[80vh] rounded-[32px] border border-accent-primary/20 overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-accent-primary/10 flex items-center justify-between">
              <h3 className="text-lg font-black text-text-primary uppercase tracking-widest">Terms & Conditions</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-accent-primary transition-colors">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto no-scrollbar space-y-6 text-text-secondary text-xs leading-relaxed">
              <section className="space-y-2">
                <h4 className="text-accent-primary font-bold uppercase tracking-widest">1. Introduction</h4>
                <p>Welcome to Nearora. By using our platform, you agree to these terms. Nearora is a curated marketplace connecting local artisans with conscious consumers.</p>
              </section>
              <section className="space-y-2">
                <h4 className="text-accent-primary font-bold uppercase tracking-widest">2. Artisan Quality</h4>
                <p>All products on Nearora are handcrafted or locally produced. We verify our artisans to ensure premium quality and authenticity.</p>
              </section>
              <section className="space-y-2">
                <h4 className="text-accent-primary font-bold uppercase tracking-widest">3. Orders & Delivery</h4>
                <p>Orders are fulfilled by artisans and delivered via our logistics partners. Delivery times may vary based on the handcrafted nature of products.</p>
              </section>
              <section className="space-y-2">
                <h4 className="text-accent-primary font-bold uppercase tracking-widest">4. Product Verification</h4>
                <p>To maintain our premium standards, every product listed on Nearora must undergo a verification process. Our curation team will review your items for quality, authenticity, and alignment with our community values before they are approved for sale.</p>
              </section>
              <section className="space-y-2">
                <h4 className="text-accent-primary font-bold uppercase tracking-widest">5. Privacy Policy</h4>
                <p>Your data is secure with us. We use your information only to improve your shopping experience and fulfill orders.</p>
              </section>
              <p className="pt-4 text-[10px] opacity-50 italic">Last updated: March 2024</p>
            </div>
            <div className="p-6 bg-navy-primary/50">
              <button 
                onClick={onClose}
                className="w-full bg-accent-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 active:scale-95 transition-all"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EditProductModal = ({ isOpen, onClose, product, onSave }: { isOpen: boolean; onClose: () => void; product: any; onSave: (updated: any) => void }) => {
  const [edited, setEdited] = useState(product);

  useEffect(() => {
    if (product) setEdited(product);
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-bg-primary w-full max-w-md rounded-[40px] border border-border-light p-10 relative z-10 shadow-2xl space-y-10"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-text-primary tracking-tight">Edit Product</h3>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Update your artisan creation</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Product Name</label>
                <input 
                  type="text" 
                  value={edited?.name || ''} 
                  onChange={(e) => setEdited({...edited, name: e.target.value})}
                  className="w-full bg-bg-secondary border border-border-light rounded-2xl p-5 text-sm text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={edited?.price || 0} 
                    onChange={(e) => setEdited({...edited, price: parseInt(e.target.value) || 0})}
                    className="w-full bg-bg-secondary border border-border-light rounded-2xl p-5 text-sm text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Stock</label>
                  <input 
                    type="number" 
                    value={edited?.stock || 0} 
                    onChange={(e) => setEdited({...edited, stock: parseInt(e.target.value) || 0})}
                    className="w-full bg-bg-secondary border border-border-light rounded-2xl p-5 text-sm text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Product Image URL</label>
                <input 
                  type="text" 
                  value={edited?.img || ''} 
                  onChange={(e) => setEdited({...edited, img: e.target.value})}
                  className="w-full bg-bg-secondary border border-border-light rounded-2xl p-5 text-sm text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={onClose}
                className="flex-1 py-5 rounded-2xl font-bold text-xs text-text-secondary hover:bg-bg-secondary transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button 
                onClick={() => onSave(edited)}
                className="flex-1 bg-accent-primary text-white py-5 rounded-2xl font-bold text-xs shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const RequestCustomOrderModal = ({ isOpen, onClose, onSubmit, sellerName }: any) => {
  const [details, setDetails] = useState({
    description: '',
    preferredDate: '',
    budget: '',
    referenceImage: null as string | null
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-text-primary/40 backdrop-blur-md"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="p-8 border-b border-border-light flex items-center justify-between bg-bg-secondary/30">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-text-primary tracking-tight">Request Custom Order</h2>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">To: {sellerName}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
              <X size={20} className="text-text-secondary" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">What are you looking for?</label>
              <textarea 
                placeholder="Describe your custom request in detail (e.g., size, color, materials...)"
                value={details.description}
                onChange={(e) => setDetails({...details, description: e.target.value})}
                className="w-full bg-bg-secondary border border-border-light rounded-3xl p-6 text-sm text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none min-h-[150px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Preferred Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-primary opacity-40" />
                  <input 
                    type="date"
                    value={details.preferredDate}
                    onChange={(e) => setDetails({...details, preferredDate: e.target.value})}
                    className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 pl-12 pr-5 text-xs text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Estimated Budget (₹)</label>
                <input 
                  type="number"
                  placeholder="e.g. 5000"
                  value={details.budget}
                  onChange={(e) => setDetails({...details, budget: e.target.value})}
                  className="w-full bg-bg-secondary border border-border-light rounded-2xl p-5 text-xs text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Reference Images (Optional)</label>
              <div className="border-2 border-dashed border-border-light rounded-3xl p-8 flex flex-col items-center justify-center gap-3 bg-bg-secondary/20 hover:bg-bg-secondary/40 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Upload size={20} className="text-accent-primary opacity-60" />
                </div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Upload Reference</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-bg-secondary/30 border-t border-border-light flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-5 rounded-2xl font-bold text-[10px] text-text-secondary hover:bg-white transition-all uppercase tracking-widest border border-border-light"
            >
              Cancel
            </button>
            <button 
              onClick={() => onSubmit(details)}
              disabled={!details.description}
              className="flex-1 bg-accent-primary text-white py-5 rounded-2xl font-bold text-[10px] shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest disabled:opacity-50 disabled:hover:scale-100"
            >
              Send Request
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSellerApproved, setIsSellerApproved] = useState(false);
  const [sellerStatus, setSellerStatus] = useState<'pending' | 'verified' | 'trusted'>('pending');
  const [sellerOnboardingData, setSellerOnboardingData] = useState({
    fullName: '',
    shopName: '',
    city: '',
    pincode: '',
    address: '',
    phone: ''
  });
  const [verificationDoc, setVerificationDoc] = useState<string | null>(null);
  const [isSellerUnderReview, setIsSellerUnderReview] = useState(false);
  const [sellerVerificationStep, setSellerVerificationStep] = useState(1);
  const [sellerData, setSellerData] = useState<any>({
    name: '',
    shopName: '',
    shopDescription: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryRadius: '',
    profilePhoto: null,
    shopBanner: null,
    uploadedDocs: [],
    verificationMethod: null,
    noDocsMode: false,
    uploadLater: false
  });
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [cart, setCart] = useState<any[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [searchQuery, setSearchQuery] = useState('');
  const [addresses, setAddresses] = useState([
    { id: '1', label: 'Home', address: 'Flat 402, Tower B, Green Valley Apartments, Sector 45, Gurgaon', isDefault: true },
    { id: '2', label: 'Office', address: '12th Floor, Cyber Hub, Phase 3, Gurgaon', isDefault: false }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('1');
  const [isSearching, setIsSearching] = useState(false);
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });
  const [showTerms, setShowTerms] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [orders, setOrders] = useState<any[]>([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [selectedOrderToCancel, setSelectedOrderToCancel] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addProductCategory, setAddProductCategory] = useState('Farm Fresh & Kitchen');
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('10');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductAttributes, setNewProductAttributes] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const bannerPhotoRef = useRef<HTMLInputElement>(null);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setToast("Voice search is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setToast("Listening...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
      if (currentScreen !== 'buyer-search-results') {
        setCurrentScreen('buyer-search-results');
      }
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      setToast("Could not hear you. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Recognition start error", e);
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toggleWishlist = (productId: string) => {
    const isWishlisted = wishlist.includes(productId);
    setWishlist(prev => 
      isWishlisted 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
    setToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const buyerAddress = addresses.find(a => a.id === selectedAddressId)?.address || '';

  const allProducts = useMemo(() => {
    return Object.values(MARKETPLACE_DATA).flatMap((cat: any) => 
      cat.sellers
        .filter((seller: any) => !selectedCity || seller.city === selectedCity)
        .flatMap((seller: any) => 
          seller.products.map((p: any) => ({ ...p, category: cat.id, seller: seller }))
        )
    );
  }, [MARKETPLACE_DATA, selectedCity]);

  const deleteProduct = (id: string) => {
    setSellerProducts(prev => prev.filter(p => p.id !== id));
    setToast("Product deleted successfully");
  };

  const toggleStock = (id: string) => {
    setSellerProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: p.stock > 0 ? 0 : 10 };
      }
      return p;
    }));
    setToast("Stock status updated");
  };

  const saveAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      setToast("Please fill all fields");
      return;
    }
    const id = (addresses.length + 1).toString();
    const added = { ...newAddress, id, isDefault: addresses.length === 0 };
    setAddresses([...addresses, added]);
    setSelectedAddressId(id);
    setNewAddress({ label: '', address: '' });
    setToast("Address added successfully!");
    setCurrentScreen('buyer-address-management');
  };

  const deleteAddress = (id: string) => {
    if (addresses.length <= 1) {
      setToast("At least one address is required");
      return;
    }
    setAddresses(addresses.filter(a => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(addresses.find(a => a.id !== id)?.id || '');
    }
    setToast("Address deleted");
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Basic local filter
    const localResults = allProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(localResults);

    // If query is complex (more than 3 words), use Gemini Thinking Mode
    if (query.split(' ').length > 3) {
      setIsThinking(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: "gemini-3.1-pro-preview",
          contents: `You are a helpful shopping assistant for a hyperlocal marketplace. 
          The user is looking for products with this query: "${query}".
          Here is the list of available products: ${JSON.stringify(allProducts.map(p => ({ id: p.id, name: p.name, category: p.category, desc: p.desc })))}.
          Return a JSON array of product IDs that best match the user's intent, even if the match is conceptual (e.g., "healthy" matching organic items).
          Return ONLY the JSON array.`,
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
            responseMimeType: "application/json"
          }
        });

        const matchedIds = JSON.parse(response.text || '[]');
        const aiResults = allProducts.filter(p => matchedIds.includes(p.id));
        
        // Merge and deduplicate
        setSearchResults(prev => {
          const combined = [...prev, ...aiResults];
          return Array.from(new Map(combined.map(item => [item.id, item])).values());
        });
      } catch (error) {
        console.error("AI Search Error:", error);
      } finally {
        setIsThinking(false);
      }
    }
  };

  const updateCart = (product: any, delta: number, sellerInfo?: any, addOns: any[] = []) => {
    setCart(prev => {
      const addonTotal = addOns.reduce((sum, a) => sum + (a.price || 0), 0);
      const itemPrice = (product.priceValue || 0) + addonTotal;
      
      // For items with addons, we treat them as unique entries if addons differ
      // For simplicity in this prototype, we'll just check product.id and addOns equality
      const existingItem = prev.find(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedAddOns) === JSON.stringify(addOns)
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter(item => item !== existingItem);
        }
        return prev.map(item => 
          item === existingItem 
            ? { ...item, quantity: newQuantity, totalPrice: itemPrice * newQuantity } 
            : item
        );
      } else if (delta > 0) {
        const newItem = {
          ...product,
          sellerName: sellerInfo?.name || selectedSeller?.name,
          sellerId: sellerInfo?.name || selectedSeller?.name,
          distValue: sellerInfo?.distValue || selectedSeller?.distValue,
          quantity: 1,
          selectedAddOns: addOns,
          addonTotal: addonTotal,
          totalPrice: itemPrice
        };
        setToast(`${product.name} added to cart!`);
        setTimeout(() => setToast(null), 2000);
        return [...prev, newItem];
      }
      return prev;
    });
  };

  const getProductQuantity = (productId: string) => {
    return cart.find(item => item.id === productId)?.quantity || 0;
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const calculateDeliveryFee = (distance: number) => {
    const baseFee = 20;
    if (distance <= 2) return baseFee;
    return baseFee + Math.ceil(distance - 2) * 5;
  };

  const getEstimatedTime = (distance: number) => {
    if (distance <= 3) return '20–30 mins';
    if (distance <= 6) return '30–45 mins';
    return '45–60 mins';
  };

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('role-selection');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const OrderSuccessModal = ({ isOpen, onClose, orderId }: { isOpen: boolean, onClose: () => void, orderId: string }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy-primary/80 backdrop-blur-md">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-[340px] rounded-[40px] p-10 text-center space-y-8 shadow-2xl border border-border-light"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-text-primary tracking-tight">Order Confirmed!</h2>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest leading-relaxed">
              Your order <span className="text-accent-primary">#{orderId}</span> has been successfully placed. Our artisans are now preparing your curated picks.
            </p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => { onClose(); navigate('buyer-orders'); }}
              className="w-full bg-accent-primary text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View My Orders
            </button>
            <button 
              onClick={() => { onClose(); navigate('buyer-home'); }}
              className="w-full bg-bg-secondary text-text-secondary py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-border-light transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const CancelOrderModal = ({ isOpen, onClose, onConfirm, orderId }: { isOpen: boolean, onClose: () => void, onConfirm: (reason: string) => void, orderId: string }) => {
    const [reason, setReason] = useState('');
    const reasons = [
      "Changed my mind",
      "Found a better price elsewhere",
      "Order taking too long",
      "Incorrect delivery address",
      "Ordered by mistake",
      "Other"
    ];

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy-primary/80 backdrop-blur-md">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-[360px] rounded-[40px] p-8 space-y-8 shadow-2xl border border-border-light"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-black text-text-primary tracking-tight">Cancel Order #{orderId}</h2>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Please select a reason for cancellation</p>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${reason === r ? 'border-accent-primary bg-accent-primary/5' : 'border-border-light bg-bg-secondary hover:border-accent-primary/20'}`}
              >
                <span className={`text-xs font-bold ${reason === r ? 'text-accent-primary' : 'text-text-primary'}`}>{r}</span>
                {reason === r && <CheckCircle2 size={16} className="text-accent-primary" />}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <button 
              disabled={!reason}
              onClick={() => onConfirm(reason)}
              className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${reason ? 'bg-red-500 text-white shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98]' : 'bg-bg-secondary text-text-secondary opacity-50 cursor-not-allowed'}`}
            >
              Confirm Cancellation
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-bg-secondary text-text-secondary py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-border-light transition-all"
            >
              Keep My Order
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const cancelOrder = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled', cancellationReason: reason } : order
    ));
    setToast("Order cancelled successfully");
    setShowCancelModal(false);
    setSelectedOrderToCancel(null);
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const layoutProps = {
    role,
    currentScreen,
    totalCartItems,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    handleSearch,
    setSelectedCategory,
    navigate,
    isThinking,
    toast,
    setToast,
    isCustomOrderModalOpen,
    setIsCustomOrderModalOpen,
    selectedSeller,
    isListening,
    handleVoiceSearch
  };

  // --- Screens ---

  if (currentScreen === 'splash') {
    return (
      <Layout {...layoutProps}>
        <div className="flex flex-col items-center justify-center h-full relative">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-28 h-28 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/30 relative z-10"
          >
            <span className="text-white font-serif text-6xl font-bold">N</span>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-center z-10"
          >
            <h1 className="text-4xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Nearora</h1>
            <p className="text-accent-primary/60 text-xs uppercase tracking-[0.3em] mt-2 font-medium">Premium Local Marketplace</p>
          </motion.div>
          
          <div className="absolute bottom-12 flex flex-col items-center gap-4">
            <Loader2 className="text-accent-primary animate-spin" size={24} />
            <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold opacity-50">Curating Excellence</span>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-primary/5 rounded-full blur-[120px]" />
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'role-selection') {
    return (
      <Layout {...layoutProps}>
        <div className="flex flex-col h-full p-8 justify-center space-y-12">
          <div className="space-y-4 text-center">
            <div className="w-20 h-20 bg-accent-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-accent-primary/20 mx-auto mb-8">
              <span className="text-white font-serif text-5xl font-bold">N</span>
            </div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Nearora</h1>
            <p className="text-text-secondary text-sm max-w-[240px] mx-auto leading-relaxed">The premium marketplace for local artisan treasures.</p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => { setRole('buyer'); navigate('buyer-login'); }}
              className="w-full bg-accent-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all group"
            >
              <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Enter as Buyer</span>
            </button>
            <button 
              onClick={() => { setRole('seller'); navigate('seller-login'); }}
              className="w-full bg-bg-secondary text-text-primary font-bold py-5 rounded-2xl flex items-center justify-center gap-3 border border-border-light hover:border-accent-primary/30 active:scale-[0.98] transition-all group"
            >
              <Store size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Enter as Seller</span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-login') {
    return (
      <Layout {...layoutProps} onBack={() => navigate('role-selection')}>
        <BuyerLogin onLogin={() => navigate('buyer-home')} />
      </Layout>
    );
  }

  if (currentScreen === 'seller-login') {
    return (
      <Layout {...layoutProps} onBack={() => navigate('role-selection')}>
        <SellerLogin onLogin={() => navigate('seller-basic-info')} setOnboardingData={setSellerOnboardingData} />
      </Layout>
    );
  }

  if (currentScreen === 'seller-basic-info') {
    return <SellerBasicInfo onContinue={() => navigate('seller-verification')} data={sellerOnboardingData} setData={setSellerOnboardingData} />;
  }

  if (currentScreen === 'seller-verification') {
    return (
      <SellerVerification 
        onVerify={() => navigate('seller-verification-success')} 
        onLater={() => navigate('seller-dashboard')} 
        setDoc={setVerificationDoc} 
        toast={setToast}
      />
    );
  }

  if (currentScreen === 'seller-verification-success') {
    return <SellerVerificationSuccess onDashboard={() => navigate('seller-dashboard')} />;
  }

  if (currentScreen === 'buyer-wishlist') {
    return (
      <Layout {...layoutProps} showNav title="Your Wishlist">
        <BuyerWishlist 
          wishlist={wishlist} 
          MARKETPLACE_DATA={MARKETPLACE_DATA} 
          setSelectedProduct={setSelectedProduct} 
          navigate={navigate} 
          toggleWishlist={toggleWishlist} 
        />
      </Layout>
    );
  }

  if (currentScreen === 'buyer-home') {
    return (
      <Layout {...layoutProps} showNav showSearch>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pb-12 space-y-12 py-6"
        >
          <FeaturedSection city={selectedCity} navigate={navigate} setSelectedProduct={setSelectedProduct} setSelectedSeller={setSelectedSeller} />
          <TrendingSection city={selectedCity} navigate={navigate} setSelectedProduct={setSelectedProduct} setSelectedSeller={setSelectedSeller} />
          
          <div className="px-6 py-2 text-center">
            <p className="text-[10px] font-bold text-accent-primary uppercase tracking-[0.3em] opacity-40">Support Local Businesses • Made with care</p>
          </div>

          <DiscoverShopsSection city={selectedCity} navigate={navigate} setSelectedSeller={setSelectedSeller} />

          <div className="px-6">
            <div className="bg-white border border-border-light p-8 rounded-[40px] space-y-6 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent-primary/10 transition-colors" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary tracking-tight">Categories</h3>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Discover hidden gems near you</p>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed small-text">Looking for something specific? Dive into our curated collections of local treasures.</p>
                <button 
                  onClick={() => navigate('buyer-categories')}
                  className="w-full bg-accent-primary text-white text-[10px] font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 hover:bg-accent-brown transition-all uppercase tracking-widest"
                >
                  Browse All Categories
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-search-results') {
    return (
      <Layout {...layoutProps} showNav showSearch onBack={() => { setSearchQuery(''); navigate(role === 'buyer' ? 'buyer-home' : 'seller-dashboard'); }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-4 space-y-6"
        >
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black text-text-primary uppercase tracking-[0.3em] small-text">
              {isThinking ? (
                <span className="flex items-center gap-3 text-accent-primary">
                  <Sparkles size={16} className="animate-pulse" />
                  Curating Results...
                </span>
              ) : (
                `Search: ${searchQuery}`
              )}
            </h3>
            <span className="text-[9px] font-black text-accent-primary uppercase tracking-widest opacity-40 small-text">{searchResults.length} items found</span>
          </div>

          {searchResults.length === 0 && !isThinking ? (
            <div className="px-2">
              <EmptyState 
                icon={Search}
                title="A New Discovery Awaits"
                message="We couldn't find a match this time, but our artisans are always adding new treasures. Try a different search!"
                actionText="Back to Home"
                onAction={() => { setSearchQuery(''); navigate('buyer-home'); }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {searchResults.map((product) => (
                <motion.div 
                  key={product.id} 
                  className="bg-bg-primary border border-border-light rounded-[40px] overflow-hidden shadow-sm flex flex-col group transition-all"
                  whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedProduct(product); setSelectedSeller(product.seller); navigate('buyer-product-detail'); }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border-light flex items-center gap-2 shadow-sm">
                      <div className={`w-2 h-2 rounded-full ${product.isVeg ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} />
                      <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest small-text">{product.isVeg ? 'VEG' : 'ARTISAN'}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className="bg-white/90 backdrop-blur-md p-3 rounded-full border border-border-light shadow-sm hover:scale-110 transition-all active:scale-90"
                      >
                        <Heart size={18} className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-text-secondary hover:text-red-500 transition-colors"} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[9px] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border-light font-bold text-accent-primary uppercase tracking-widest shadow-sm">Made in {product.seller.city}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-[10px] text-text-secondary font-medium uppercase tracking-widest small-text">by {product.seller.name}</p>
                        <h4 className="font-medium text-xl text-text-primary tracking-tight product-title">{product.name}</h4>
                      </div>
                      {product.tags && (
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag: string, idx: number) => (
                            <span key={idx} className="text-[8px] font-bold text-accent-primary bg-accent-primary/5 px-2 py-1 rounded-lg border border-accent-primary/10 uppercase tracking-widest">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-border-light">
                      <span className="font-medium text-2xl text-text-primary">₹{product.priceValue}</span>
                      <button className="bg-accent-primary text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-accent-brown transition-all shadow-lg shadow-accent-primary/10">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-categories') {
    const filteredSellers = selectedCategory 
      ? MARKETPLACE_DATA[selectedCategory].sellers.filter((s: any) => s.city === selectedCity)
      : [];

    return (
      <Layout {...layoutProps} showNav title={selectedCategory ? MARKETPLACE_DATA[selectedCategory].name : "Explore Categories"} onBack={() => {
        if (selectedCategory) {
          setSelectedCategory(null);
        } else {
          navigate('buyer-home');
        }
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-6 space-y-12"
        >
          {!selectedCategory ? (
            <div className="grid grid-cols-1 gap-8">
              {DISCOVERY_CARDS.map((card) => (
                <motion.div 
                  key={card.id} 
                  whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(card.category)}
                  className="relative h-48 bg-bg-primary border border-border-light rounded-[40px] overflow-hidden cursor-pointer transition-all group shadow-sm"
                >
                  <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-center space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20">
                        {categories.find(c => c.id === card.category)?.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-white tracking-tight">{card.title}</h4>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">{MARKETPLACE_DATA[card.category].sellers.filter((s: any) => s.city === selectedCity).length} Artisans Near You</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest mt-2">
                      <span>Explore Collection</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10">
              {filteredSellers.length > 0 ? (
                filteredSellers.map((seller: any) => (
                  <motion.div 
                    key={seller.id}
                    className="bg-bg-primary rounded-[40px] border border-border-light overflow-hidden shadow-sm transition-all group"
                    whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelectedSeller(seller); navigate('buyer-seller-menu'); }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={seller.image} 
                        alt={seller.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="text-[9px] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border-light font-bold text-accent-primary uppercase tracking-widest shadow-sm">{seller.city}</span>
                      </div>
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-border-light">
                        <Star size={12} className="text-accent-primary fill-accent-primary" />
                        <span className="text-xs font-bold text-text-primary small-text">{seller.rating}</span>
                      </div>
                    </div>
                    <div className="p-10 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-medium text-text-primary tracking-tight product-title">{seller.name}</h4>
                        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 small-text">{seller.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-border-light">
                        <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">{seller.deliveryTime} Delivery</span>
                        <div className="flex items-center gap-2 text-accent-primary font-bold text-[10px] uppercase tracking-widest">
                          View Shop <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="px-2">
                  <EmptyState 
                    icon={Store}
                    title="Artisans on the Way"
                    message="We're currently scouting the best artisans for this category in your city. Something special is coming!"
                    actionText="Explore Other Categories"
                    onAction={() => setSelectedCategory(null)}
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-seller-menu') {
    return (
      <Layout {...layoutProps} title={selectedSeller?.name || "Artisan Page"} onBack={() => {
        if (selectedCategory) {
          navigate('buyer-categories');
        } else {
          navigate('buyer-home');
        }
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-6 space-y-12"
        >
          <div className="w-full aspect-[16/9] bg-bg-secondary border border-border-light rounded-[32px] overflow-hidden relative shadow-sm group">
            <img src={selectedSeller?.image} alt={selectedSeller?.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div className="space-y-3">
                <div className="px-3 py-1 bg-accent-primary/90 backdrop-blur-md rounded-lg flex items-center gap-1.5 w-fit shadow-sm">
                  <ShieldCheck size={14} className="text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest small-text">Verified Artisan</span>
                </div>
                <h2 className="text-3xl font-bold text-text-primary tracking-tight leading-tight font-sans">{selectedSeller?.name}</h2>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-border-light px-4 py-2 rounded-xl shadow-sm">
                  <span className="text-sm font-bold text-text-primary small-text">{selectedSeller?.rating}</span>
                  <Star size={14} fill="currentColor" className="text-accent-primary" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: 'Distance', value: selectedSeller?.dist },
              { icon: Clock, label: 'Delivery', value: selectedSeller?.deliveryTime },
              { icon: Package, label: 'Products', value: `${selectedSeller?.products?.length || 0} Items` }
            ].map((stat, i) => (
              <div key={i} className="bg-bg-secondary/50 border border-border-light p-6 rounded-2xl flex flex-col items-center gap-3 text-center shadow-sm">
                <stat.icon size={18} className="text-accent-primary opacity-60" />
                <div className="space-y-1">
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest small-text">{stat.label}</p>
                  <p className="text-xs font-bold text-text-primary uppercase tracking-widest small-text">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-bg-secondary/30 p-8 rounded-[32px] border border-border-light shadow-sm">
            <h3 className="text-[10px] font-bold text-accent-primary uppercase tracking-widest mb-4 small-text">About the Artisan</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-medium opacity-80 italic small-text">"{selectedSeller?.desc}"</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-border-light shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-accent-primary uppercase tracking-widest small-text">Artisan Story</h3>
              <span className="text-[8px] font-bold text-text-secondary bg-bg-secondary px-2 py-1 rounded-lg uppercase tracking-widest">5+ Years Experience</span>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-text-secondary leading-relaxed opacity-80 small-text">
                Every piece in this collection is a testament to traditional craftsmanship passed down through generations. We believe in slow production and sustainable materials.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-[8px] text-text-secondary uppercase tracking-widest mb-1">Business Type</span>
                  <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Home-based business</span>
                </div>
                <div className="w-px h-8 bg-border-light" />
                <div className="flex flex-col">
                  <span className="text-[8px] text-text-secondary uppercase tracking-widest mb-1">Made with care</span>
                  <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Local Sellers</span>
                </div>
              </div>
              <button 
                className="w-full py-4 bg-bg-secondary text-accent-primary border border-accent-primary/20 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent-primary hover:text-white transition-all shadow-sm"
                onClick={() => setIsCustomOrderModalOpen(true)}
              >
                Request Custom Order
              </button>
            </div>
          </div>

          <div className="space-y-8 pb-24">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-medium text-text-primary tracking-tight">Artisan Menu</h3>
              <div className="h-px flex-1 bg-border-light mx-6" />
              <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest small-text">Made with care by local sellers</span>
            </div>
            
            <div className="grid grid-cols-1 gap-10">
              {selectedSeller?.products?.length > 0 ? (
                selectedSeller.products.map((product: any) => (
                  <motion.div 
                    key={product.id} 
                    className="bg-bg-primary border border-border-light rounded-[40px] overflow-hidden shadow-sm flex flex-col group transition-all"
                    whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelectedProduct(product); navigate('buyer-product-detail'); }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border-light flex items-center gap-2 shadow-sm">
                          <div className={`w-2 h-2 rounded-full ${product.type === 'VEG' ? 'bg-emerald-500 shadow-[0_0_8_rgba(16,185,129,0.6)]' : 'bg-red-500 shadow-[0_0_8_rgba(239,68,68,0.6)]'}`} />
                          <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest small-text">{product.type}</span>
                        </div>
                        <div className="bg-accent-primary/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-accent-primary/20 flex items-center gap-2 shadow-sm">
                          <span className="text-[8px] font-black text-white uppercase tracking-widest">Ready for Pickup</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          className="bg-white/90 backdrop-blur-md p-3 rounded-full border border-border-light shadow-sm hover:scale-110 transition-all active:scale-90"
                        >
                          <Heart size={18} className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-text-secondary hover:text-red-500 transition-colors"} />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[9px] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border-light font-bold text-accent-primary uppercase tracking-widest shadow-sm">Made in {selectedSeller?.city}</span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-xl text-text-primary tracking-tight product-title">{product.name}</h4>
                          <p className="text-sm text-text-secondary line-clamp-2 opacity-60 font-medium leading-relaxed small-text">{product.desc}</p>
                        </div>
                        {product.tags && (
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag: string, idx: number) => (
                              <span key={idx} className="text-[8px] font-bold text-accent-primary bg-accent-primary/5 px-2 py-1 rounded-lg border border-accent-primary/10 uppercase tracking-widest">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-border-light">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-text-secondary uppercase tracking-widest small-text">Price</span>
                          <span className="text-2xl font-bold text-text-primary">₹{product.priceValue}</span>
                        </div>
                        <QuantitySelector 
                          productId={product.id} 
                          product={product} 
                          sellerInfo={selectedSeller} 
                          updateCart={updateCart}
                          quantity={getProductQuantity(product.id)}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyState 
                  icon={Package}
                  title="Artisan at Work"
                  message="This artisan is currently handcrafting their next collection. Check back soon for new arrivals!"
                  actionText="Explore Other Shops"
                  onAction={() => navigate('buyer-categories')}
                />
              )}
            </div>
          </div>
        </motion.div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-product-detail') {
    const quantity = getProductQuantity(selectedProduct?.id);
    return (
      <Layout {...layoutProps} onBack={() => navigate('buyer-seller-menu')}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pb-48"
        >
            <div className="relative aspect-square bg-bg-secondary overflow-hidden">
              <img 
                src={selectedProduct?.image} 
                alt={selectedProduct?.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="text-[10px] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-border-light font-bold text-accent-primary uppercase tracking-widest shadow-xl">Made in {selectedSeller?.city}</span>
              </div>
              <div className="absolute top-6 right-6">
                <button 
                  onClick={() => toggleWishlist(selectedProduct?.id)}
                  className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl border border-border-light hover:scale-110 transition-all active:scale-90"
                >
                  <Heart size={24} className={wishlist.includes(selectedProduct?.id) ? "fill-red-500 text-red-500" : "text-text-secondary hover:text-red-500 transition-colors cursor-pointer"} />
                </button>
              </div>
            </div>

          <div className="px-8 -mt-12 relative z-10">
            <div className="bg-bg-primary rounded-[40px] p-10 shadow-2xl border border-border-light space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="px-4 py-1.5 bg-accent-primary/10 rounded-xl border border-accent-primary/20 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${selectedProduct?.type === 'VEG' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-accent-primary shadow-[0_0_8px_rgba(74,62,53,0.6)]'}`} />
                    <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest small-text">{selectedProduct?.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} fill="currentColor" className="text-accent-primary" />
                    <span className="text-sm font-bold text-text-primary small-text">{selectedSeller?.rating}</span>
                    <span className="text-xs text-text-secondary small-text">(120+ reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-text-primary tracking-tight font-serif" style={{ fontFamily: 'Times New Roman, serif' }}>{selectedProduct?.name}</h1>
                <p className="text-[11px] font-medium text-text-secondary uppercase tracking-widest small-text">by {selectedSeller?.name}</p>
                {selectedProduct?.tags && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedProduct.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="text-[9px] font-bold text-accent-primary bg-accent-primary/5 px-3 py-1.5 rounded-xl border border-accent-primary/10 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest small-text">About this product</h3>
                <p className="text-base text-text-secondary leading-relaxed small-text">{selectedProduct?.desc || "Experience the authentic taste of tradition with this handcrafted masterpiece. Made using time-honored techniques and locally sourced ingredients, every bite tells a story of heritage and passion."}</p>
              </div>

              {selectedProduct?.id === 'p14_bags' && (
                <div className="space-y-6">
                  <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest small-text">Product Highlights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Leaf size={18} className="text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight">100% Organic</span>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Shield size={18} className="text-amber-600" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-tight">BPA Free</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest small-text">Artisan Information</h3>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('buyer-seller-menu')}
                  className="flex items-center gap-5 p-5 bg-bg-secondary rounded-3xl border border-border-light shadow-sm cursor-pointer"
                >
                  <div className="w-14 h-14 bg-bg-primary rounded-2xl overflow-hidden border border-border-light">
                    <img src={selectedSeller?.image} alt={selectedSeller?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-text-primary tracking-tight font-sans">{selectedSeller?.name}</h4>
                      {selectedSeller?.isVerified && (
                        <CheckCircle size={14} className="text-emerald-500 fill-emerald-50" />
                      )}
                    </div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest small-text">{selectedSeller?.city}</p>
                  </div>
                  <ChevronRight size={20} className="text-accent-primary" />
                </motion.div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest small-text">Delivery Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-bg-secondary rounded-2xl border border-border-light flex items-center gap-4 shadow-sm">
                    <Clock size={18} className="text-accent-primary" />
                    <div>
                      <p className="text-[8px] text-text-secondary uppercase tracking-widest small-text">Time</p>
                      <p className="text-xs font-bold text-text-primary small-text">{getEstimatedTime(selectedSeller?.distValue || 0)}</p>
                    </div>
                  </div>
                  <div className="p-5 bg-bg-secondary rounded-2xl border border-border-light flex items-center gap-4 shadow-sm">
                    <MapPin size={18} className="text-accent-primary" />
                    <div>
                      <p className="text-[8px] text-text-secondary uppercase tracking-widest small-text">Distance</p>
                      <p className="text-xs font-bold text-text-primary small-text">{selectedSeller?.dist}</p>
                    </div>
                  </div>
                </div>
              </div>

              <BuyerProtection categoryId={selectedCategory} />
            </div>
          </div>
        </motion.div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white/95 backdrop-blur-2xl border-t border-border-light z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-full mx-auto space-y-4">
            {quantity > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between gap-4"
              >
                <button 
                  onClick={() => navigate('buyer-seller-menu')}
                  className="flex-1 py-4 px-6 rounded-2xl border border-border-light text-[10px] font-bold text-text-secondary uppercase tracking-widest hover:bg-bg-secondary transition-all"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={() => navigate('buyer-cart')}
                  className="flex-[1.5] py-4 px-6 bg-accent-primary text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            )}
            
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] text-text-secondary uppercase tracking-[0.2em] font-bold">Total Price</span>
                <span className="text-xl font-bold text-text-primary tracking-tight">₹{selectedProduct?.priceValue * (quantity || 1)}</span>
              </div>
              
              {quantity === 0 ? (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    updateCart(selectedProduct, 1, selectedSeller);
                    setToast(`${selectedProduct.name} added to cart!`);
                  }}
                  className="flex-1 bg-accent-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 hover:bg-accent-brown transition-all text-sm uppercase tracking-widest"
                >
                  Add to Cart
                </motion.button>
              ) : (
                <div className="flex items-center gap-4 bg-bg-secondary p-1.5 rounded-2xl border border-border-light shadow-inner">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateCart(selectedProduct, -1, selectedSeller)}
                    className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-white rounded-xl transition-all"
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className="text-sm font-bold text-text-primary min-w-[20px] text-center">{quantity}</span>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateCart(selectedProduct, 1, selectedSeller)}
                    className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-white rounded-xl transition-all"
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-order-tracking') {
    return (
      <Layout {...layoutProps} showNav title="Track Order" onBack={() => navigate(role === 'buyer' ? 'buyer-home' : 'seller-dashboard')}>
        <div className="p-4 space-y-10">
          {/* Order Header Card */}
          <div className="bg-white p-8 rounded-[32px] border border-border-light shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em]">Order Reference</p>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">#ZY-882910</h3>
                </div>
                <div className="text-right space-y-1.5">
                  <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em]">Total Value</p>
                  <h3 className="text-xl font-black text-text-primary tracking-tight">₹480.00</h3>
                </div>
              </div>
              <div className="bg-bg-secondary p-5 rounded-2xl border border-border-light flex items-center gap-5 shadow-sm">
                <div className="p-3.5 bg-white rounded-xl border border-border-light shadow-sm">
                  <Package size={24} className="text-accent-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] opacity-60">Current Status</p>
                  <p className="text-sm font-black text-text-primary uppercase tracking-[0.1em]">Out for Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-light ml-2">
            {[
              { label: 'Order Confirmed', time: '10:30 AM', done: true },
              { label: 'Preparing Your Order', time: '10:35 AM', done: true },
              { label: 'Picked Up by Partner', time: '10:50 AM', done: true },
              { label: 'Out for Delivery', time: '11:00 AM', done: false, active: true },
              { label: 'Delivered', time: 'Expected 11:15 AM', done: false }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-8 relative">
                <div className={`w-6 h-6 rounded-full border-4 flex-shrink-0 z-10 transition-all duration-700 ${step.done ? 'bg-accent-primary border-white shadow-lg' : step.active ? 'bg-white border-accent-primary scale-125 shadow-md' : 'bg-white border-border-light'}`}>
                  {step.done && <Check size={12} className="text-white m-auto font-black" />}
                </div>
                <div className="flex-1 space-y-1.5">
                  <h4 className={`text-xs font-black uppercase tracking-[0.15em] ${step.done || step.active ? 'text-text-primary' : 'text-text-secondary opacity-30'}`}>{step.label}</h4>
                  <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest opacity-40">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Details */}
          <div className="pt-10 border-t border-border-light space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-bg-secondary rounded-xl flex items-center justify-center border border-border-light">
                <MapPin size={20} className="text-accent-primary" />
              </div>
              <h4 className="text-[11px] font-black text-text-primary uppercase tracking-[0.3em]">Delivery Destination</h4>
            </div>
            <p className="text-xs text-text-secondary font-medium leading-relaxed pl-14 opacity-70 italic">
              Flat 402, Tower B, Green Valley Apartments,<br />
              Sector 45, Gurgaon, Haryana 122003
            </p>
          </div>

          {/* Partner Card */}
          <div className="p-6 bg-white rounded-[32px] border border-border-light shadow-sm flex items-center justify-between group hover:border-accent-primary/20 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-bg-secondary rounded-2xl border border-border-light flex items-center justify-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <User size={32} className="text-accent-primary opacity-30 relative z-10" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] opacity-60">Artisan Partner</p>
                <p className="text-base font-black text-text-primary tracking-tight">Rahul Sharma</p>
              </div>
            </div>
            <button className="w-14 h-14 bg-bg-secondary rounded-2xl border border-border-light text-accent-primary shadow-sm hover:bg-accent-primary hover:text-white transition-all active:scale-90 flex items-center justify-center">
              <Phone size={22} />
            </button>
          </div>

          <button 
            onClick={() => navigate('buyer-support')}
            className="w-full py-6 border border-border-light rounded-2xl text-text-secondary font-black text-[10px] uppercase tracking-[0.3em] hover:border-accent-primary/30 hover:text-text-primary transition-all bg-white shadow-sm"
          >
            Need Assistance with this Order?
          </button>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-support') {
    return (
      <Layout {...layoutProps} title="Concierge Support" onBack={() => navigate(role === 'buyer' ? 'buyer-home' : 'seller-dashboard')}>
        <div className="p-8 flex flex-col h-[70vh] items-center justify-center text-center space-y-10">
          <div className="w-32 h-32 bg-navy-secondary rounded-full flex items-center justify-center border border-accent-primary/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent-primary/5 blur-xl group-hover:bg-accent-primary/10 transition-colors" />
            <AlertCircle size={48} className="text-accent-primary opacity-20 relative z-10" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-text-primary tracking-tight">How can we assist?</h2>
            <p className="text-xs text-text-secondary font-black uppercase tracking-widest leading-relaxed opacity-40">Our dedicated concierge team is available 24/7 for our premium members.</p>
          </div>
          
          <div className="w-full space-y-5">
            <a href="tel:+919876543210" className="w-full py-6 bg-navy-secondary border border-accent-primary/10 rounded-2xl flex items-center justify-center gap-4 font-black text-[10px] text-text-primary uppercase tracking-[0.3em] hover:border-accent-primary/40 transition-all shadow-xl active:scale-95">
              <Phone size={18} className="text-accent-primary" />
              Direct Call
            </a>
            <a href="mailto:support@zyvara.com" className="w-full py-6 border border-accent-primary/10 rounded-2xl flex items-center justify-center gap-4 font-black text-[10px] text-text-secondary uppercase tracking-[0.3em] hover:text-text-primary hover:border-accent-primary/30 transition-all active:scale-95">
              <Mail size={18} className="text-accent-primary opacity-60" />
              Email Concierge
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-orders') {
    return (
      <Layout {...layoutProps} showNav title="My Orders">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 space-y-6"
        >
          {orders.length === 0 ? (
            <EmptyState 
              icon={Package}
              title="Your Journey Begins"
              message="No orders yet? Your first local treasure is just a click away. Let's find something special!"
              actionText="Start Shopping"
              onAction={() => navigate('buyer-home')}
            />
          ) : (
            [...orders].reverse().map((order) => (
              <div key={order.id} className="bg-white border border-border-light rounded-[32px] p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{order.date}</p>
                    <h4 className="text-sm font-bold text-text-primary tracking-tight">Order #{order.id}</h4>
                  </div>
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-accent-primary/10 text-accent-primary'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-4 py-4 border-y border-border-light">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-bg-secondary rounded-xl flex items-center justify-center overflow-hidden border border-border-light">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-text-primary">{item.name}</p>
                        <p className="text-[10px] text-text-secondary">{item.quantity} x ₹{item.priceValue}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Total Amount</p>
                    <p className="text-sm font-bold text-text-primary">₹{order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate('buyer-order-tracking')}
                      className="flex-1 bg-bg-secondary text-accent-primary px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all"
                    >
                      Track Order
                    </button>
                    {order.status === 'Processing' && (
                      <button 
                        onClick={() => {
                          setSelectedOrderToCancel(order.id);
                          setShowCancelModal(true);
                        }}
                        className="px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border border-red-100"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="pt-4 border-t border-border-light space-y-3">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setToast(`Dispute raised for Order #${order.id}`)}
                      className="text-[9px] font-bold text-text-secondary hover:text-accent-primary uppercase tracking-widest flex items-center gap-2"
                    >
                      <AlertCircle size={12} />
                      Report Issue or Raise Dispute
                    </button>
                  </div>
                  <p className="text-[8px] text-text-secondary opacity-60 italic">Note: Upload proof for damaged items for quick resolution</p>
                </div>
              </div>
            ))
          )}
          <CancelOrderModal 
            isOpen={showCancelModal} 
            onClose={() => { setShowCancelModal(false); setSelectedOrderToCancel(null); }} 
            onConfirm={(reason) => cancelOrder(selectedOrderToCancel!, reason)} 
            orderId={selectedOrderToCancel || ''} 
          />
        </motion.div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-profile') {
    return (
      <Layout {...layoutProps} showNav title="Your Profile" onBack={() => navigate(role === 'buyer' ? 'buyer-home' : 'seller-dashboard')}>
        <div className="p-4 space-y-10">
          {/* User Hero Card */}
          <div className="bg-accent-primary p-8 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-[24px] flex items-center justify-center text-white border border-white/20 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <User size={40} className="relative z-10 opacity-80" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-white tracking-tight font-serif">John Doe</h2>
                <p className="text-[10px] font-medium text-white/60 uppercase tracking-[0.2em]">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Wishlist Preview */}
          {wishlist.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest small-text">Your Wishlist</h3>
                <span className="text-[10px] text-accent-primary font-bold uppercase tracking-widest small-text">{wishlist.length} Items</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {wishlist.map(id => {
                  const product = Object.values(MARKETPLACE_DATA).flatMap((cat: any) => cat.sellers.flatMap((s: any) => s.products)).find((p: any) => p.id === id);
                  if (!product) return null;
                  return (
                    <div key={id} onClick={() => { setSelectedProduct(product); navigate('buyer-product-detail'); }} className="flex-shrink-0 w-32 space-y-3 cursor-pointer group">
                      <div className="aspect-square rounded-2xl overflow-hidden border border-border-light shadow-sm">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <p className="text-[10px] font-bold text-text-primary truncate uppercase tracking-tight small-text">{product.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Menu Options */}
          <div className="space-y-3">
            {[
              { label: 'My Wishlist', icon: Heart, action: () => navigate('buyer-wishlist') },
              { label: 'Saved Addresses', icon: MapPin, action: () => navigate('buyer-address-management') },
              { label: 'Order History', icon: Package },
              { label: 'Help & Support', icon: AlertCircle, action: () => navigate('buyer-support') },
              { label: 'Terms & Privacy', icon: FileText, action: () => setShowTerms(true) },
              { label: 'Logout', icon: LogOut, action: () => { setRole(null); navigate('role-selection'); }, color: 'text-red-500' }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={item.action}
                className={`w-full p-5 flex items-center justify-between bg-white hover:bg-bg-secondary rounded-2xl border border-border-light transition-all group ${item.color || 'text-text-primary'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${item.color ? 'bg-red-50 text-red-500' : 'bg-bg-secondary text-accent-primary border border-border-light group-hover:bg-accent-primary group-hover:text-white'}`}>
                    {item.icon && <item.icon size={18} />}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest small-text">{item.label}</span>
                </div>
                <ChevronLeft size={18} className="rotate-180 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
        <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      </Layout>
    );
  }

  if (currentScreen === 'buyer-cart') {
    const sellersInCart: string[] = Array.from(new Set(cart.map(item => item.sellerId)));
    const subtotal: number = cart.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0);
    const deliveryFees: number = sellersInCart.reduce((sum: number, sellerId: any) => {
      const seller = cart.find(item => item.sellerId === sellerId);
      return sum + (calculateDeliveryFee(seller?.distValue || 0) || 0);
    }, 0);
    const platformFee: number = 10;
    const grandTotal: number = subtotal + deliveryFees + platformFee;

    return (
      <Layout {...layoutProps} title="Your Cart" onBack={() => navigate(role === 'buyer' ? 'buyer-home' : 'seller-dashboard')}>
        <div className="p-6 pb-48 space-y-12">
          {cart.length === 0 ? (
            <div className="flex flex-col h-[60vh] items-center justify-center text-center space-y-10">
              <div className="w-32 h-32 bg-bg-secondary rounded-full flex items-center justify-center border border-border-light shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent-primary/5 blur-xl group-hover:bg-accent-primary/10 transition-colors" />
                <ShoppingBag size={48} className="text-accent-primary opacity-20 relative z-10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-text-primary tracking-tight">Your cart is empty</h3>
                <p className="text-text-secondary text-sm max-w-[240px] mx-auto leading-relaxed">Add something extraordinary from our local artisans to get started.</p>
              </div>
              <button 
                onClick={() => navigate('buyer-home')}
                className="bg-accent-primary text-white px-12 py-5 rounded-2xl font-bold shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <>
              <div className="bg-bg-secondary p-8 rounded-[32px] border border-border-light shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-bg-primary rounded-2xl border border-border-light shadow-sm group-hover:bg-accent-primary/10 transition-colors">
                    <MapPin size={24} className="text-accent-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">Delivering To</p>
                    <p className="text-sm font-medium text-text-primary truncate w-44 tracking-tight">{buyerAddress}</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('buyer-address-management')} 
                  className="text-xs font-bold text-accent-primary hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="space-y-16">
                {sellersInCart.map(sellerId => (
                  <div key={sellerId} className="space-y-8">
                    <div className="flex items-center justify-between border-b border-border-light pb-6">
                      <div className="flex items-center gap-4">
                        <Store size={22} className="text-accent-primary opacity-60" />
                        <h4 className="font-bold text-sm text-text-primary uppercase tracking-widest">
                          {sellerId}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 bg-accent-primary/5 px-4 py-2 rounded-full border border-accent-primary/10">
                        <Truck size={14} className="text-accent-primary" />
                        <span className="text-[10px] text-accent-primary font-bold uppercase tracking-widest">Delivery: ₹{calculateDeliveryFee(cart.find(i => i.sellerId === sellerId)?.distValue || 0)}</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {cart.filter(item => item.sellerId === sellerId).map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex gap-6 p-6 bg-bg-secondary border border-border-light rounded-[32px] shadow-sm group relative overflow-hidden">
                          <div className="w-28 h-28 bg-bg-primary rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-border-light relative z-10">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-between relative z-10">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="font-medium text-base text-text-primary tracking-tight">{item.name}</h4>
                                <p className="text-[10px] text-text-secondary uppercase tracking-widest">Artisan Item</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    toggleWishlist(item.id);
                                    updateCart(item, -item.quantity, { name: item.sellerId });
                                  }}
                                  className="text-text-secondary hover:text-red-500 transition-colors p-1"
                                  title="Save for Later"
                                >
                                  <Heart size={18} className={wishlist.includes(item.id) ? "fill-red-500 text-red-500" : ""} />
                                </button>
                                <button 
                                  onClick={() => updateCart(item, -item.quantity, { name: item.sellerId })}
                                  className="text-text-secondary hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-6">
                              <div className="flex flex-col">
                                <span className="text-lg font-bold text-text-primary">₹{item.totalPrice}</span>
                                <span className="text-[10px] text-text-secondary font-medium">₹{item.priceValue} x {item.quantity}</span>
                              </div>
                              <QuantitySelector 
                                productId={item.id} 
                                product={item} 
                                sellerInfo={{ name: item.sellerId, distValue: item.distValue }} 
                                updateCart={updateCart}
                                quantity={item.quantity}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-bg-secondary p-8 rounded-[40px] border border-border-light shadow-sm space-y-8">
                <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-text-primary font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Delivery Fee</span>
                    <span className="text-text-primary font-medium">₹{deliveryFees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Platform Fee</span>
                    <span className="text-text-primary font-medium">₹{platformFee}</span>
                  </div>
                  <div className="pt-6 border-t border-border-light flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">Final Total</p>
                      <p className="text-3xl font-bold text-text-primary tracking-tight">₹{grandTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
                      <ShieldCheck size={12} />
                      Secure
                    </div>
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white/90 backdrop-blur-xl border-t border-border-light z-50">
                <button 
                  onClick={() => navigate('buyer-checkout')}
                  className="w-full max-w-full mx-auto block bg-accent-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-address-management') {
    return (
      <Layout {...layoutProps} title="Saved Locations" onBack={() => navigate('buyer-cart')}>
        <div className="p-6 space-y-10">
          <div className="space-y-5">
            {addresses.map(addr => (
              <div 
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                className={`p-6 rounded-[32px] border transition-all cursor-pointer relative group overflow-hidden ${selectedAddressId === addr.id ? 'border-accent-primary bg-accent-primary/10 shadow-xl shadow-accent-primary/5' : 'border-border-light bg-white hover:border-accent-primary/20 shadow-sm'}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full -mr-12 -mt-12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${selectedAddressId === addr.id ? 'bg-accent-primary border-accent-primary text-white shadow-lg' : 'bg-bg-secondary border-border-light text-accent-primary'}`}>
                      {addr.label === 'Home' ? <Home size={20} /> : addr.label === 'Office' ? <Store size={20} /> : <MapPin size={20} />}
                    </div>
                    <div className="space-y-1">
                      <span className="font-black text-sm text-text-primary uppercase tracking-widest">{addr.label}</span>
                      {addr.isDefault && <span className="block text-[8px] font-black bg-accent-primary/10 text-accent-primary px-2 py-0.5 rounded uppercase tracking-[0.2em] w-fit">Primary</span>}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
                    className="w-10 h-10 bg-bg-secondary rounded-xl border border-border-light text-text-secondary hover:text-red-500 hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pr-10 font-medium opacity-70 italic relative z-10">{addr.address}</p>
                {selectedAddressId === addr.id && (
                  <div className="absolute top-6 right-6">
                    <CheckCircle2 size={24} className="text-accent-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('buyer-add-address')}
            className="w-full py-8 border-2 border-dashed border-accent-primary/20 rounded-[32px] flex flex-col items-center justify-center gap-4 text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-all group bg-navy-secondary/30 shadow-inner"
          >
            <div className="w-12 h-12 bg-navy-primary rounded-2xl flex items-center justify-center border border-accent-primary/10 group-hover:bg-accent-primary group-hover:text-navy-primary transition-all">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Add New Destination</span>
          </button>

          <div className="pt-10">
            <button 
              onClick={() => navigate('buyer-cart')}
              className="w-full bg-accent-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-accent-primary/20 hover:bg-white hover:text-accent-primary transition-all active:scale-95"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-add-address') {
    return (
      <Layout {...layoutProps} title="New Location" onBack={() => navigate('buyer-address-management')}>
        <div className="p-8 space-y-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] opacity-60">Address Label</label>
              <div className="flex gap-4">
                {['Home', 'Office', 'Other'].map(label => (
                  <button 
                    key={label}
                    onClick={() => setNewAddress({ ...newAddress, label })}
                    className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${newAddress.label === label ? 'bg-accent-primary border-accent-primary text-white shadow-2xl shadow-accent-primary/20' : 'bg-white border-border-light text-text-secondary hover:border-accent-primary/30 shadow-sm'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] opacity-60">Full Address Details</label>
              <textarea 
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                className="w-full bg-white border border-border-light rounded-[32px] p-6 text-sm outline-none focus:border-accent-primary text-text-primary transition-all resize-none h-40 font-medium shadow-sm placeholder:opacity-20"
                placeholder="House No, Building Name, Street, Area..."
              />
            </div>

            <div className="bg-bg-secondary p-6 rounded-[32px] border border-border-light flex items-start gap-5 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-primary border border-border-light shadow-sm">
                <MapPin size={22} />
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Detected Location</p>
                <p className="text-xs text-text-secondary leading-relaxed font-medium opacity-60 italic">Sector 45, Gurgaon, Haryana 122003</p>
              </div>
            </div>
          </div>

          <button 
            onClick={saveAddress}
            className="w-full bg-accent-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-accent-primary/20 hover:bg-white hover:text-accent-primary transition-all active:scale-95"
          >
            Save Destination
          </button>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'buyer-checkout') {
    const sellersInCart: string[] = Array.from(new Set(cart.map(item => item.sellerId)));
    const subtotal: number = cart.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0);
    const deliveryFees: number = sellersInCart.reduce((sum: number, sellerId: any) => {
      const seller = cart.find(item => item.sellerId === sellerId);
      return sum + (calculateDeliveryFee(seller?.distValue || 0) || 0);
    }, 0);
    const platformFee: number = 10;
    const grandTotal: number = subtotal + deliveryFees + platformFee;

    const paymentMethods = [
      { id: 'upi', label: 'UPI / GPay / PhonePe', icon: Sparkles },
      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
      { id: 'cod', label: 'Cash on Delivery', icon: Truck }
    ];

    return (
      <Layout {...layoutProps} title="Checkout" onBack={() => navigate('buyer-cart')}>
        <div className="p-8 space-y-12 pb-40">
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Delivery Address</h3>
            <div className="bg-bg-secondary p-6 rounded-[32px] border border-border-light shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-bg-primary rounded-2xl flex items-center justify-center text-accent-primary border border-border-light shadow-sm">
                <MapPin size={22} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-text-primary tracking-tight">{addresses.find(a => a.id === selectedAddressId)?.label}</p>
                <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-1">{buyerAddress}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Payment Method</h3>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id as any)}
                  className={`w-full p-6 rounded-[32px] border transition-all flex items-center justify-between group ${selectedPaymentMethod === method.id ? 'border-accent-primary bg-accent-primary/5' : 'border-border-light bg-bg-secondary hover:border-accent-primary/20'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedPaymentMethod === method.id ? 'bg-accent-primary text-white shadow-lg' : 'bg-bg-primary text-text-secondary border border-border-light'}`}>
                      <method.icon size={22} />
                    </div>
                    <span className="text-sm font-bold text-text-primary tracking-tight">{method.label}</span>
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <CheckCircle2 size={24} className="text-accent-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <BuyerProtection />

          <div className="bg-bg-secondary p-8 rounded-[40px] border border-border-light shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Final Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Item Total</span>
                <span className="text-text-primary font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Delivery Fee</span>
                <span className="text-text-primary font-medium">₹{deliveryFees}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Platform Fee</span>
                <span className="text-text-primary font-medium">₹{platformFee}</span>
              </div>
              <div className="pt-6 border-t border-border-light flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">Final Total</p>
                  <p className="text-3xl font-bold text-text-primary tracking-tight">₹{grandTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white/90 backdrop-blur-xl border-t border-border-light z-50">
            <button 
              onClick={() => {
                const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
                const newOrder = {
                  id: orderId,
                  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                  status: 'Processing',
                  total: grandTotal,
                  items: [...cart],
                  paymentMethod: selectedPaymentMethod
                };
                setOrders(prev => [...prev, newOrder]);
                setCart([]);
                setShowOrderSuccess(true);
              }}
              className="w-full max-w-full mx-auto block bg-accent-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              Pay & Place Order <ArrowRight size={20} />
            </button>
          </div>
          <OrderSuccessModal 
            isOpen={showOrderSuccess} 
            onClose={() => setShowOrderSuccess(false)} 
            orderId={orders[orders.length - 1]?.id || ''} 
          />
        </div>
      </Layout>
    );
  }

  // --- Seller Registration Flow ---

  if (currentScreen === 'seller-reg-flow') {
    const steps = [
      { title: 'Basic Signup', desc: 'Instant account creation' },
      { title: 'Shop Details', desc: 'Simple store setup' },
      { title: 'Verification', desc: '2-Minute Process' }
    ];

    return (
      <Layout {...layoutProps} title="Seller Registration" onBack={() => {
        if (sellerVerificationStep > 1) setSellerVerificationStep(prev => prev - 1);
        else navigate('role-selection');
      }}>
        <div className="p-6">
          <div className="flex gap-1.5 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i + 1 <= sellerVerificationStep ? 'bg-accent-primary shadow-[0_0_10px_rgba(74,62,53,0.3)]' : 'bg-accent-primary/10'}`} />
            ))}
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-black text-text-primary mb-1 tracking-tight">{steps[sellerVerificationStep - 1].title}</h2>
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] opacity-60">Step {sellerVerificationStep} of 3: {steps[sellerVerificationStep - 1].desc}</p>
            {sellerVerificationStep === 3 && (
              <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-2 animate-pulse">Verification takes less than 2 minutes.</p>
            )}
          </div>

          <div className="space-y-8">
            {sellerVerificationStep === 1 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Full Name *</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                    placeholder="John Doe" 
                    value={sellerData.name || ''}
                    onChange={(e) => setSellerData({...sellerData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Phone Number *</label>
                  <div className="flex gap-3">
                    <input 
                      type="tel" 
                      className="flex-1 bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                      placeholder="+91 98765 43210" 
                      value={sellerData.phone || ''}
                      onChange={(e) => setSellerData({...sellerData, phone: e.target.value})}
                    />
                    <button 
                      onClick={() => setToast("OTP sent!")}
                      className="text-[9px] font-black text-accent-primary uppercase tracking-widest border border-accent-primary/20 px-4 rounded-xl hover:bg-accent-primary/5 transition-all"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Email (Optional)</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                    placeholder="john@example.com" 
                    value={sellerData.email || ''}
                    onChange={(e) => setSellerData({...sellerData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Create Password *</label>
                  <input 
                    type="password" 
                    className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                    placeholder="••••••••" 
                    value={sellerData.password || ''}
                    onChange={(e) => setSellerData({...sellerData, password: e.target.value})}
                  />
                </div>
              </div>
            )}

            {sellerVerificationStep === 2 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Shop / Brand Name *</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                    placeholder="The Artisan Baker" 
                    value={sellerData.shopName || ''}
                    onChange={(e) => setSellerData({...sellerData, shopName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Category *</label>
                  <select 
                    className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium appearance-none"
                    value={sellerData.category || ''}
                    onChange={(e) => setSellerData({...sellerData, category: e.target.value})}
                  >
                    <option value="" className="bg-navy-primary text-white">Select Category</option>
                    <option value="bakery" className="bg-navy-primary text-white">Farm Fresh & Kitchen</option>
                    <option value="organic" className="bg-navy-primary text-white">Natural Care</option>
                    <option value="handmade" className="bg-navy-primary text-white">Handmade Crafts</option>
                    <option value="custom" className="bg-navy-primary text-white">Sustainable Living</option>
                    <option value="other" className="bg-navy-primary text-white">Other / Specialized</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Pickup Address *</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                    placeholder="123, Green Street" 
                    value={sellerData.address || ''}
                    onChange={(e) => setSellerData({...sellerData, address: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">City *</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                      placeholder="Ahmedabad" 
                      value={sellerData.city || ''}
                      onChange={(e) => setSellerData({...sellerData, city: e.target.value})}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Pin Code *</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-accent-primary/20 py-3 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium" 
                      placeholder="380001" 
                      value={sellerData.pincode || ''}
                      onChange={(e) => setSellerData({...sellerData, pincode: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {sellerVerificationStep === 3 && (
              <div className="space-y-8">
                {!sellerData.verificationMethod ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => setSellerData({ ...sellerData, verificationMethod: 'id' })}
                      className="w-full p-6 bg-bg-secondary border border-accent-primary/10 rounded-3xl flex items-center gap-5 group hover:border-accent-primary/30 transition-all"
                    >
                      <div className="p-4 bg-accent-primary rounded-2xl text-white group-hover:bg-accent-primary transition-all">
                        <ShieldCheck size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-text-primary uppercase tracking-widest">Option 1: Upload ID</p>
                        <p className="text-[9px] text-text-secondary uppercase tracking-widest opacity-60">Aadhaar, PAN, or DL</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setSellerData({ ...sellerData, verificationMethod: 'self' })}
                      className="w-full p-6 bg-bg-secondary border border-accent-primary/10 rounded-3xl flex items-center gap-5 group hover:border-accent-primary/30 transition-all"
                    >
                      <div className="p-4 bg-accent-primary rounded-2xl text-white group-hover:bg-accent-primary transition-all">
                        <Camera size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-text-primary uppercase tracking-widest">Option 2: Self Verification</p>
                        <p className="text-[9px] text-text-secondary uppercase tracking-widest opacity-60">Selfie & Product Photos</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setSellerData({ ...sellerData, verificationMethod: 'none' })}
                      className="w-full p-6 bg-bg-secondary border border-accent-primary/10 rounded-3xl flex items-center gap-5 group hover:border-accent-primary/30 transition-all"
                    >
                      <div className="p-4 bg-accent-primary rounded-2xl text-white group-hover:bg-accent-primary transition-all">
                        <AlertCircle size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-text-primary uppercase tracking-widest">Option 3: No Documents</p>
                        <p className="text-[9px] text-text-secondary uppercase tracking-widest opacity-60">I don't have documents right now</p>
                      </div>
                    </button>

                    <div className="pt-6">
                      <button 
                        onClick={() => {
                          setSellerStatus('pending');
                          navigate('seller-dashboard');
                          setToast("Welcome! Complete verification later.");
                        }}
                        className="w-full py-4 border border-accent-primary/20 rounded-2xl text-[10px] font-black text-accent-primary uppercase tracking-widest hover:bg-accent-primary/5 transition-all"
                      >
                        Verify Later
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    {sellerData.verificationMethod === 'id' && (
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Select ID Type *</label>
                        <div className="grid grid-cols-1 gap-3">
                          {['Aadhaar Card', 'PAN Card', 'Driving License'].map((id) => (
                            <button
                              key={id}
                              onClick={() => setSellerData({ ...sellerData, idType: id })}
                              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                                sellerData.idType === id
                                  ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                                  : 'border-accent-primary/10 bg-bg-secondary text-text-secondary hover:border-accent-primary/30'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-widest">{id}</span>
                              {sellerData.idType === id ? <CheckCircle2 size={16} /> : <Upload size={16} className="opacity-40" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {sellerData.verificationMethod === 'self' && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Upload Selfie *</label>
                          <div className="w-full aspect-video bg-bg-secondary border-2 border-dashed border-accent-primary/20 rounded-3xl flex flex-col items-center justify-center gap-3 group hover:border-accent-primary transition-all cursor-pointer">
                            <Camera size={24} className="text-accent-primary opacity-40 group-hover:opacity-100" />
                            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Take a Selfie</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Product / Workshop Photo *</label>
                          <div className="w-full aspect-video bg-bg-secondary border-2 border-dashed border-accent-primary/20 rounded-3xl flex flex-col items-center justify-center gap-3 group hover:border-accent-primary transition-all cursor-pointer">
                            <Upload size={24} className="text-accent-primary opacity-40 group-hover:opacity-100" />
                            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Upload Photo</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {sellerData.verificationMethod === 'none' && (
                      <div className="space-y-6">
                        <div className="p-6 bg-bg-secondary rounded-3xl border border-accent-primary/10 space-y-4">
                          <div className="flex items-center gap-3 text-accent-primary">
                            <AlertCircle size={20} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Nearora Team Review</h4>
                          </div>
                          <p className="text-[10px] text-text-secondary leading-relaxed font-medium opacity-80">
                            Our team will review your profile within 24 hours. You can still add products and setup your shop in the meantime.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Selfie Photo *</label>
                          <div className="w-full aspect-square bg-bg-secondary border-2 border-dashed border-accent-primary/20 rounded-3xl flex flex-col items-center justify-center gap-3 group hover:border-accent-primary transition-all cursor-pointer">
                            <Camera size={24} className="text-accent-primary opacity-40 group-hover:opacity-100" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Product / Workspace Photo *</label>
                          <div className="w-full aspect-square bg-bg-secondary border-2 border-dashed border-accent-primary/20 rounded-3xl flex flex-col items-center justify-center gap-3 group hover:border-accent-primary transition-all cursor-pointer">
                            <Upload size={24} className="text-accent-primary opacity-40 group-hover:opacity-100" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Tell us about your products *</label>
                          <textarea 
                            className="w-full bg-bg-secondary border border-accent-primary/10 rounded-xl p-4 focus:border-accent-primary outline-none text-sm text-text-primary transition-all font-medium min-h-[100px] resize-none" 
                            placeholder="Describe your home business or unique products..." 
                            value={sellerData.otherDescription || ''}
                            onChange={(e) => setSellerData({...sellerData, otherDescription: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => setSellerData({ ...sellerData, verificationMethod: null })}
                      className="w-full text-center text-[9px] font-black text-text-secondary uppercase tracking-widest hover:text-accent-primary transition-colors"
                    >
                      Go back to options
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            <button 
              onClick={() => {
                if (sellerVerificationStep === 1) {
                  if (!sellerData.name || !sellerData.phone || !sellerData.password) {
                    setToast("Please fill all required fields");
                    return;
                  }
                  setSellerVerificationStep(2);
                } else if (sellerVerificationStep === 2) {
                  if (!sellerData.shopName || !sellerData.category || !sellerData.address || !sellerData.city || !sellerData.pincode) {
                    setToast("Please fill all shop details");
                    return;
                  }
                  setSellerVerificationStep(3);
                } else if (sellerVerificationStep === 3) {
                  if (!sellerData.verificationMethod) {
                    setToast("Please select a verification method");
                    return;
                  }
                  setIsSellerUnderReview(true);
                  setSellerStatus('pending');
                  
                  // Initialize seller products based on category
                  const DEFAULT_SELLER_PRODUCTS: Record<string, any[]> = {
                    bakery: [
                      { id: 'sp1', name: 'Artisan Sourdough', stock: 12, price: 250, img: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp2', name: 'Butter Croissant', stock: 5, price: 120, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp3', name: 'Whole Wheat Loaf', stock: 0, price: 180, img: 'https://sallysbakingaddiction.com/wp-content/uploads/2024/01/whole-wheat-sandwich-bread-2-600x900.jpg' }
                    ],
                    organic: [
                      { id: 'sp4', name: 'Pure Aloe Vera Gel', stock: 20, price: 350, img: 'https://images.unsplash.com/photo-1598440441973-1675005af43e?auto=format&fit=crop&q=80&w=800' },
                      { id: 'sp5', name: 'Wild Forest Honey', stock: 15, price: 450, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp6', name: 'Lavender Essential Oil', stock: 8, price: 600, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80' }
                    ],
                    handmade: [
                      { id: 'sp7', name: 'Handmade Woven Basket', stock: 10, price: 800, img: 'https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp8', name: 'Handcrafted Crochet Top', stock: 4, price: 1200, img: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp9', name: 'Ceramic Coffee Mug', stock: 6, price: 450, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80' }
                    ],
                    custom: [
                      { id: 'sp10', name: 'Bamboo Toothbrush', stock: 50, price: 150, img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp11', name: 'Organic Cotton Tote', stock: 30, price: 300, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp12', name: 'Glass Straw Set', stock: 25, price: 250, img: 'https://images.unsplash.com/photo-1592858304291-cc729904979e?auto=format&fit=crop&w=400&q=80' }
                    ],
                    other: [
                      { id: 'sp13', name: 'Handmade Woven Basket', stock: 10, price: 800, img: 'https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp14', name: 'Handcrafted Crochet Top', stock: 5, price: 1200, img: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=400&q=80' },
                      { id: 'sp15', name: 'Unique Artisan Creation', stock: 0, price: 300, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' }
                    ]
                  };
                  setSellerProducts(DEFAULT_SELLER_PRODUCTS[sellerData.category] || DEFAULT_SELLER_PRODUCTS.bakery);

                  navigate('seller-dashboard');
                  setToast("Verification submitted!");
                }
              }}
              className="w-full bg-accent-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20 hover:bg-white hover:text-accent-primary transition-all active:scale-95 flex items-center justify-center gap-3 mt-10"
            >
              {sellerVerificationStep === 3 ? 'Submit for Review' : 'Continue'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSellerUnderReview && !isSellerApproved && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-navy-primary z-50 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-24 h-24 bg-navy-secondary rounded-full flex items-center justify-center mb-8 border border-accent-primary/20">
                <Clock size={40} className="text-accent-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-text-primary mb-4 tracking-tight">Verification Under Review</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-12 opacity-80">
                Our team is verifying your documents. This usually takes 24–48 hours. You'll be notified once approved.
              </p>
              <div className="w-full space-y-4">
                <button 
                  onClick={() => { setIsSellerApproved(true); navigate('seller-dashboard'); }}
                  className="w-full py-4 bg-accent-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-accent-primary/20"
                >
                  Demo: Approve Seller
                </button>
                <button 
                  onClick={() => navigate('role-selection')}
                  className="w-full py-4 border border-accent-primary/20 rounded-2xl font-black uppercase tracking-widest text-text-secondary"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    );
  }

  if (currentScreen === 'seller-dashboard') {
    const isPending = sellerStatus === 'pending';
    
    return (
      <Layout {...layoutProps} onBack={() => navigate('role-selection')}>
        <div className="p-8 space-y-10 pb-32">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-text-primary tracking-tight leading-tight">Seller Dashboard</h2>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{sellerOnboardingData.shopName || sellerData.shopName || "The Artisan Baker"}</p>
            </div>
            <button 
              onClick={() => navigate('seller-manage-shop')}
              className="w-14 h-14 bg-white rounded-2xl border border-border-light flex items-center justify-center text-text-secondary shadow-sm hover:border-accent-primary/30 transition-all active:scale-95"
            >
              <Store size={24} />
            </button>
          </div>

          {(!verificationDoc) && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent-primary text-white p-6 rounded-[32px] flex items-center justify-between gap-4 shadow-xl shadow-accent-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold tracking-tight">Complete your verification 🚀</h4>
                  <p className="text-[10px] text-white/70 font-medium uppercase tracking-widest">Boost your visibility</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('seller-verification')}
                className="bg-white text-accent-primary px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-[0.95] transition-all whitespace-nowrap"
              >
                Verify
              </button>
            </motion.div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-border-light shadow-md space-y-6 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-accent-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} className="text-accent-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Today's Earnings</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">+12%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary tracking-tight">₹1,240.00</span>
              </div>
              <div className="pt-4 border-t border-border-light flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] text-text-secondary uppercase tracking-widest mb-1">Product Views</span>
                  <span className="text-xs font-bold text-text-primary">120 people viewed your product</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-text-secondary uppercase tracking-widest mb-1">Orders</span>
                  <span className="text-xs font-bold text-accent-primary">5 orders today</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[32px] border border-border-light shadow-sm space-y-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package size={16} className="text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Orders</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-text-primary tracking-tight">12</p>
                  <p className="text-[9px] text-text-secondary font-medium uppercase tracking-widest opacity-60">Received Today</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] border border-border-light shadow-sm space-y-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye size={16} className="text-purple-500" />
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Views</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-text-primary tracking-tight">458</p>
                  <p className="text-[9px] text-text-secondary font-medium uppercase tracking-widest opacity-60">Product Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Promotions */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-[40px] border border-amber-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                  <Sparkles size={20} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-amber-900 tracking-tight">Promote your product</h4>
                  <p className="text-[10px] text-amber-800/60 font-bold uppercase tracking-widest">Boost your sales</p>
                </div>
              </div>
              <span className="text-[8px] font-black text-amber-600 bg-white px-2 py-1 rounded-lg uppercase tracking-widest border border-amber-200">Premium</span>
            </div>
            
            <div className="space-y-6">
              <p className="text-[11px] text-amber-900/70 leading-relaxed font-medium">Get featured placement on the home screen and reach 5x more buyers in your city.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <button className="w-full bg-amber-600 text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center justify-center gap-3">
                  🚀 Boost this product
                </button>
                
                <div className="bg-white/50 p-6 rounded-[32px] border border-amber-200/50 space-y-4 group relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-200">
                        <Star size={20} fill="currentColor" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-amber-900 tracking-tight">⭐ Upgrade to Pro</h4>
                        <p className="text-[9px] text-amber-800/60 font-bold uppercase tracking-widest">Coming soon</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-800/70 leading-relaxed font-medium">Get more visibility, basic insights, and priority listing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={() => navigate('seller-add-product')}
            className="w-full bg-accent-primary text-white py-5 rounded-[24px] font-bold text-xs uppercase tracking-widest shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
          
          {/* Products List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-[0.3em]">Your Products</h3>
              <button className="text-[10px] font-bold text-accent-primary uppercase tracking-widest hover:underline">View All</button>
            </div>
            
            {sellerProducts.length === 0 ? (
              <div className="bg-bg-secondary border-2 border-dashed border-border-light rounded-[32px] p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Package size={24} className="text-text-secondary opacity-30" />
                </div>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest leading-relaxed">No products listed yet.<br/>Start by adding your first creation!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sellerProducts.map(product => (
                  <div key={product.id} className="bg-white p-4 rounded-[24px] border border-border-light shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-bg-secondary rounded-2xl overflow-hidden border border-border-light">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-bold text-text-primary">{product.name}</h4>
                      <p className="text-[10px] text-text-secondary font-medium">₹{product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2.5 bg-bg-secondary text-text-secondary rounded-xl hover:text-accent-primary transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2.5 bg-bg-secondary text-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <EditProductModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          product={editingProduct}
          onSave={(updated) => {
            setSellerProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
            setIsEditModalOpen(false);
          }}
        />
      </Layout>
    );
  }

  if (currentScreen === 'seller-add-product') {
    return (
      <Layout {...layoutProps} title="Add New Product" onBack={() => {
        setNewProductImage(null);
        setNewProductName('');
        setNewProductPrice('');
        setNewProductDescription('');
        navigate('seller-dashboard');
      }}>
        <div className="p-8 space-y-12 pb-32">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Add Product</h2>
            <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">List your new artisan creation</p>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-square bg-white border border-border-light rounded-[48px] flex flex-col items-center justify-center gap-6 group hover:border-accent-primary/40 transition-all cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewProductImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {newProductImage ? (
              <img src={newProductImage} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <>
                <div className="w-20 h-20 bg-bg-secondary rounded-3xl flex items-center justify-center border border-border-light shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <Camera size={32} className="text-accent-primary" />
                </div>
                <div className="text-center relative z-10 space-y-2">
                  <span className="text-[11px] font-bold text-text-primary uppercase tracking-[0.3em]">Upload Product Photo</span>
                  <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Showcase your craft</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <FileText size={14} className="text-accent-primary" />
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Product Name</label>
              </div>
              <input 
                type="text" 
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full bg-white border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all placeholder:text-text-secondary/30 shadow-sm focus:shadow-md" 
                placeholder="e.g. Hand-poured Soy Candle" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <CreditCard size={14} className="text-accent-primary" />
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Price (₹)</label>
                </div>
                <input 
                  type="number" 
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full bg-white border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all placeholder:text-text-secondary/30 shadow-sm focus:shadow-md" 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <Package size={14} className="text-accent-primary" />
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Quantity</label>
                </div>
                <input 
                  type="number" 
                  value={newProductQuantity}
                  onChange={(e) => setNewProductQuantity(e.target.value)}
                  className="w-full bg-white border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all placeholder:text-text-secondary/30 shadow-sm focus:shadow-md" 
                  placeholder="10" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Grid size={14} className="text-accent-primary" />
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Category</label>
              </div>
              <div className="relative">
                <select 
                  value={addProductCategory}
                  onChange={(e) => setAddProductCategory(e.target.value)}
                  className="w-full bg-white border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all appearance-none cursor-pointer shadow-sm focus:shadow-md"
                >
                  <option>Farm Fresh & Kitchen</option>
                  <option>Natural Care</option>
                  <option>Handmade Crafts</option>
                  <option>Sustainable Living</option>
                </select>
                <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Sparkles size={14} className="text-accent-primary" />
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Product Attributes</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {addProductCategory === 'Farm Fresh & Kitchen' && ['Veg', 'Non-Veg', 'Jain'].map(attr => (
                  <button
                    key={attr}
                    type="button"
                    onClick={() => {
                      const current = newProductAttributes || [];
                      setNewProductAttributes(current.includes(attr) ? current.filter(a => a !== attr) : [...current, attr]);
                    }}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      (newProductAttributes || []).includes(attr) 
                        ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' 
                        : 'bg-white text-text-secondary border-border-light hover:border-accent-primary/30'
                    }`}
                  >
                    {attr}
                  </button>
                ))}
                {addProductCategory === 'Natural Care' && ['Organic', 'Vegan', 'Cruelty-Free'].map(attr => (
                  <button
                    key={attr}
                    type="button"
                    onClick={() => {
                      const current = newProductAttributes || [];
                      setNewProductAttributes(current.includes(attr) ? current.filter(a => a !== attr) : [...current, attr]);
                    }}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      (newProductAttributes || []).includes(attr) 
                        ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' 
                        : 'bg-white text-text-secondary border-border-light hover:border-accent-primary/30'
                    }`}
                  >
                    {attr}
                  </button>
                ))}
                {addProductCategory === 'Handmade Crafts' && ['Wood', 'Clay', 'Fabric', 'Metal'].map(attr => (
                  <button
                    key={attr}
                    type="button"
                    onClick={() => {
                      const current = newProductAttributes || [];
                      setNewProductAttributes(current.includes(attr) ? current.filter(a => a !== attr) : [...current, attr]);
                    }}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      (newProductAttributes || []).includes(attr) 
                        ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' 
                        : 'bg-white text-text-secondary border-border-light hover:border-accent-primary/30'
                    }`}
                  >
                    {attr}
                  </button>
                ))}
                {addProductCategory === 'Sustainable Living' && ['Recyclable', 'Biodegradable', 'Plastic-Free'].map(attr => (
                  <button
                    key={attr}
                    type="button"
                    onClick={() => {
                      const current = newProductAttributes || [];
                      setNewProductAttributes(current.includes(attr) ? current.filter(a => a !== attr) : [...current, attr]);
                    }}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      (newProductAttributes || []).includes(attr) 
                        ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' 
                        : 'bg-white text-text-secondary border-border-light hover:border-accent-primary/30'
                    }`}
                  >
                    {attr}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Edit3 size={14} className="text-accent-primary" />
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Description</label>
              </div>
              <textarea 
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                className="w-full bg-white border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all placeholder:text-text-secondary/30 min-h-[140px] resize-none leading-relaxed shadow-sm focus:shadow-md" 
                placeholder="Tell the story behind your product..."
              />
            </div>

            <div className="pt-8 pb-20">
              <button 
                onClick={() => {
                  if (!newProductName || !newProductPrice) {
                    setToast("Please fill in required fields");
                    return;
                  }
                  const newProduct = {
                    id: Date.now(),
                    name: newProductName,
                    price: parseFloat(newProductPrice),
                    description: newProductDescription,
                    img: newProductImage || 'https://picsum.photos/seed/product/400/400',
                    stock: parseInt(newProductQuantity) || 0,
                    category: addProductCategory,
                    rating: 5.0,
                    reviews: 0,
                    attributes: newProductAttributes || [],
                    isVeg: (newProductAttributes || []).includes('Veg')
                  };
                  setSellerProducts(prev => [newProduct, ...prev]);
                  setToast("Product listed successfully!");
                  setNewProductImage(null);
                  setNewProductName('');
                  setNewProductPrice('');
                  setNewProductQuantity('10');
                  setNewProductDescription('');
                  setNewProductAttributes([]);
                  navigate('seller-dashboard');
                }}
                className="w-full bg-accent-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'seller-profile') {
    return (
      <Layout {...layoutProps} title="Seller Profile" onBack={() => navigate('seller-dashboard')}>
        <div className="p-8 space-y-12 pb-32">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Profile</h2>
            <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Manage your artisan account</p>
          </div>

          {/* Profile Header */}
          <div className="bg-bg-secondary p-10 rounded-[48px] border border-border-light shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 rounded-[32px] overflow-hidden border border-border-light shadow-sm">
                <img src={sellerData.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-text-primary tracking-tight">{sellerData.shopName || "Your Shop"}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-accent-primary/10 px-3 py-1 rounded-full border border-accent-primary/10">
                    <Star size={12} className="text-accent-primary fill-accent-primary" />
                    <span className="text-xs font-bold text-accent-primary">4.9</span>
                  </div>
                  <p className="text-xs text-text-secondary font-medium">{sellerData.city || "Location not set"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help & Support Section */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Help & Support</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <HelpCircle size={20} />, title: "Help Center", desc: "FAQs and guides for sellers", color: "text-blue-500" },
                { icon: <Phone size={20} />, title: "Contact Support", desc: "Talk to our seller support team", color: "text-emerald-500" },
                { icon: <Truck size={20} />, title: "Delivery Partners", desc: "Manage your logistics partners", color: "text-purple-500" },
                { icon: <MapPin size={20} />, title: "Order Tracking", desc: "Real-time tracking for your orders", color: "text-orange-500" }
              ].map((item, idx) => (
                <button key={idx} className="flex items-center gap-6 p-6 bg-bg-secondary border border-border-light rounded-[32px] shadow-sm hover:border-accent-primary/20 transition-all text-left group">
                  <div className={`w-14 h-14 rounded-2xl bg-bg-primary flex items-center justify-center border border-border-light ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-text-primary tracking-tight">{item.title}</h4>
                    <p className="text-[10px] text-text-secondary font-medium uppercase tracking-widest opacity-60 mt-1">{item.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-text-secondary opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Account Settings</h3>
            <div className="bg-bg-secondary rounded-[40px] border border-border-light overflow-hidden shadow-sm">
              {[
                { icon: <Settings size={18} />, title: "Shop Settings" },
                { icon: <CreditCard size={18} />, title: "Payout Methods" },
                { icon: <Bell size={18} />, title: "Notifications" },
                { icon: <Shield size={18} />, title: "Security & Privacy" }
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-6 border-b border-border-light last:border-0 hover:bg-bg-primary/50 transition-colors group">
                  <div className="flex items-center gap-5">
                    <span className="text-text-secondary group-hover:text-accent-primary transition-colors">{item.icon}</span>
                    <span className="text-xs font-bold text-text-primary uppercase tracking-widest">{item.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-text-secondary opacity-30" />
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              setRole('buyer');
              navigate('buyer-home');
            }}
            className="w-full py-6 rounded-2xl border border-red-500/20 text-red-500 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-red-500/5 transition-all flex items-center justify-center gap-3"
          >
            <LogOut size={18} /> Logout from Seller Panel
          </button>
        </div>
      </Layout>
    );
  }

  if (currentScreen === 'seller-manage-shop') {
    return (
      <Layout {...layoutProps} title="Manage Shop" onBack={() => navigate('seller-dashboard')}>
        <div className="p-8 space-y-12 pb-32">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Manage Shop</h2>
            <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Customize your artisan presence</p>
          </div>

          {/* Shop Profile Section */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em] px-2">Shop Profile</h4>
            
            <div className="bg-bg-secondary border border-border-light rounded-[48px] p-10 space-y-10 shadow-sm">
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full border border-border-light overflow-hidden bg-bg-primary flex items-center justify-center shadow-sm">
                    {sellerData.profilePhoto ? (
                      <img src={sellerData.profilePhoto} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <Store size={64} className="text-text-secondary/20" />
                    )}
                  </div>
                  <button 
                    onClick={() => profilePhotoRef.current?.click()}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-accent-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all border-4 border-bg-secondary"
                  >
                    <Upload size={18} />
                  </button>
                  <input 
                    type="file" 
                    ref={profilePhotoRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSellerData({ ...sellerData, profilePhoto: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-text-primary">Shop Logo</p>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60">Visible to all buyers</p>
                </div>
              </div>

              {/* Shop Banner */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-2">Shop Banner (Optional)</label>
                <div 
                  onClick={() => bannerPhotoRef.current?.click()}
                  className="w-full aspect-[3/1] rounded-3xl border border-border-light bg-bg-primary overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-accent-primary/30 transition-all group relative"
                >
                  {sellerData.shopBanner ? (
                    <>
                      <img src={sellerData.shopBanner} alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload size={24} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={24} className="text-text-secondary/20 group-hover:text-accent-primary transition-colors mb-2" />
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Upload Banner</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={bannerPhotoRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSellerData({ ...sellerData, shopBanner: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {sellerData.shopBanner && (
                  <button 
                    onClick={() => setSellerData({ ...sellerData, shopBanner: null })}
                    className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline px-2"
                  >
                    Remove Banner
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Shop Name *</label>
              <input 
                type="text" 
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all" 
                value={sellerData.shopName || ''}
                onChange={(e) => setSellerData({...sellerData, shopName: e.target.value})}
                placeholder="Enter shop name"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Shop Description *</label>
              <textarea 
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all min-h-[120px] resize-none" 
                value={sellerData.shopDescription || ''}
                onChange={(e) => setSellerData({...sellerData, shopDescription: e.target.value})}
                placeholder="Describe your shop..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Seller Name *</label>
              <input 
                type="text" 
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all" 
                value={sellerData.name || ''}
                onChange={(e) => setSellerData({...sellerData, name: e.target.value})}
                placeholder="Enter seller name"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Phone Number *</label>
              <input 
                type="text" 
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all" 
                value={sellerData.phone || ''}
                onChange={(e) => setSellerData({...sellerData, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Pickup Address *</label>
              <textarea 
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all min-h-[100px] resize-none" 
                value={sellerData.address || ''}
                onChange={(e) => setSellerData({...sellerData, address: e.target.value})}
                placeholder="Enter pickup address"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">City *</label>
                <input 
                  type="text" 
                  className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all" 
                  value={sellerData.city || ''}
                  onChange={(e) => setSellerData({...sellerData, city: e.target.value})}
                  placeholder="City"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Pincode *</label>
                <input 
                  type="text" 
                  className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all" 
                  value={sellerData.pincode || ''}
                  onChange={(e) => setSellerData({...sellerData, pincode: e.target.value})}
                  placeholder="Pincode"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] px-2">Delivery Radius (km) *</label>
              <input 
                type="number" 
                className="w-full bg-bg-secondary border border-border-light rounded-2xl py-5 px-6 focus:border-accent-primary outline-none text-sm text-text-primary transition-all" 
                value={sellerData.deliveryRadius || ''}
                onChange={(e) => setSellerData({...sellerData, deliveryRadius: e.target.value})}
                placeholder="e.g. 5"
              />
            </div>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => {
                const requiredFields = ['shopName', 'shopDescription', 'name', 'phone', 'address', 'city', 'pincode', 'deliveryRadius'];
                const missingFields = requiredFields.filter(field => !sellerData[field]);
                
                if (missingFields.length > 0) {
                  setToast("Please fill all required fields before saving.");
                  return;
                }

                setToast("Shop details updated successfully!");
                setCurrentScreen('seller-dashboard');
              }}
              className="w-full bg-accent-primary text-white py-6 rounded-3xl text-sm font-bold uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Save Shop Profile
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
}
