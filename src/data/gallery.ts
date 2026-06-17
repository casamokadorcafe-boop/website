/**
 * Gallery items.
 * - Photos live in `public/gallery/`. The `src` path is web-root relative.
 * - `shape` must match the photo's orientation so the CSS crops it cleanly:
 *     'tall'  = 4:5 portrait, 'wide' = 3:2 landscape, 'square' = 1:1.
 * - To add/remove items, edit this array.
 */
export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  /** 'tall' = 4:5 portrait, 'wide' = 3:2 landscape, 'square' = 1:1 */
  shape: 'tall' | 'wide' | 'square';
}

export const GALLERY: GalleryItem[] = [
  {
    src: '/gallery/IMG_1689.jpg',
    alt: 'Casa Mokador interior — living green wall, bar and velvet lounge seating',
    caption: 'The room, in full',
    shape: 'wide',
  },
  {
    src: '/gallery/IMG_1685.jpg',
    alt: 'The espresso bar — the VBM machine and back-bar shelves',
    caption: 'At the bar — first pour',
    shape: 'tall',
  },
  {
    src: '/gallery/IMG_1692.jpg',
    alt: 'Along the polished bar counter — brick, bottles and pendant light',
    caption: 'Down the length of the bar',
    shape: 'tall',
  },
  {
    src: '/gallery/IMG_1693.jpg',
    alt: 'Hanging greenery and caged pendant lights above the bar',
    caption: 'Greenery and glow',
    shape: 'tall',
  },
  {
    src: '/gallery/IMG_1690.jpg',
    alt: 'Lounge corner — green velvet chairs by the window',
    caption: 'Corner seats by the window',
    shape: 'tall',
  },
  {
    src: '/gallery/IMG_1694.jpg',
    alt: 'Casa Mokador storefront and pavement tables in Pafos',
    caption: 'Pafos, in the afternoon sun',
    shape: 'tall',
  },
];
