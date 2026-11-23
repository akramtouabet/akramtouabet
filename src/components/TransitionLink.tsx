"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useUi } from "./Providers";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Couleur du rideau : celle de la page d'arrivée. */
  color: string;
};

export function TransitionLink({ href, color, onClick, ...rest }: Props) {
  const { go } = useUi();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    go(href, color);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
