'use client';

import React from 'react';

interface MeetingLayoutProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function MeetingLayout({ title, children }: MeetingLayoutProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      {title && <div>{title}</div>}
      {children && <div>{children}</div>}
    </div>
  );
}
