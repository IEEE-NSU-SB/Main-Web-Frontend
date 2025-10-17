import Wave from "@/components/wave";

interface PageData {
  pageTitle: string;
  pageSubtitle: string;
  primaryColor?: string;
}

interface ScAgWaveProps {
  pageData: PageData;
}

const ScAgWave: React.FC<ScAgWaveProps> = ({ pageData }) => {
  return (
    <Wave
      title={pageData.pageTitle}
      subtitle={pageData.pageSubtitle}
      color={pageData.primaryColor || "#000"}
    />
  );
};

export default ScAgWave;
