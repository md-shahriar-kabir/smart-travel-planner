export interface Trip {
  _id: string;
  title: string;
  destination: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  durationDays: number;
  rating: number;
  imageUrl: string;
  category: 'Adventure' | 'Beach' | 'Cultural' | 'Luxury' | 'Budget';
  location: string;
  createdAt?: string;
}