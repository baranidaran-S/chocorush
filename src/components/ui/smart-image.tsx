"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type SmartImageProps = ImageProps & {
  /** Rendered instead of the image when the file is missing or fails to load. */
  fallback: ReactNode;
};

/** next/image that fades in once loaded and swaps to a fallback if the file isn't there yet. */
export function SmartImage({ fallback, alt, className, onLoad, onError, ...props }: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  if (status === "error") return <>{fallback}</>;

  return (
    <Image
      {...props}
      alt={alt}
      className={`${className ?? ""} transition-opacity duration-500 ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
      onLoad={(e) => {
        setStatus("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        setStatus("error");
        onError?.(e);
      }}
    />
  );
}
