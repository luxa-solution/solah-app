export type TimeZoneOption = {
  name: string;
  timezone: string;
  isDefault?: boolean;
};

export const timezones: readonly TimeZoneOption[] = [
  // Default (store handles what it really means)
  {
    name: "Default (System Timezone)",
    timezone: "Asia/Riyadh",
    isDefault: true,
  },

  // --- UTC / GMT ---
  {
    name: "(UTC+00:00) Greenwich Mean Time",
    timezone: "Africa/Abidjan",
  },

  // --- Negative offsets (Americas) ---
  {
    name: "(UTC-11:00) Midway Island, Samoa",
    timezone: "Pacific/Midway",
  },
  {
    name: "(UTC-10:00) Hawaii",
    timezone: "Pacific/Honolulu",
  },
  {
    name: "(UTC-09:00) Alaska",
    timezone: "America/Anchorage",
  },
  {
    name: "(UTC-08:00) Pacific Time (US & Canada)",
    timezone: "America/Los_Angeles",
  },
  {
    name: "(UTC-07:00) Mountain Time (US & Canada)",
    timezone: "America/Denver",
  },
  {
    name: "(UTC-06:00) Central Time (US & Canada)",
    timezone: "America/Chicago",
  },
  {
    name: "(UTC-05:00) Eastern Time (US & Canada)",
    timezone: "America/New_York",
  },
  {
    name: "(UTC-04:00) Atlantic Time (Canada)",
    timezone: "America/Halifax",
  },
  {
    name: "(UTC-03:30) Newfoundland",
    timezone: "America/St_Johns",
  },
  {
    name: "(UTC-03:00) Brasilia",
    timezone: "America/Sao_Paulo",
  },
  {
    name: "(UTC-02:00) Mid-Atlantic",
    timezone: "Atlantic/South_Georgia",
  },
  {
    name: "(UTC-01:00) Azores",
    timezone: "Atlantic/Azores",
  },

  // --- Positive offsets (Europe / Africa / Middle East) ---
  {
    name: "(UTC+01:00) West Central Africa (Lagos)",
    timezone: "Africa/Lagos",
  },
  {
    name: "(UTC+01:00) Central European Time (Paris)",
    timezone: "Europe/Paris",
  },
  {
    name: "(UTC+02:00) Cairo",
    timezone: "Africa/Cairo",
  },
  {
    name: "(UTC+02:00) South Africa (Johannesburg)",
    timezone: "Africa/Johannesburg",
  },
  {
    name: "(UTC+03:00) Kuwait, Riyadh",
    timezone: "Asia/Riyadh",
  },
  {
    name: "(UTC+03:30) Tehran",
    timezone: "Asia/Tehran",
  },
  {
    name: "(UTC+04:00) Abu Dhabi, Muscat",
    timezone: "Asia/Dubai",
  },
  {
    name: "(UTC+04:30) Kabul",
    timezone: "Asia/Kabul",
  },

  // --- Asia (incl. fractional offsets) ---
  {
    name: "(UTC+05:00) Islamabad, Karachi",
    timezone: "Asia/Karachi",
  },
  {
    name: "(UTC+05:00) Tashkent",
    timezone: "Asia/Tashkent",
  },
  {
    name: "(UTC+05:30) India Standard Time (Chennai, Kolkata, Mumbai, New Delhi)",
    timezone: "Asia/Calcutta",
  },
  {
    name: "(UTC+05:45) Kathmandu",
    timezone: "Asia/Katmandu",
  },
  {
    name: "(UTC+06:00) Dhaka",
    timezone: "Asia/Dhaka",
  },
  {
    name: "(UTC+06:30) Yangon (Rangoon)",
    timezone: "Asia/Rangoon",
  },
  {
    name: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
    timezone: "Asia/Bangkok",
  },
  {
    name: "(UTC+08:00) Kuala Lumpur, Singapore",
    timezone: "Asia/Singapore",
  },
  {
    name: "(UTC+09:00) Osaka, Sapporo, Tokyo",
    timezone: "Asia/Tokyo",
  },
  {
    name: "(UTC+09:00) Seoul",
    timezone: "Asia/Seoul",
  },

  // --- Australia / Pacific (incl. fractional offsets) ---
  {
    name: "(UTC+09:30) Adelaide",
    timezone: "Australia/Adelaide",
  },
  {
    name: "(UTC+10:00) Canberra, Melbourne, Sydney",
    timezone: "Australia/Sydney",
  },
  {
    name: "(UTC+10:30) Lord Howe Island",
    timezone: "Australia/Lord_Howe",
  },
  {
    name: "(UTC+11:00) New Caledonia (Noumea)",
    timezone: "Pacific/Noumea",
  },
  {
    name: "(UTC+12:00) Auckland, Wellington",
    timezone: "Pacific/Auckland",
  },
  {
    name: "(UTC+12:45) Chatham Islands",
    timezone: "Pacific/Chatham",
  },
  {
    name: "(UTC+13:00) Nuku'alofa",
    timezone: "Pacific/Tongatapu",
  },
  {
    name: "(UTC+14:00) Kiritimati Island",
    timezone: "Pacific/Kiritimati",
  },
];
