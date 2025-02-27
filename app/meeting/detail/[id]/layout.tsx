import React from 'react';

interface MeetingLayoutProps {
  children: React.ReactNode;
  reviews: React.ReactNode | null;
  description: React.ReactNode | null;
}

export default function MeetingLayout({ children, reviews, description }: MeetingLayoutProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 p-4">
      <div className="flex">{children}</div>
      <div>{description}</div>
      <div className="mb-24">{reviews}</div>
    </div>
  );
}
