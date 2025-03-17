'use client';

import React from 'react';

interface ReviewLayoutProps {
  title: React.ReactNode;
  reviewList: React.ReactNode;
}

export default function ReviewLayout({ title, reviewList }: ReviewLayoutProps) {
  return (
    <div className="mx-auto mt-[30px] flex w-[95%] max-w-[1200px] flex-col md:mt-[72px]">
      {title && <div>{title}</div>}
      {reviewList && <div>{reviewList}</div>}
    </div>
  );
}
