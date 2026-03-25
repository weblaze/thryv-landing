export interface IconData {
  name: string;
  label: string;
  href: string;
  habitColor?: string;
  svg: string;
}

export const icons: IconData[] = [
  {
    name: "dumbbell",
    label: "Dumbbell",
    href: "#",
    habitColor: "#FF2D55",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="18" width="4" height="12" rx="1"/><rect x="12" y="14" width="4" height="20" rx="1"/><rect x="32" y="14" width="4" height="20" rx="1"/><rect x="38" y="18" width="4" height="12" rx="1"/><line x1="16" y1="24" x2="32" y2="24"/></svg>`,
  },
  {
    name: "running-shoe",
    label: "Running",
    href: "#",
    habitColor: "#3B82F6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 32 C8 32 10 24 18 24 C22 24 24 28 28 28 C32 28 34 26 36 24 L40 22 L42 26 C42 26 42 32 36 34 L8 34 Z"/><line x1="14" y1="28" x2="14" y2="34"/><line x1="22" y1="28" x2="22" y2="34"/><line x1="30" y1="28" x2="30" y2="34"/></svg>`,
  },
  {
    name: "treadmill",
    label: "Treadmill",
    href: "#",
    habitColor: "#FF2D55",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="28" width="28" height="4" rx="2"/><line x1="12" y1="32" x2="8" y2="40"/><line x1="36" y1="32" x2="40" y2="40"/><circle cx="24" cy="16" r="3"/><path d="M20 22 L24 26 L28 22"/><line x1="24" y1="19" x2="24" y2="26"/></svg>`,
  },
  {
    name: "bicycle",
    label: "Cycling",
    href: "#",
    habitColor: "#3B82F6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="30" r="7"/><circle cx="34" cy="30" r="7"/><path d="M14 30 L20 18 L28 18"/><path d="M20 18 L24 30 L34 30"/><line x1="28" y1="18" x2="34" y2="30"/></svg>`,
  },
  {
    name: "trophy",
    label: "Trophy",
    href: "#",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10 L32 10 L30 26 C30 26 28 30 24 30 C20 30 18 26 18 26 Z"/><path d="M16 14 C16 14 10 14 10 20 C10 24 14 24 16 24"/><path d="M32 14 C32 14 38 14 38 20 C38 24 34 24 32 24"/><line x1="24" y1="30" x2="24" y2="36"/><rect x="18" y="36" width="12" height="3" rx="1"/></svg>`,
  },
  {
    name: "calendar",
    label: "Streak",
    href: "#",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="12" width="28" height="28" rx="3"/><line x1="10" y1="20" x2="38" y2="20"/><line x1="18" y1="8" x2="18" y2="16"/><line x1="30" y1="8" x2="30" y2="16"/><line x1="18" y1="26" x2="22" y2="30"/><line x1="22" y1="30" x2="30" y2="24"/></svg>`,
  },
  {
    name: "moon",
    label: "Sleep",
    href: "#",
    habitColor: "#8B5CF6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M34 28 C34 36 28 40 20 40 C12 40 6 34 6 26 C6 18 12 12 20 12 C16 16 16 24 22 30 C28 36 34 32 34 28 Z"/><circle cx="32" cy="12" r="1"/><circle cx="38" cy="18" r="1"/><circle cx="40" cy="10" r="1.5"/></svg>`,
  },
  {
    name: "water-drop",
    label: "Hydration",
    href: "#",
    habitColor: "#06B6D4",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 C24 6 12 20 12 30 C12 36.627 17.373 42 24 42 C30.627 42 36 36.627 36 30 C36 20 24 6 24 6 Z"/><path d="M18 30 C18 26 20 22 24 18" opacity="0.5"/></svg>`,
  },
  {
    name: "apple",
    label: "Nutrition",
    href: "#",
    habitColor: "#10B981",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 14 C20 10 14 12 12 16 C8 24 10 36 18 40 C20 42 22 42 24 40 C26 42 28 42 30 40 C38 36 40 24 36 16 C34 12 28 10 24 14 Z"/><path d="M24 8 C24 8 26 4 30 6"/></svg>`,
  },
  {
    name: "brain",
    label: "Meditation",
    href: "#",
    habitColor: "#F59E0B",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 40 L24 22"/><path d="M24 22 C24 14 18 10 14 12 C10 14 10 20 12 24 C8 22 4 26 6 30 C8 34 12 36 16 34 C14 38 18 42 24 40"/><path d="M24 22 C24 14 30 10 34 12 C38 14 38 20 36 24 C40 22 44 26 42 30 C40 34 36 36 32 34 C34 38 30 42 24 40"/></svg>`,
  },
  {
    name: "heart-rate",
    label: "Heart Rate",
    href: "#",
    habitColor: "#FF2D55",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 40 C24 40 6 28 6 18 C6 12 10 8 16 8 C20 8 23 10 24 14 C25 10 28 8 32 8 C38 8 42 12 42 18 C42 28 24 40 24 40 Z"/><polyline points="14 24 18 24 21 18 25 30 28 24 34 24"/></svg>`,
  },
  {
    name: "fire",
    label: "Streak",
    href: "#",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4 C24 4 16 14 16 24 C16 28 18 32 20 34 C18 30 20 26 24 24 C28 26 30 30 28 34 C30 32 32 28 32 24 C32 14 24 4 24 4 Z"/><path d="M20 34 C20 38 22 42 24 42 C26 42 28 38 28 34 C28 30 26 28 24 28 C22 28 20 30 20 34 Z"/></svg>`,
  },
  {
    name: "crown",
    label: "Gold League",
    href: "#",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 34 L12 16 L20 24 L24 12 L28 24 L36 16 L40 34 Z"/><rect x="8" y="34" width="32" height="4" rx="1"/></svg>`,
  },
  {
    name: "chart",
    label: "Progress",
    href: "#",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 36 16 24 24 30 32 16 40 20"/><line x1="8" y1="40" x2="40" y2="40"/><line x1="8" y1="12" x2="8" y2="40"/><circle cx="40" cy="20" r="2"/></svg>`,
  },
  {
    name: "group",
    label: "Community",
    href: "#",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="14" r="5"/><path d="M14 38 C14 30 18 26 24 26 C30 26 34 30 34 38"/><circle cx="12" cy="18" r="3.5"/><path d="M4 36 C4 30 7 28 12 28 C14 28 15 28.5 16 29"/><circle cx="36" cy="18" r="3.5"/><path d="M44 36 C44 30 41 28 36 28 C34 28 33 28.5 32 29"/></svg>`,
  },
  {
    name: "thryv",
    label: "THRYV",
    href: "#",
    habitColor: "#E8002D",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="24,8 30,18 40,18 32,26 35,38 24,30 13,38 16,26 8,18 18,18"/></svg>`,
  },
];
