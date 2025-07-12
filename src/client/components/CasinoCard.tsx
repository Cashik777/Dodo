import { motion } from 'framer-motion';
import Image from 'next/image';
import { Casino } from '@/types';

interface CasinoCardProps {
  data: Casino;
  onSelect: () => void;
}

export const CasinoCard = ({ data, onSelect }: CasinoCardProps) => {
  return (
    <motion.div 
      className="casino-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="rating-badge">{data.rating}/10</div>
      
      <Image
        src={`/images/casinos/${data.logo}`}
        alt={data.name}
        width={180}
        height={90}
        quality={85}
        priority={false}
      />

      <div className="payment-methods">
        {data.paymentMethods.map(method => (
          <Image 
            key={method}
            src={`/images/payments/${method}.png`}
            alt={method}
            width={60}
            height={40}
          />
        ))}
      </div>

      <button 
        onClick={onSelect}
        aria-label={`Play at ${data.name}`}
        className="cta-button"
      >
        Play Now
      </button>
    </motion.div>
  );
};
