import  { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight,  } from 'lucide-react';
import { Link } from 'react-router';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  const sliderImages = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?_gl=1*186j68k*_ga*MTMyOTE3MDQ0NS4xNzUyMTY0MTk3*_ga_8JE65Q40S6*czE3NTIxNjQxOTYkbzEkZzEkdDE3NTIxNjQyMDgkajQ4JGwwJGgw',
      alt: 'Library Books Collection'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1329571/pexels-photo-1329571.jpeg?_gl=1*t9476t*_ga*MTMyOTE3MDQ0NS4xNzUyMTY0MTk3*_ga_8JE65Q40S6*czE3NTIxNjQxOTYkbzEkZzEkdDE3NTIxNjQzMDgkajMyJGwwJGgw',
      alt: 'Modern Reading Area'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/6334916/pexels-photo-6334916.jpeg?_gl=1*111s35e*_ga*MTMyOTE3MDQ0NS4xNzUyMTY0MTk3*_ga_8JE65Q40S6*czE3NTIxNjQxOTYkbzEkZzEkdDE3NTIxNjQzNjUkajM2JGwwJGgw',
      alt: 'Quiet Study Space'
    }

  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };


  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Welcome to
                <span className="text-blue-600 block">Modern Library</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Discover thousands of books, journals, and digital resources in our comprehensive library management system. Experience seamless browsing, easy borrowing, and efficient book management all in one place.
              </p>
            </div>

  

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            <Link to={'/allBooks'}>
            Browse Books
            </Link>
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition-colors duration-200">
           <Link to={'/allBooks'}>
           Learn More
           </Link>
              </button>
            </div>
          </div>

          {/* Right Side - Image Slider */}
          <div className="relative">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              {/* Slider Images */}
              <div className="relative h-full">
                {sliderImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'bg-white w-6' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-200 rounded-full opacity-50 blur-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;