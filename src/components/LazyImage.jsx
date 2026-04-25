import { useState } from "react";

export const LazyImage = ({ src, alt, className = "", imgClassName = "", style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <div
        className={`absolute inset-0 bg-white/[0.04] transition duration-500 ${
          loaded ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover transition duration-700 ${
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        } ${imgClassName}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
