import Header from "../components/Header";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import Collections from "../components/Collections";
import Workshop from "../components/Workshop";
import Journal from "../components/Journal";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <Header />
      <Hero />
      <Philosophy />
      <Collections />
      <Workshop />
      <Journal />
      <Footer />
    </div>
  );
}
