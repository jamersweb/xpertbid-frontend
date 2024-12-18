// pages/index.js
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import BrowseCategories from '@/components/BrowseCategories'
import TopBid from '@/components/TopBid'
import MarketplaceSection from '@/components/MarketplaceSection'
import StartSelling from '@/components/StartSelling'


export default function Home({ countries }) {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <BrowseCategories />
      <TopBid />
      <MarketplaceSection />
      <StartSelling />
      <Footer />
    </>
  )
}
