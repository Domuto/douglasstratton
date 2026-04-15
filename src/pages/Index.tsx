import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import PrintsSection from "@/components/PrintsSection";
import VideoSection from "@/components/VideoSection";
import FooterSection from "@/components/FooterSection";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <PrintsSection />
      <VideoSection />
      <FooterSection />
      <ChatWidget />
    </div>
  );
};

export default Index;
