import { useParams } from 'react-router-dom';

const SocietyOrAg = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{id?.replace(/-/g, ' ').toUpperCase()}</h1>
      <p>This page is generated based on the URL parameter.</p>
    </div>
  );
};

export default SocietyOrAg;
