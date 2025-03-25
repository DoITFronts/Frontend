"use client";

import React from "react";

interface LikedListLayoutProps {
  title: React.ReactNode;
  likedList: React.ReactNode;
}

export default function MeetingLayout({
  title,
  likedList,
}: LikedListLayoutProps) {
  return (
    <div className="mx-auto mt-[30px] flex w-[95%] max-w-[1200px] flex-col md:mt-[72px]">
      {title && <div>{title}</div>}
      {likedList && <div>{likedList}</div>}
    </div>
  );
}
