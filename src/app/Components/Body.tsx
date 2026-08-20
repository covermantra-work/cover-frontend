"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";

import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import LoanInfo from "./LoanInfo";
import TestimonialSlider from "./TestimonialSlider";
import TrustSection from "./Trust";
import WhyChooseUs from "./WhyChooseUs";
import Security from "./Security";
import DownloadSection from "./DownloadSection";

export default function Body() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  
  return (
    <>
      <HeroSection />
      <LoanInfo />
      <HowItWorks />
      <Security />
      <TrustSection />
      <WhyChooseUs />
      <TestimonialSlider />
      <DownloadSection />
    </>
  );
}
