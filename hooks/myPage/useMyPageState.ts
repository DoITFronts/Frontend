"use client";

import { useState } from "react";

export default function useMyPageState() {
  const [selectedMenuTab, setSelectedMenuTab] = useState("나의 번개");
  const [selectedActivityTab, setSelectedActivityTab] = useState("");

  const handleMenuClick = (tab: string) => {
    if (tab === selectedMenuTab) {
      setSelectedMenuTab("");
    } else {
      setSelectedMenuTab(tab);
    }
  };

  const handleActivityClick = (tab: string) => {
    if (tab === selectedActivityTab) {
      setSelectedActivityTab("");
    } else {
      setSelectedActivityTab(tab);
    }
  };

  return {
    selectedMenuTab,
    selectedActivityTab,
    handleMenuClick,
    handleActivityClick,
  };
}
