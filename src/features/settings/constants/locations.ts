import { LocationData } from "@/features-solah/types";

import { TimeZoneOption } from "./timeZone";

export type LocationOption = {
  name: string;
  location: LocationData;
  timezone: TimeZoneOption;
  isDefault?: boolean;
};

export const locations: LocationOption[] = [
  // Default (the data inside the default is not used)
  {
    name: "Default (Current Location)",
    location: {
      city: "Ilorin",
      region: "Kwara",
      country: "Nigeria",
      latitude: 8.4966,
      longitude: 4.5421,
    },
    timezone: {
      name: "Default (System Timezone)",
      timezone: "Asia/Riyadh",
      isDefault: true,
    },
    isDefault: true,
  },

  // 🇳🇬 West Africa
  {
    name: "Ilorin, Nigeria",
    location: {
      city: "Ilorin",
      region: "Kwara",
      country: "Nigeria",
      latitude: 8.4966,
      longitude: 4.5421,
    },
    timezone: {
      name: "(UTC+01:00) West Central Africa (Lagos)",
      timezone: "Africa/Lagos",
    },
  },
  {
    name: "Kano, Nigeria",
    location: {
      city: "Kano",
      region: "Kano",
      country: "Nigeria",
      latitude: 12.0022,
      longitude: 8.5919,
    },
    timezone: {
      name: "(UTC+01:00) West Central Africa (Lagos)",
      timezone: "Africa/Lagos",
    },
  },
  {
    name: "Dakar, Senegal",
    location: {
      city: "Dakar",
      region: "Dakar",
      country: "Senegal",
      latitude: 14.7167,
      longitude: -17.4677,
    },
    timezone: {
      name: "(UTC+00:00) Greenwich Mean Time (Dakar)",
      timezone: "Africa/Dakar",
    },
  },
  {
    name: "Bamako, Mali",
    location: {
      city: "Bamako",
      region: "Bamako",
      country: "Mali",
      latitude: 12.6392,
      longitude: -8.0029,
    },
    timezone: {
      name: "(UTC+00:00) Greenwich Mean Time (Bamako)",
      timezone: "Africa/Bamako",
    },
  },

  // 🇪🇬 North Africa
  {
    name: "Cairo, Egypt",
    location: {
      city: "Cairo",
      region: "Cairo",
      country: "Egypt",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    timezone: {
      name: "(UTC+02:00) Cairo",
      timezone: "Africa/Cairo",
    },
  },
  {
    name: "Alexandria, Egypt",
    location: {
      city: "Alexandria",
      region: "Alexandria",
      country: "Egypt",
      latitude: 31.2001,
      longitude: 29.9187,
    },
    timezone: {
      name: "(UTC+02:00) Cairo",
      timezone: "Africa/Cairo",
    },
  },
  {
    name: "Rabat, Morocco",
    location: {
      city: "Rabat",
      region: "Rabat-Salé-Kénitra",
      country: "Morocco",
      latitude: 33.9716,
      longitude: -6.8498,
    },
    timezone: {
      name: "(UTC+00:00) Casablanca (Rabat)",
      timezone: "Africa/Casablanca",
    },
  },
  {
    name: "Tunis, Tunisia",
    location: {
      city: "Tunis",
      region: "Tunis",
      country: "Tunisia",
      latitude: 36.8065,
      longitude: 10.1815,
    },
    timezone: {
      name: "(UTC+01:00) Central European Time (Tunis)",
      timezone: "Africa/Tunis",
    },
  },

  // 🇸🇦 Gulf / Arabian Peninsula
  {
    name: "Makkah, Saudi Arabia",
    location: {
      city: "Mecca",
      region: "Makkah",
      country: "Saudi Arabia",
      latitude: 21.3891,
      longitude: 39.8579,
    },
    timezone: {
      name: "(UTC+03:00) Kuwait, Riyadh",
      timezone: "Asia/Riyadh",
    },
  },
  {
    name: "Madinah, Saudi Arabia",
    location: {
      city: "Medina",
      region: "Madinah",
      country: "Saudi Arabia",
      latitude: 24.5247,
      longitude: 39.5692,
    },
    timezone: {
      name: "(UTC+03:00) Kuwait, Riyadh",
      timezone: "Asia/Riyadh",
    },
  },
  {
    name: "Riyadh, Saudi Arabia",
    location: {
      city: "Riyadh",
      region: "Riyadh",
      country: "Saudi Arabia",
      latitude: 24.7136,
      longitude: 46.6753,
    },
    timezone: {
      name: "(UTC+03:00) Kuwait, Riyadh",
      timezone: "Asia/Riyadh",
    },
  },
  {
    name: "Jeddah, Saudi Arabia",
    location: {
      city: "Jeddah",
      region: "Makkah",
      country: "Saudi Arabia",
      latitude: 21.4858,
      longitude: 39.1925,
    },
    timezone: {
      name: "(UTC+03:00) Kuwait, Riyadh",
      timezone: "Asia/Riyadh",
    },
  },
  {
    name: "Dubai, UAE",
    location: {
      city: "Dubai",
      region: "Dubai",
      country: "United Arab Emirates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    timezone: {
      name: "(UTC+04:00) Abu Dhabi, Muscat (Dubai)",
      timezone: "Asia/Dubai",
    },
  },
  {
    name: "Doha, Qatar",
    location: {
      city: "Doha",
      region: "Doha",
      country: "Qatar",
      latitude: 25.2854,
      longitude: 51.531,
    },
    timezone: {
      name: "(UTC+03:00) Qatar (Doha)",
      timezone: "Asia/Qatar",
    },
  },
  {
    name: "Kuwait City, Kuwait",
    location: {
      city: "Kuwait City",
      region: "Al Asimah",
      country: "Kuwait",
      latitude: 29.3759,
      longitude: 47.9774,
    },
    timezone: {
      name: "(UTC+03:00) Kuwait (Kuwait City)",
      timezone: "Asia/Kuwait",
    },
  },
  {
    name: "Muscat, Oman",
    location: {
      city: "Muscat",
      region: "Muscat",
      country: "Oman",
      latitude: 23.588,
      longitude: 58.3829,
    },
    timezone: {
      name: "(UTC+04:00) Abu Dhabi, Muscat (Muscat)",
      timezone: "Asia/Muscat",
    },
  },

  // 🇵🇰 South Asia
  {
    name: "Karachi, Pakistan",
    location: {
      city: "Karachi",
      region: "Sindh",
      country: "Pakistan",
      latitude: 24.8607,
      longitude: 67.0011,
    },
    timezone: {
      name: "(UTC+05:00) Islamabad, Karachi",
      timezone: "Asia/Karachi",
    },
  },
  {
    name: "Lahore, Pakistan",
    location: {
      city: "Lahore",
      region: "Punjab",
      country: "Pakistan",
      latitude: 31.5204,
      longitude: 74.3587,
    },
    timezone: {
      name: "(UTC+05:00) Islamabad, Karachi",
      timezone: "Asia/Karachi",
    },
  },
  {
    name: "Islamabad, Pakistan",
    location: {
      city: "Islamabad",
      region: "ICT",
      country: "Pakistan",
      latitude: 33.6844,
      longitude: 73.0479,
    },
    timezone: {
      name: "(UTC+05:00) Islamabad, Karachi",
      timezone: "Asia/Karachi",
    },
  },
  {
    name: "Dhaka, Bangladesh",
    location: {
      city: "Dhaka",
      region: "Dhaka",
      country: "Bangladesh",
      latitude: 23.8103,
      longitude: 90.4125,
    },
    timezone: {
      name: "(UTC+06:00) Dhaka",
      timezone: "Asia/Dhaka",
    },
  },

  // 🇮🇩 Southeast Asia
  {
    name: "Jakarta, Indonesia",
    location: {
      city: "Jakarta",
      region: "Jakarta",
      country: "Indonesia",
      latitude: -6.2088,
      longitude: 106.8456,
    },
    timezone: {
      name: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
      timezone: "Asia/Jakarta",
    },
  },
  {
    name: "Bandung, Indonesia",
    location: {
      city: "Bandung",
      region: "West Java",
      country: "Indonesia",
      latitude: -6.9175,
      longitude: 107.6191,
    },
    timezone: {
      name: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
      timezone: "Asia/Jakarta",
    },
  },
  {
    name: "Kuala Lumpur, Malaysia",
    location: {
      city: "Kuala Lumpur",
      region: "Kuala Lumpur",
      country: "Malaysia",
      latitude: 3.139,
      longitude: 101.6869,
    },
    timezone: {
      name: "(UTC+08:00) Kuala Lumpur, Singapore",
      timezone: "Asia/Kuala_Lumpur",
    },
  },
  {
    name: "Penang, Malaysia",
    location: {
      city: "George Town",
      region: "Penang",
      country: "Malaysia",
      latitude: 5.4141,
      longitude: 100.3288,
    },
    timezone: {
      name: "(UTC+08:00) Kuala Lumpur, Singapore",
      timezone: "Asia/Kuala_Lumpur",
    },
  },

  // 🇹🇷 / 🇮🇷
  {
    name: "Istanbul, Turkey",
    location: {
      city: "Istanbul",
      region: "Istanbul",
      country: "Turkey",
      latitude: 41.0082,
      longitude: 28.9784,
    },
    timezone: {
      name: "(UTC+03:00) Istanbul",
      timezone: "Europe/Istanbul",
    },
  },
  {
    name: "Ankara, Turkey",
    location: {
      city: "Ankara",
      region: "Ankara",
      country: "Turkey",
      latitude: 39.9334,
      longitude: 32.8597,
    },
    timezone: {
      name: "(UTC+03:00) Istanbul",
      timezone: "Europe/Istanbul",
    },
  },
  {
    name: "Tehran, Iran",
    location: {
      city: "Tehran",
      region: "Tehran",
      country: "Iran",
      latitude: 35.6892,
      longitude: 51.389,
    },
    timezone: {
      name: "(UTC+03:30) Tehran",
      timezone: "Asia/Tehran",
    },
  },

  // 🇪🇹 East Africa
  {
    name: "Addis Ababa, Ethiopia",
    location: {
      city: "Addis Ababa",
      region: "Addis Ababa",
      country: "Ethiopia",
      latitude: 9.03,
      longitude: 38.74,
    },
    timezone: {
      name: "(UTC+03:00) Nairobi (Addis Ababa)",
      timezone: "Africa/Addis_Ababa",
    },
  },
  {
    name: "Mogadishu, Somalia",
    location: {
      city: "Mogadishu",
      region: "Banaadir",
      country: "Somalia",
      latitude: 2.0469,
      longitude: 45.3182,
    },
    timezone: {
      name: "(UTC+03:00) Nairobi (Mogadishu)",
      timezone: "Africa/Mogadishu",
    },
  },

  // 🇺🇿 / 🇦🇫 Central Asia
  {
    name: "Tashkent, Uzbekistan",
    location: {
      city: "Tashkent",
      region: "Tashkent",
      country: "Uzbekistan",
      latitude: 41.2995,
      longitude: 69.2401,
    },
    timezone: {
      name: "(UTC+05:00) Tashkent",
      timezone: "Asia/Tashkent",
    },
  },
  {
    name: "Kabul, Afghanistan",
    location: {
      city: "Kabul",
      region: "Kabul",
      country: "Afghanistan",
      latitude: 34.5553,
      longitude: 69.2075,
    },
    timezone: {
      name: "(UTC+04:30) Kabul",
      timezone: "Asia/Kabul",
    },
  },
];
