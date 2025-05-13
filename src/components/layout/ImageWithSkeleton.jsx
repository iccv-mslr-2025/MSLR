// src/components/layout/ImageWithSkeleton.jsx
import React, { useState, useEffect } from 'react';

const ImageWithSkeleton = ({
    src,
    alt,
    className,
    width,
    height,
    priority = false,
    loading = "lazy",
    sizes = "100vw"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Reset state when src changes
        setIsLoaded(false);
        setError(false);
    }, [src]);

    // Set loading attribute based on priority
    const imgLoading = priority ? "eager" : loading;

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
            {!isLoaded && !error && (
                <div
                    className="absolute inset-0 bg-brand-neutral-200 animate-pulse rounded-lg"
                    aria-hidden="true"
                />
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-neutral-100 rounded-lg">
                    <span className="text-brand-neutral-500 text-sm">Image not available</span>
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                width={width}
                height={height}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                loading={imgLoading}
                sizes={sizes}
                decoding="async"
            />
        </div>
    );
};

export default ImageWithSkeleton;