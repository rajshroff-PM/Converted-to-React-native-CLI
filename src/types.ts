import { LucideIcon } from 'lucide-react-native';

export interface Coordinate {
  x: number;
  y: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  customizable?: boolean;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  iconName: string;
  color: string;
  position: Coordinate;
  floor: string;
  hours: string;
  description: string;
  rating?: number;
  image?: string;
  menu?: MenuItem[];
  offer?: string;
}

export interface ChatSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
  sources?: ChatSource[];
  relatedStore?: Store;
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    type: 'boundary' | 'unit';
    storeId?: string;
    name?: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface GeoJSON {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  images?: string[];
  interestedCount?: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
  image?: string;
  comments: Comment[];
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  description: string;
  brand: string;
  iconName: string;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'earn' | 'redeem';
  description: string;
}

export interface LoyaltyCard {
  id: string;
  storeId: string;
  storeName: string;
  points: number;
  color: string;
  iconName: string;
  memberSince: string;
  tier: string;
  transactions: Transaction[];
  customImage?: string;
  cardNumber?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  image: string;
  color: string;
  position: Coordinate;
  floor: string;
  isSharing: boolean;
  lastUpdate: string;
}

export type AvatarId = 'glider' | 'cat' | 'bot';

export interface ParkingZone {
  id: string;
  name: string;
  level: string;
  capacity: number;
  occupied: number;
  type: '4-Wheeler' | '2-Wheeler' | 'EV Charging';
  position: Coordinate;
  bounds: { x: number, y: number, width: number, height: number };
  color: string;
}

export interface SavedVehicle {
  zoneId: string;
  slotNumber: string;
  level: string;
  timestamp: number;
  photo?: string;
  position: Coordinate;
}

export interface LostItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image?: string;
  contactName: string;
  status: 'open' | 'resolved';
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'Mall' | 'Airport' | 'Hospital' | 'Expo';
  isPremium?: boolean;
  image?: string;
}

export interface Amenity {
  id: string;
  name: string;
  iconName: string; 
  description?: string;
  image?: string;
  floor?: string;
  location?: Coordinate;
}

export interface Order {
  id: string;
  storeName: string;
  items: string[];
  total: number;
  date: string;
  status: 'Completed' | 'Cancelled' | 'In Progress' | 'Ready to takeaway' | 'Just ordered' | 'Preparing';
  rating?: number;
  pickupCode?: string;
}

export interface Coupon {
  code: string;
  description: string;
  discount: number;
  maxDiscount?: number;
  minOrderValue?: number;
  color: string;
}