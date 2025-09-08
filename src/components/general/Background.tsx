// app/components/Background.tsx
'use client';
import React from 'react';

export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none select-none">
      {/* animated gradient */}
      <div className="absolute inset-0 bg-animated-gradient" />

      {/* subtle noise overlay */}
      <div className="absolute inset-0 bg-noise" />

      {/* optional vignette to darken edges (keeps content readable) */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}
