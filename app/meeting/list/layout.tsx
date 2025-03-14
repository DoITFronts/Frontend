'use client';

import React from 'react';

interface MeetingLayoutProps {
  title: React.ReactNode;
  meetingList: React.ReactNode;
}

export default function MeetingLayout({ title, meetingList }: MeetingLayoutProps) {
  return (
    <div className="mx-auto mt-[30px] flex max-w-[1200px] flex-col md:mt-[72px] w-[95%]">
      {title && <div>{title}</div>}
      {meetingList && <div>{meetingList}</div>}
    </div>
  );
}
