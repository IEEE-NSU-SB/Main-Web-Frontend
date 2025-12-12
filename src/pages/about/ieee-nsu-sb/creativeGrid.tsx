import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Code,
  Film,
  Image,
  Users,
  CreditCard,
  Megaphone,
  Speaker,
  Calendar,
  Truck,
} from "lucide-react";

type GridItem = {
  id: string;
  title: string;
  Icon: LucideIcon;
};

const ITEMS: GridItem[] = [
  { id: "content", title: "Content Writing and Publications", Icon: FileText },
  { id: "web", title: "Website Development", Icon: Code },
  { id: "media", title: "Media", Icon: Film },
  { id: "graphics", title: "Graphics", Icon: Image },
  { id: "membership", title: "Membership Development", Icon: Users },
  { id: "finance", title: "Finance and Corporate", Icon: CreditCard },
  { id: "pr", title: "Public Relations", Icon: Megaphone },
  { id: "promotions", title: "Promotions", Icon: Speaker },
  { id: "events", title: "Events and Management", Icon: Calendar },
  { id: "logistics", title: "Logistics and Operations", Icon: Truck },
];

const CreativeGrid: React.FC = () => {
  return (
    <section className="mx-auto max-w-[1080px] px-5">
      {/* Grid container:
          - Mobile-first: 2 columns (good for phones)
          - md and up: 5 columns and 2 rows (total 10 items)
      */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:grid-rows-2">
        {ITEMS.map(({ id, title, Icon }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-start gap-2 rounded-2xl bg-white/60 p-4 text-center shadow-sm transition hover:shadow-lg hover:translate-y-[-2px] focus-within:shadow-lg"
            role="group"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100/80 ring-0 transition group-hover:scale-105"
              aria-hidden
            >
              <Icon className="h-7 w-7" />
            </div>

            <p className="mt-1 text-sm font-semibold text-gray-700">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreativeGrid;
