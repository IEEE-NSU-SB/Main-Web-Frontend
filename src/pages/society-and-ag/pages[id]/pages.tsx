import Wave from '@/components/wave';
import { useParams } from 'react-router-dom';

const SocietyOrAg = () => {
  const { id } = useParams();

  return (
    <div>
      <Wave
        title="Welcome to IEEE NSU Student Branch"
        subtitle="Empowering innovation and technology leadership"
      />
      <h1>{id?.replace(/-/g, ' ').toUpperCase()}</h1>
      <p>This page is generated based on the URL parameter.</p>
    </div>
  );
};

export default SocietyOrAg;
