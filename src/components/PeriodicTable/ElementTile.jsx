import styles from './styles.module.css';

export default function ElementTile({ 
  element, 
  onClick, 
  highlighted = false,
  small = false
}) {
  if (!element) return null;

  const getCategoryClass = () => {
    const categoryMap = {
      'diatomic nonmetal': 'nonmetal',
      'polyatomic nonmetal': 'nonmetal',
      'noble gas': 'nobleGas',
      'alkali metal': 'alkaliMetal',
      'alkaline earth metal': 'alkalineEarthMetal',
      'metalloid': 'metalloid',
      'post-transition metal': 'postTransitionMetal',
      'transition metal': 'transitionMetal',
      'lanthanide': 'lanthanide',
      'actinide': 'actinide'
    };
    return categoryMap[element.category] || 'unknown';
  };

  const handleClick = () => {
    onClick(element);
  };

  return (
    <div
      className={`
        ${styles.elementTile} 
        ${styles[getCategoryClass()]} 
        ${highlighted ? styles.highlighted : ''}
        ${small ? styles.smallTile : ''}
      `}
      onClick={handleClick}
    >
      <div className={styles.atomicNumber}>{element.number}</div>
      <div className={styles.symbol}>{element.symbol}</div>
      <div className={styles.name}>{small ? '' : element.name}</div>
      <div className={styles.atomicMass}>
        {small ? '' : element.atomic_mass.toFixed(2)}
      </div>
    </div>
  );
}