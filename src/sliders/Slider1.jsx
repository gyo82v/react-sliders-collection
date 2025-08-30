import { useState, useEffect, useRef } from "react"
import image1 from "../images/slider1img1.jpg"
import image2 from "../images/slider1img2.jpg"
import image3 from "../images/slider1img3.jpg"

const slidesData = [
  { src: image1, title: 'Project 1', desc: 'Description for project 1' },
  { src: image2, title: 'Project 2', desc: 'Description for project 2' },
  { src: image3, title: 'Project 3', desc: 'Description for project 3' },
];

export default function Slider1() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const AUTO_MS = 5000; // milliseconds between auto slides

  //tailwind
  const slideContainer = `absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out`
  const overlayContentContainer = `absolute bottom-0 w-full flex flex-col items-center
                                   justify-center p-5 bg-[rgba(0,0,0,0.75)] text-white`
  const dotNavigationBtn = `w-2.5 h-2.5 rounded-full mx-1 focus:outline-none`
  //

  // Start the auto-advance interval
  const startInterval = () => {
    // clear previous if any
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slidesData.length);
    }, AUTO_MS);
  };

  // Navigate to a specific slide (mimics your original JS behaviour)
  function navigateToSlide(index) {
    clearInterval(intervalRef.current); // stop auto
    setCurrent(index); // show the chosen slide
    startInterval(); // restart auto
  }

  // Initialize interval on mount and clean up on unmount
  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects" className="section w-full">
      {/* Slider container */}
      <div className="relative overflow-hidden h-[400px]">
        {/* Slides (absolutely positioned, fading using opacity) */}
        {slidesData.map((slide, i) => (
          <div
            key={i}
            className={`${slideContainer} ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay content */}
            <div className={overlayContentContainer}>
              <h2 className="text-2xl font-semibold">{slide.title}</h2>
              <p className="text-sm mt-2 max-w-2xl text-center">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center mt-5">
        {slidesData.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => navigateToSlide(i)}
            className={`${dotNavigationBtn} ${i === current ? 'bg-gray-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
}

