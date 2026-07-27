import React, { useState, useRef, ComponentProps } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { Maximize2, ZoomIn, ZoomOut, X } from 'lucide-react';

export interface ImageZoomProps extends ComponentProps<"div"> {
  src?: string;
  alt?: string;
  zoomScale?: number;
  transition?: Transition;
  zoomOnHover?: boolean;
  zoomOnClick?: boolean;
  disabled?: boolean;
  imageClassName?: string;
  children?: React.ReactNode;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt = "",
  zoomScale = 2.2,
  transition = { type: "spring", stiffness: 220, damping: 26 },
  zoomOnHover = true,
  zoomOnClick = true,
  disabled = false,
  className = "",
  imageClassName = "",
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalZoomScale, setModalZoomScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomOnHover || disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setTransformOrigin(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  };

  const handleMouseEnter = () => {
    if (!disabled && zoomOnHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disabled && zoomOnHover) {
      setIsHovered(false);
      setTransformOrigin("50% 50%");
    }
  };

  const handleClick = () => {
    if (!disabled && zoomOnClick) {
      setIsFullscreen(true);
      setModalZoomScale(1);
    }
  };

  return (
    <>
      {/* Main Inline Image Zoom Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative overflow-hidden rounded-2xl cursor-zoom-in group select-none ${className}`}
        {...props}
      >
        {children ? (
          <motion.div
            animate={{
              scale: isHovered ? zoomScale : 1,
              transformOrigin: transformOrigin,
            }}
            transition={transition}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        ) : (
          <motion.img
            src={src}
            alt={alt}
            animate={{
              scale: isHovered ? zoomScale : 1,
              transformOrigin: transformOrigin,
            }}
            transition={transition}
            className={`w-full h-auto object-contain block transition-shadow ${imageClassName}`}
          />
        )}

        {/* Hover Hint Overlay */}
        <div className="absolute inset-0 bg-[#1E205C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
          <span className="px-4 py-2 bg-[#1E205C]/90 text-white text-xs font-black rounded-xl border border-[#1CBDB3]/40 shadow-2xl flex items-center gap-2 backdrop-blur-md">
            <ZoomIn className="w-4 h-4 text-[#FFB800]" /> Hover untuk Zoom / Klik untuk Fullscreen
          </span>
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-50 bg-[#1E205C]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
          >
            {/* Modal Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl flex items-center justify-between text-white mb-3 px-2 z-10"
            >
              <div className="flex items-center gap-2">
                <ZoomIn className="w-5 h-5 text-[#FFB800]" />
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                  {alt || "Tampilan Detail Kurikulum"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalZoomScale((prev) => Math.min(prev + 0.3, 3))}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-[#52E2DA]" />
                </button>
                <button
                  onClick={() => setModalZoomScale((prev) => Math.max(prev - 0.3, 0.7))}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-[#52E2DA]" />
                </button>
                <button
                  onClick={() => setModalZoomScale(1)}
                  className="px-2.5 py-1 text-[11px] font-black rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-extrabold ml-2"
                >
                  <X className="w-5 h-5 text-[#FFB800]" /> Tutup (ESC)
                </button>
              </div>
            </div>

            {/* Modal Image Wrapper with Spring Motion Scale */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[82vh] bg-white rounded-2xl p-2 sm:p-4 overflow-auto shadow-2xl border border-white/20 flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <motion.img
                src={src}
                alt={alt}
                animate={{ scale: modalZoomScale }}
                transition={transition}
                className="w-full h-auto min-w-[700px] object-contain rounded-xl origin-center"
              />
            </div>

            <p className="text-xs text-slate-300 mt-3 font-medium text-center">
              * Gunakan tombol zoom di kanan atas untuk membesarkan detail alur mata kuliah.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
