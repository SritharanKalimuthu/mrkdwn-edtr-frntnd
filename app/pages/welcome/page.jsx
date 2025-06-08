import React, { Suspense } from 'react';
import WelcomeMessage from '@/app/components/WelcomeMessage';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <WelcomeMessage />
    </Suspense>
  );
}