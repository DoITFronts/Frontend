'use client';

import React from 'react';

interface ReviewLayoutProps {
  title: React.ReactNode;
  reviewList: React.ReactNode;
}

export default function ReviewLayout({ title, reviewList }: ReviewLayoutProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      {title && <div>{title}</div>}
      {reviewList && <div>{reviewList}</div>}
    </div>
  );
}
