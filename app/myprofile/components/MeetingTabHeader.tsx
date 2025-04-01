"use client";

import CategoryFilter from "@/components/ui/chip/CategoryFilter";

interface MeetingTabHeaderProps {
  selectedMenuTab: string;
  handleMenuClick: (tab: string) => void;
  menuTabs: string[];
}

export default function MeetingTabHeader({
  selectedMenuTab,
  handleMenuClick,
  menuTabs,
}: MeetingTabHeaderProps) {
  return (
    <div className="flex size-auto items-center gap-2.5 md:gap-3 lg:gap-3">
      {menuTabs.map((tab) => (
        <button
          className="cursor-pointer"
          key={tab}
          onClick={() => handleMenuClick(tab)}
        >
          <CategoryFilter
            text={tab}
            size="lg"
            mode={tab === selectedMenuTab ? "dark" : "light"}
          />
        </button>
      ))}
    </div>
  );
}
