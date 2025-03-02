'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import BottomFloatingBar from '@/components/layout/BottomFloatingBar';

interface MeetingLayoutProps {
  children: React.ReactNode;
  host?: React.ReactNode;
  description?: React.ReactNode;
  reviews?: React.ReactNode;
}

export default function MeetingLayout({
  children,
  host,
  description,
  reviews,
}: MeetingLayoutProps) {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      <div>{children}</div>
      {host && <div>{host}</div>}
      {description && <div>{description}</div>}
      {reviews && <div>{reviews}</div>}
      <BottomFloatingBar id={id} title="번개팅" subtitle="지금 당장 신청해보라능" />
    </div>
  );
}
