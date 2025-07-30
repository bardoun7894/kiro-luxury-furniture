import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { ServicesOverview } from '@/components/home/services-overview';
import { CTASection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <ServicesOverview />
      <CTASection />
    </main>
  );
}
