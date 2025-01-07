export type AssetStatus = 'active' | 'idle' | 'warning' | 'critical' | 'outdated';

export interface Asset {
  id: string;
  title: string;
  model: string;
  details: string;
  status: AssetStatus;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  phone?: string;
  eta?: string;
  lastUpdate?: string;
}

export const assets: Asset[] = [
  {
    id: "1",
    title: "Bryce's Trailer",
    model: "Hyundai Translead C...",
    details: "No location Data",
    status: "outdated",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "CA 37, Vallejo, CA 94592"
    }
  },
  {
    id: "2",
    title: "10 TH 589",
    model: "Hyundai Translead C...",
    details: "John Doe",
    status: "active",
    phone: "6452765276542",
    location: {
      lat: 37.7858,
      lng: -122.4064,
      address: "CA 37, Vallejo, CA 94592"
    },
    eta: "ETA 03:00 PM MST / 10M LATE"
  },
  {
    id: "3",
    title: "Bryce's Trailer",
    model: "Volvo",
    details: "John Doe",
    status: "warning",
    phone: "6452765276542",
    location: {
      lat: 37.8044,
      lng: -122.2711,
      address: "24 mi Haydar Aliyev pr. 48, Baku, Azerbaijan"
    },
    eta: "ETA 03:00 PM MST / 10M LATE"
  },
  {
    id: "4",
    title: "Bryce's Trailer",
    model: "Mercedes-Benz",
    details: "SE of Oakland, CA",
    status: "critical",
    location: {
      lat: 37.7903,
      lng: -122.2165,
      address: "SE of Oakland, CA"
    },
    eta: "1h 24m"
  },
  {
    id: "5",
    title: "Test Asset",
    model: "Mercedes-Benz",
    details: "SE of Oakland, CA",
    location: {
      lat: 37.8047,
      lng: -122.2524,
      address: "SE of Oakland, CA"
    },
    status: "idle",
    lastUpdate: "08/15/24"
  }
];