/**
 * Casa Mokador — menu data.
 *
 * Single source of truth for everything that appears in §Menu and §Shisha.
 * Edit prices here and they propagate everywhere.
 *
 * Conventions:
 *  - All prices in EUR, formatted with two decimals at render time.
 *  - Item names in Title Case.
 *  - Group order in `MENU` is the display order on the page.
 */

export interface MenuItem {
  name: string;
  price: number;
  /** Optional one-line modifier note shown under the name (e.g. allergens). */
  note?: string;
  /** Optional photo path, e.g. '/menu/croissant.jpg'. Shown as thumbnail when present. */
  photo?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  /** One-line italic descriptor under the section header. */
  caption: string;
  items: MenuItem[];
  /** When true, item rows include a photo thumbnail slot. */
  showPhotos?: boolean;
}

export const MENU: MenuCategory[] = [
  {
    id: 'cold',
    title: 'Cold Coffees',
    caption: 'For the Pafos afternoon — chilled, never compromised.',
    items: [
      { name: 'Frappé', price: 2.20 },
      { name: 'Freddo Espresso', price: 2.70 },
      { name: 'Freddo Cappuccino', price: 3.00 },
      { name: 'Iced Americano', price: 2.70 },
      { name: 'Iced Latte', price: 3.20 },
      { name: 'Iced Flat White', price: 3.70 },
      { name: 'Iced Mocha', price: 3.70 },
      { name: 'Caffeccino', price: 5.00 },
      { name: 'Iced Matcha', price: 5.00 },
      { name: 'Iced Chocolate', price: 4.00 },
      { name: 'Iced Tea', price: 2.50 },
      { name: 'Cyprus Drink', price: 3.00 },
      { name: 'Extra Shot', price: 0.50 },
    ],
  },
  {
    id: 'hot',
    title: 'Hot Coffees',
    caption: 'From the bar — espresso the way it’s drunk in Bologna.',
    items: [
      { name: 'Espresso', price: 2.00 },
      { name: 'Double Espresso', price: 2.80 },
      { name: 'Americano', price: 2.50 },
      { name: 'Cappuccino', price: 3.00 },
      { name: 'Double Cappuccino', price: 4.00 },
      { name: 'Latte', price: 3.50 },
      { name: 'Flat White', price: 3.50 },
      { name: 'Mocha', price: 3.70 },
      { name: 'Cyprus Coffee', price: 4.00 },
      { name: 'Cyprus Coffee (Small)', price: 2.00 },
      { name: 'Nescafé', price: 4.00 },
      { name: 'Filter Coffee', price: 3.30 },
      { name: 'Capsule Coffee', price: 1.50 },
      { name: 'Hot Matcha', price: 4.00 },
      { name: 'Matcha Latte (Small)', price: 4.50 },
      { name: 'Hot Chocolate (Large)', price: 4.00 },
      { name: 'Hot Chocolate (Small)', price: 3.50 },
      { name: 'Tea', price: 2.20 },
      { name: 'Extra Shot', price: 0.50 },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    caption: 'Fresh juices, cold beer, and the local pours.',
    items: [
      { name: 'Water', price: 1.00 },
      { name: 'Perrier', price: 2.70 },
      { name: 'Perrier (Bottle)', price: 3.50 },
      { name: 'Soft Drink', price: 2.70 },
      { name: 'Iced Tea', price: 2.70 },
      { name: 'Red Bull', price: 3.70 },
      { name: 'Lemonade', price: 3.50 },
      { name: 'Fresh Orange', price: 4.00 },
      { name: 'Fresh Carrot', price: 4.00 },
      { name: 'Fresh Apple', price: 4.00 },
      { name: 'Fresh Mix', price: 5.00 },
      { name: 'Non-Alcoholic Beer', price: 3.50 },
      { name: 'Stella (Alcohol Free)', price: 4.00 },
      { name: 'Carlsberg', price: 3.80 },
      { name: 'Heineken', price: 4.50 },
      { name: 'Stella', price: 4.50 },
      { name: 'Keo', price: 3.80 },
      { name: 'Jelen', price: 3.80 },
      { name: 'Zivania', price: 3.50 },
    ],
  },
  {
    id: 'pastries',
    title: 'Pastries',
    caption: 'Cyprus classics and Italian flake — baked daily.',
    showPhotos: true,
    items: [
      { name: 'Croissant (Plain)', price: 2.50 },
      { name: 'Nutella Croissant', price: 3.20 },
      { name: 'Croissant (Large)', price: 3.50 },
      { name: 'Pistachio Croissant', price: 4.00 },
      { name: 'Bougatsa Cream', price: 3.50 },
      { name: 'Bougatsa Cheese', price: 3.50 },
      { name: 'Bougatsa Spinach', price: 3.50 },
      { name: 'Olive Pie', price: 3.00 },
      { name: 'Cinnamon Muffins', price: 3.80 },
      { name: 'Chocolate Cake', price: 4.00 },
      { name: 'Cheesecake', price: 4.20 },
      { name: 'Cookie', price: 2.00 },
      { name: 'Bars', price: 2.50 },
      { name: 'Sorbet (Large)', price: 6.00 },
      { name: 'Sorbet (Small)', price: 3.00 },
      { name: 'Chips (Small)', price: 1.70 },
      { name: 'Chips (Kids)', price: 2.00 },
    ],
  },
  {
    id: 'toast',
    title: 'Toast & Bowls',
    caption: 'Slower mornings — a longer sit with something warm.',
    showPhotos: true,
    items: [
      { name: 'Oats Bowl', price: 3.60 },
      { name: 'Yogurt Bowl', price: 3.60 },
      { name: 'Peanut Fruits', price: 3.40 },
      { name: 'Tuna Wrap', price: 5.80 },
      { name: 'Chicken Egg Toast', price: 5.60 },
      { name: 'Salmon Toast', price: 5.80 },
      { name: 'Avocado Fried Egg', price: 5.20 },
      { name: 'Ham Cheese Fried Egg', price: 5.00 },
    ],
  },
];

/* ----------------------------------------------------------------
   E-Hookah menu.
   ---------------------------------------------------------------- */
export const SHISHA: MenuCategory = {
  id: 'shisha',
  title: 'E-Hookah',
  caption: 'For the long evening — the lounge menu.',
  items: [
    { name: 'C.APP', price: 35 },
    { name: 'Queen of the Dessert', price: 35 },
    { name: 'Lmn Frsh', price: 35 },
    { name: 'Sunny Tango', price: 35 },
    { name: 'Mellow Tide', price: 35 },
  ],
};

/** Format helper — EUR with two decimals. */
export function formatPrice(value: number): string {
  if (value === 0) return '€—';
  return `€${value.toFixed(2)}`;
}
