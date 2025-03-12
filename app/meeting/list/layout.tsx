'use client';

import React from 'react';

interface MeetingLayoutProps {
  title: React.ReactNode;
  meetingList: React.ReactNode;
}

export default function MeetingLayout({ title, meetingList }: MeetingLayoutProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      {title && <div>{title}</div>}
      {meetingList && <div>{meetingList}</div>}
    </div>
  );
}
