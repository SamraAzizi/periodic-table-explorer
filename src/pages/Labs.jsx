import labBg from '../assets/images/backgrounds/lab-bg.jpg';

export default function Labs() {
  return (
    <div style={{ 
      background: `url(${labBg}) center/cover no-repeat`,
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <MolarMassCalculator />
      <ReactionSimulator />
      <Molecule3DViewer />
    </div>
  );
}