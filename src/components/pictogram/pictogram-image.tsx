"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PictogramImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function PictogramImage({ src, alt, className, sizes = "112px" }: PictogramImageProps) {
  const [error, setError] = useState(false);
  const isDataUrl = src.startsWith("data:");
  const imageSrc = error ? "/pictograms/default.svg" : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={cn("object-contain p-2", className)}
      sizes={sizes}
      loading="lazy"
      unoptimized={isDataUrl}
      onError={() => setError(true)}
    />
  );
}
