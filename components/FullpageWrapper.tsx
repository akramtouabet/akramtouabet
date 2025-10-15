"use client";

import React from "react";

export default function FullpageWrapper({
  anchors,
  children,
}: {
  anchors: string[];
  children: React.ReactNode;
}) {
  return (
    <main id="fullpage" className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {Array.isArray(children)
        ? (children as React.ReactNode[]).map((child, i) => (
            <section
              key={anchors[i] || i}
              id={anchors[i]}
              className="snap-start h-screen w-full flex flex-col items-center justify-center"
            >
              {child}
            </section>
          ))
        : (
          <section
            id={anchors[0]}
            className="snap-start h-screen w-full flex flex-col items-center justify-center"
          >
            {children}
          </section>
        )}
    </main>
  );
}
