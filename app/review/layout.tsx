'use client';

import React from 'react';

interface ReviewLayoutProps {
  title: React.ReactNode;
  reviewList: React.ReactNode;
}

export default function ReviewLayout({ title, reviewList }: ReviewLayoutProps) {
  return (
    <div className="mx-auto mt-[30px] flex max-w-[1200px] flex-col px-4 md:mt-[72px] md:px-8 lg:w-[95%]">
      {title && <div>{title}</div>}
      {reviewList && <div>{reviewList}</div>}
    </div>
  );
}
