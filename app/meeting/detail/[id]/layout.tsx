'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import BottomFloatingBar from '@/components/layout/BottomFloatingBar';

interface MeetingLayoutProps {
  children: React.ReactNode;
  reviews: React.ReactNode | null;
  description: React.ReactNode | null;
}

export default function MeetingLayout({ children, reviews, description }: MeetingLayoutProps) {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 p-4">
      <div className="flex">{children}</div>
      <div>{description}</div>
      <div className="h-0 border-2 border-[#f0f0f0] opacity-50" />
      <div className="mb-24">{reviews}</div>
      <BottomFloatingBar id={id} title="번개팅" subtitle="지금 당장 신청해보라능" />
    </div>
  );
}
