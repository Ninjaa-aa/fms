export interface Asset {
  id: string;
  checkbox?: boolean;
  icon?: string;
  iconColor?: string;
  title: string;
  model: string;
  details: string;
  phone?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'idle' | 'active' | 'warning' | 'critical';
  eta?: string;
  lastUpdate?: string;
}

export const assets: Asset[] = [
  {
    id: "1",
    checkbox: true,
    title: "Bryce's Trailer",
    model: "Hyundai Translead C...",
    details: "No location Data",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "CA 37, Vallejo, CA 94592"
    },
    status: "idle",
    eta: "ETA 03:00 PM MIST / 10M LATE",
  },
  {
    id: "2",
    icon: "fa-check-circle",
    iconColor: "text-green-500",
    title: "10 TH 589",
    model: "Hyundai Translead C...",
    details: "John Doe",
    phone: "6452765276542",
    location: {
      lat: 37.7858,
      lng: -122.4064,
      address: "CA 37, Vallejo, CA 94592"
    },
    status: "active",
    eta: "ETA 03:00 PM MIST / 10M LATE",
  },
  {
    id: "3",
    icon: "fa-exclamation-circle",
    iconColor: "text-yellow-500",
    title: "Bryce's Trailer",
    model: "Volvo",
    details: "John Doe",
    phone: "6452765276542",
    location: {
      lat: 37.8044,
      lng: -122.2711,
      address: "24 mi Haydar Aliyev pr. 48, Baku, Azerbaijan"
    },
    status: "warning",
    eta: "ETA 03:00 PM MIST / 10M LATE",
  },
  {
    id: "4",
    icon: "fa-battery-half",
    iconColor: "text-red-500",
    title: "Bryce's Trailer",
    model: "Mercedes-Benz",
    details: "SE of Oakland, CA",
    location: {
      lat: 37.7903,
      lng: -122.2165,
      address: "SE of Oakland, CA"
    },
    status: "critical",
    eta: "1h 24m",
  },
  {
    id: "5",
    checkbox: true,
    title: "Test Asset",
    model: "Mercedes-Benz",
    details: "SE of Oakland, CA",
    location: {
      lat: 37.8047,
      lng: -122.2524,
      address: "SE of Oakland, CA"
    },
    status: "idle",
    lastUpdate: "08/15/24",
  },
];