"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/swiper.css';
//import 'swiper/core/pagination.css';

const testimonials = [
  {
    name: 'Pallabi Das',
    description: 'Salaried Professional, Mumbai',
    text: 'CoverMantra truly understands its customers. The loan process was smooth, and the executive followed up diligently at every step. I received the amount in my bank within 24 hours!',
    rating: 5,
  },
  {
    name: 'Shubham Sharma',
    description: 'Freelance Designer, Delhi',
    text: 'Very professional and reliable. The support team guided me with every detail and resolved all my queries. The experience felt personal and supportive. Great service!',
    rating: 5,
  },
  {
    name: 'Divya Kapoor',
    description: 'Graduate Student, Bangalore',
    text: 'The app is amazing for checking your credit score and history online. Though I haven’t applied for a loan yet, the transparency and UI give me the confidence to go ahead soon.',
    rating: 4,
  },
  {
    name: 'Rakesh Mehta',
    description: 'Small Business Owner, Pune',
    text: 'The loan options were flexible and clearly explained. CoverMantra made the entire process hassle-free, with minimal documentation. Definitely recommending to my friends.',
    rating: 4.8,
  },
  {
    name: 'Sneha Verma',
    description: 'IT Professional, Hyderabad',
    text: 'Excellent experience. From eligibility check to disbursal, everything was done online and quickly. Loved the transparency and efficiency of the app.',
    rating: 3,
  },
  {
    name: 'Amit Raj',
    description: 'Entrepreneur, Kolkata',
    text: 'CoverMantra helped me get a business loan quickly. The process was simple, and the team was very supportive throughout.',
    rating: 4.9,
  },
  {
    name: 'Neha Singh',
    description: 'Software Engineer, Chennai',
    text: 'The platform is intuitive and fast. CoverMantra’s guidance made my loan application stress-free. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Vikram Joshi',
    description: 'Consultant, Jaipur',
    text: 'Great service and very transparent. CoverMantra provided all the information I needed upfront and made the loan process very easy.',
    rating: 4.2,
  },
  {
    name: 'Priya Nair',
    description: 'Teacher, Kochi',
    text: 'CoverMantra made financial management easy for me. The team answered all my questions and helped me choose the right loan option.',
    rating: 4.8,
  },
  {
    name: 'Karan Mehra',
    description: 'Marketing Professional, Gurgaon',
    text: 'Fast, efficient, and reliable. CoverMantra’s app and customer service exceeded my expectations.',
    rating: 5,
  },
  {
    name: 'Ritu Sharma',
    description: 'Doctor, Lucknow',
    text: 'CoverMantra made applying for a personal loan quick and hassle-free. Very impressed with the professionalism.',
    rating: 4.9,
  },
  {
    name: 'Ankit Verma',
    description: 'Freelancer, Ahmedabad',
    text: 'Smooth process and excellent support. CoverMantra explained everything clearly and guided me throughout the application.',
    rating: 4.8,
  },
  {
    name: 'Simran Kaur',
    description: 'MBA Student, Chandigarh',
    text: 'The app is simple to use and very reliable. CoverMantra gave me confidence to apply for my first loan without stress.',
    rating: 4.7,
  },
  {
    name: 'Rajesh Khanna',
    description: 'Retail Business Owner, Indore',
    text: 'CoverMantra’s flexible loan options helped my business grow. The team was supportive and responsive at every step.',
    rating: 4.9,
  },
  {
    name: 'Tanya Gupta',
    description: 'Bank Employee, Bhopal',
    text: 'Excellent experience with CoverMantra. Quick responses, clear communication, and seamless loan disbursal. Highly recommended!',
    rating: 5,
  },
];

export default function TestimonialSlider() {
  return (
    <section className="bg-[#FAF8F5] py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-[#FF7819]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-[#FF690B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFF3EB] rounded-md mb-2 border border-[#FF7819]/30 shadow-2xs">
            <div className="w-1.5 h-1.5 bg-[#FF7819] rounded-full" />
            <span className="uppercase tracking-wider text-[10px] font-bold text-[#FF7819]">
              Verified Borrower Testimonials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight mb-2 leading-tight">
            Customer Trust & <span className="text-[#FF7819]">Borrower Feedback</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Real feedback from verified individuals and businesses across India who secured funding through CoverMantra.
          </p>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-slate-300",
            bulletActiveClass: "!bg-[#FF7819] !w-6 !h-1.5 !rounded-full transition-all duration-300"
          }}
          autoplay={{ 
            delay: 4500, 
            disableOnInteraction: false 
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E5E2DA] shadow-xs 
                            hover:border-[#002140]/40 transition-all duration-200 min-h-64 flex flex-col relative h-full">
                
                {/* Quote Icon */}
                <div className="text-4xl font-serif text-slate-200 absolute top-3 right-5 select-none font-bold">“</div>

                {/* Testimonial Text */}
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed grow mb-5 font-normal">
                  {testimonial.text}
                </p>

                {/* User Info */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#FFF3EB] border border-[#FF7819]/25 text-[#FF7819] 
                                rounded-lg flex items-center justify-center shrink-0 font-bold text-sm">
                    <span>
                      {testimonial.name[0]}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-bold text-[#002140] text-xs sm:text-sm leading-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                      {testimonial.description}
                    </p>
                    
                    {/* Rating Stars in Brand Orange */}
                    <div className="flex mt-1 gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < Math.floor(testimonial.rating) 
                            ? "text-[#FF7819]" 
                            : "text-slate-200"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}