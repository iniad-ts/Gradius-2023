import type { Item } from 'commonConstantsWithClient/item';
import type { UserId } from 'commonTypesWithClient/branded';
import { usePlayerControl } from 'src/pages/@hooks/usePlayerControl';
import styles from './itemButton.module.css';

const ItemButton = ({ items, userId }: { items: Item[] | undefined; userId: UserId }) => {
  const { handleUseItem } = usePlayerControl(userId);

  if (items === undefined) return;

  const handleClick = (items: Item[]) => {
    if (items.length === 0) return;
    handleUseItem(items);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {items.length > 1 && (
        <button className={styles.nextItem}>
          <div>{items.length > 1 ? items[1].id : ''}</div>
        </button>
      )}
      <button className={styles.item} onClick={() => handleClick(items)}>
        <div>{items.length > 0 ? items[0].id : ''}</div>
      </button>
    </div>
  );
};

export default ItemButton;
