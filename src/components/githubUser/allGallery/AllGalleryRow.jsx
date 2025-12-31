import React, { useState, useRef, useEffect } from 'react';
import css from './allGalleryRow.module.css';
import { createPortal } from 'react-dom';

export default function AllGalleryRow({ repos, direction }) {
  const contentRef = useRef(null);
  const pos = useRef(0);
  const lastTime = useRef(0);
  const raf = useRef(null);
  const widthRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const speedRef = useRef(direction === 'left' ? -0.1 : 0.1);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  
  const doubleImages = [...repos, ...repos];
  const closeImage=()=>{
    setSelectedImage(null);
    setPaused(false);
  }
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateWidth = () => {
      widthRef.current = content.scrollWidth / 2; 
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    const animate = (time) => {
    if (!lastTime.current) lastTime.current = time;
    const delta = time - lastTime.current;
    lastTime.current = time;

    if (!paused && widthRef.current) {
      pos.current += delta * speedRef.current;
      if (pos.current >= widthRef.current) {
        pos.current -= widthRef.current;
      }
        else if (pos.current <= 0){
         pos.current += widthRef.current;
        }

        content.style.transform = `translate3d(${-pos.current}px,0,0)`;
      }
    raf.current = requestAnimationFrame(animate)
  }
    raf.current = requestAnimationFrame(animate) 

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', updateWidth);
    
  }
}, [paused, speedRef]);
const handleTouchStart = (e) => {
  touchStartX.current = e.touches[0].clientX;
  touchCurrentX.current = touchStartX.current;
  setPaused(true);
};

const handleTouchMove = (e) => {
  touchCurrentX.current = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diff = touchCurrentX.current - touchStartX.current;

  if (Math.abs(diff) > 30) {
    if (diff < 0) {
      speedRef.current = Math.abs(speedRef.current);
    } 
    else {
      speedRef.current = -Math.abs(speedRef.current);
    }
  }

  setPaused(false);
};

  return (
    <div
      className={css.carousel_container}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={css.carousel_content} ref={contentRef}>
        {doubleImages.map((img, i) => (
          <img
            key={i}
            src={img.img}
            className={css.carousel_image}
            onClick={() => {setSelectedImage(img);
              setPaused(true)}
            }
          />
        ))}
      </div>

      {selectedImage &&
        createPortal(
        <div className={css.modal_window_image} onClick={closeImage}>
          <a href={selectedImage.ghPages} onClick={e => e.stopPropagation()}>
          <div className={css.modal_image_wrapper}> 
          <img src={selectedImage.img} className={css.modal_image} alt='repos-img'/>
          </div> 
          </a>
          <button className={css.modal_close_button} onClick={closeImage}>close</button>
        </div>,
        document.body
      )}
    </div>
  );
}
