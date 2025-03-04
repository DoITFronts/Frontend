'use client';

import React from 'react';

interface MeetingLayoutProps {
  children: React.ReactNode;
  host: React.ReactNode;
  description: React.ReactNode;
  location: React.ReactNode;
  reviews: React.ReactNode;
  bottombar: React.ReactNode;
}

export default function MeetingLayout({
  children,
  host,
  description,
  location,
  reviews,
  bottombar,
}: MeetingLayoutProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      <div>{children}</div>
      {host && <div>{host}</div>}
      {description && <div>{description}</div>}
      {location && <div>{location}</div>}
      {reviews && <div>{reviews}</div>}
      {bottombar && <div>{bottombar}</div>}
    </div>
  );
}
