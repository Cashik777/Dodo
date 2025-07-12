import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Casino } from '@/types';
import { useAnalytics } from '@/utils/analytics';

// Динамическая загрузка тяжёлых компонентов
const CasinoCard = dynamic(() => import('@/components/CasinoCard'));
const HeroSection = dynamic(() => import('@/components/Hero'));

interface HomeProps {
  casinos: Casino[];
}

const Home: NextPage<HomeProps> = ({ casinos }) => {
  useAnalytics(); // Инициализация аналитики

  return (
    <main className="app-container">
      <HeroSection />
      
      <section className="casino-grid">
        {casinos.map(casino => (
          <CasinoCard 
            key={casino.id}
            data={casino}
            onSelect={() => trackEvent('Casino Click', casino.name)}
          />
        ))}
      </section>
    </main>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/casinos`);
  const casinos = await res.json();

  return {
    props: { casinos },
    revalidate: 3600 // ISR: обновление каждый час
  };
}

export default Home;
