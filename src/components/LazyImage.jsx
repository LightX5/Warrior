import { memo, useMemo, useState } from "react";
import { imageManifest } from "../data/imageManifest";

const LazyImageComponent = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  sizes = "100vw",
  priority = false,
  fill = false,
  width,
  height,
  imgStyle,
  onLoad,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const asset = imageManifest[src];
  const resolvedWidth = width ?? asset?.width;
  const resolvedHeight = height ?? asset?.height;

  const wrapperStyle = useMemo(() => {
    if (fill) {
      return style;
    }

    if (style?.aspectRatio || !resolvedWidth || !resolvedHeight) {
      return style;
    }

    return {
      aspectRatio: `${resolvedWidth} / ${resolvedHeight}`,
      ...style,
    };
  }, [fill, resolvedHeight, resolvedWidth, style]);

  const handleLoad = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={wrapperStyle}>
      {asset?.placeholder ? (
        <img
          src={asset.placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-105 object-cover blur-2xl transition duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-white/[0.04] transition duration-500 ${
            loaded ? "opacity-0" : "animate-pulse opacity-100"
          }`}
        />
      )}

      <picture>
        {asset?.webpSrcSet ? <source type="image/webp" srcSet={asset.webpSrcSet} sizes={sizes} /> : null}
        <img
          src={src}
          alt={alt}
          width={resolvedWidth}
          height={resolvedHeight}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          style={imgStyle}
          className={`h-full w-full object-cover transition duration-700 ${
            fill ? "absolute inset-0" : ""
          } ${loaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"} ${imgClassName}`}
          onLoad={handleLoad}
          {...rest}
        />
      </picture>
    </div>
  );
};

export const LazyImage = memo(LazyImageComponent);
