"use client";

import React, { useState } from "react";
import { FaGooglePlay, FaApple, FaBolt, FaShieldAlt, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";

export default function DownloadAppSection() {
  const [loginOpen, setLoginOpen] = useState(false);

  // 🤖 Aapke Google Play Store App ka asli address (Link)
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.covermantra.loan";

  const features = [
    { icon: <FaBolt className="text-white" />, text: "Instant Approval" },
    { icon: <FaShieldAlt className="text-white" />, text: "100% Secure" },
    { icon: <FaMobileAlt className="text-white" />, text: "Paperless" },
    { icon: <FaCheckCircle className="text-white" />, text: "Easy EMI" },
  ];

  // 🎯 Button click handle karne wala function
  const handleDownloadClick = () => {
    const co_phone = Cookies.get("co_phone");
    const co_token = Cookies.get("co_token");

    // Agar uncle login nahi hain, toh login ka dabba (Modal) kholo
    if (!co_phone || !co_token) {
      setLoginOpen(true);
    } else {
      // Agar login hain, toh seedhe naye page par Play Store khol do
      window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
    }
  };

  // Jab user modal ke andar se successfully login kar lega, tab yeh chalega
  const handleLoginSuccess = async () => {
    setLoginOpen(false);
    // Login hote hi link apne aap open ho jayega
    window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-[#FFF4E5] py-20 px-4 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content (Text aur Faayde) */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#08101E] tracking-tight leading-tight">
                Get The <span className="text-[#FF690B]">CoverMantra</span> App
              </h2>
              <p className="mt-6 text-lg text-[#08101E]/80 max-w-lg">
                Download our app for instant loans, real-time tracking, secure payments, 
                and complete financial control — all in your pocket.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF690B] to-[#FF8C00] 
                                rounded-2xl flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <span className="font-semibold text-[#08101E] text-[15.5px]">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Google Play Button */}
              <button
                onClick={handleDownloadClick}
                suppressHydrationWarning={true}
                className="group flex items-center justify-center gap-4 bg-[#08101E] hover:bg-black 
                           text-white px-8 py-4 rounded-2xl font-semibold transition-all 
                           hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                <FaGooglePlay className="text-3xl group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="text-[10px] font-bold opacity-75 tracking-wider">DOWNLOAD APP NOW</div>
                  <div className="text-lg tracking-tight font-black">Google Play</div>
                </div>
              </button>

              {/* Apple App Store (Coming Soon) Button */}
              <button 
                suppressHydrationWarning={true}
                className="group flex items-center justify-center gap-4 bg-white border-2 border-gray-300 
                           hover:border-gray-400 text-gray-400 px-8 py-4 rounded-2xl font-semibold 
                           transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-not-allowed"
                disabled={true}
              >
                <FaApple className="text-3xl group-hover:scale-110 transition" />
                <div className="text-left">
                  <div className="text-xs opacity-75">COMING SOON</div>
                  <div className="text-lg tracking-tight">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - App Mockup Design */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-70 sm:max-w-80">
              {/* Glow Behind Mobile View */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#FF690B]/20 to-transparent 
                              rounded-[4rem] blur-3xl -z-10" />
              
              {/* Phone Frame */}
              <div className="relative bg-[#08101E] p-4 rounded-[3rem] shadow-2xl border-8 border-white">
                <div className="bg-black rounded-[2.2rem] overflow-hidden flex items-center justify-center max-w-[280px]">
                  <img
                    src="/App.jpg"
                    alt="CoverMantra App Screenshot"
                    className="w-full h-auto object-cover rounded-4xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floating Star Ratings Badge */}
              <div className="absolute -top-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-xl 
                              flex items-center gap-3 text-sm font-medium border border-white/70 select-none">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                4.8 • 50K+ Ratings
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Devotional Baseline */}
        {/* <div className="w-full flex justify-center items-center mt-16 select-none">
          <p className="text-xl md:text-2xl font-serif text-[#08101E] tracking-[0.3em] font-semibold opacity-90 text-center">
            🔱 सत्यम शिवम सुंदरam 🔱
          </p>
        </div> */}
      </div>

      {/* Login Modal Integration */}
      <LoginModal 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onSuccess={handleLoginSuccess}
        suppressGlobalModal={true}
      />
    </section>
  );
}
// "use client";

// import React, { useState } from "react";
// import { FaGooglePlay, FaApple, FaBolt, FaShieldAlt, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
// import LoginModal from "./LoginModal";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// export default function DownloadAppSection() {
//   const router = useRouter();
//   const [loginOpen, setLoginOpen] = useState(false);

//   const features = [
//     { icon: <FaBolt className="text-white" />, text: "Instant Approval" },
//     { icon: <FaShieldAlt className="text-white" />, text: "100% Secure" },
//     { icon: <FaMobileAlt className="text-white" />, text: "Paperless" },
//     { icon: <FaCheckCircle className="text-white" />, text: "Easy EMI" },
//   ];

//   const handleDownloadClick = () => {
//     const co_phone = Cookies.get("co_phone");
//     const co_token = Cookies.get("co_token");

//     if (!co_phone || !co_token) {
//       setLoginOpen(true);
//     } else {
//       window.open("https://play.google.com/store/apps/details?id=com.covermantra.loan", "_blank");
//     }
//   };

//   return (
//     <section className="bg-[#FFF4E5] py-20 px-4 md:px-10 overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
//           {/* Left Content */}
//           <div className="space-y-10">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-extrabold text-[#08101E] tracking-tight leading-tight">
//                 Get The <span className="text-[#FF690B]">CoverMantra</span> App
//               </h2>
//               <p className="mt-6 text-lg text-[#08101E]/80 max-w-lg">
//                 Download our app for instant loans, real-time tracking, secure payments, 
//                 and complete financial control — all in your pocket.
//               </p>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-2 gap-6">
//               {features.map((feature, index) => (
//                 <div 
//                   key={index} 
//                   className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
//                 >
//                   <div className="w-12 h-12 bg-linear-to-br from-[#FF690B] to-[#FF8C00] 
//                                 rounded-2xl flex items-center justify-center shrink-0">
//                     {feature.icon}
//                   </div>
//                   <span className="font-semibold text-[#08101E] text-[15.5px]">
//                     {feature.text}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Download Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 onClick={handleDownloadClick}
//                 suppressHydrationWarning={true}
//                 className="group flex items-center justify-center gap-4 bg-[#08101E] hover:bg-black 
//                          text-white px-8 py-4 rounded-2xl font-semibold transition-all 
//                          hover:shadow-xl hover:-translate-y-1 active:scale-95"
//               >
//                 <FaGooglePlay className="text-3xl group-hover:scale-110 transition" />
//                 <div className="text-left">
//                   <div className="text-xs opacity-75">GET IT ON</div>
//                   <div className="text-lg tracking-tight">Google Play</div>
//                 </div>
//               </button>

//               <button 
//                 suppressHydrationWarning={true}
//                 className="group flex items-center justify-center gap-4 bg-white border-2 border-gray-300 
//                          hover:border-gray-400 text-gray-900 px-8 py-4 rounded-2xl font-semibold 
//                          transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95"
//               >
//                 <FaApple className="text-3xl group-hover:scale-110 transition" />
//                 <div className="text-left">
//                   <div className="text-xs opacity-75">COMING SOON</div>
//                   <div className="text-lg tracking-tight">App Store</div>
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Right Side - App Mockup */}
//           <div className="relative flex justify-center lg:justify-end">
//             <div className="relative max-w-70 sm:max-w-80">
//               {/* Glow Effect */}
//               <div className="absolute -inset-8 bg-linear-to-br from-[#FF690B]/20 to-transparent 
//                             rounded-[4rem] blur-3xl -z-10" />
              
//               {/* Phone Frame */}
//               <div className="relative bg-[#08101E] p-4 rounded-[3rem] shadow-2xl border-8 border-white">
//                 <div className="bg-black rounded-[2.2rem] overflow-hidden">
//                   <img
//                     src="/App.jpg"
//                     alt="CoverMantra App Screenshot"
//                     className="w-full h-auto object-cover rounded-4xl"
//                   />
//                 </div>
//               </div>

//               {/* Floating Badge */}
//               <div className="absolute -top-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-xl 
//                             flex items-center gap-3 text-sm font-medium border border-white/70">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
//                 4.8 • 50K+ Ratings
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Satyam Shivam Sundaram */}
//         <div className="w-full flex justify-center items-center mt-16">
//           <p className="text-xl md:text-2xl font-serif text-[#08101E] tracking-[0.3em] font-semibold opacity-90">
//             🔱 सत्यम शिवम सुंदरम 🔱
//           </p>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
//     </section>
//   );
// }