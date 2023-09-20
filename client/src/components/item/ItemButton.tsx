import type { Item } from 'commonConstantsWithClient/item';
import styles from './itemButton.module.css';

//親からhandleItemButtonClickを受け取る
type ItemButtonProps = {
  handleUseItem: () => void;
  items: Item[];
};

const ItemButton = ({ handleUseItem, items }: ItemButtonProps) => {
  //TODO:
  return (
    <div className={styles.container}>
      <button className={styles.nextItem}>
        <div>{items.length > 1 ? items[1].id : ''}</div>
      </button>
      <button className={styles.item} onClick={() => handleUseItem()}>
        <div>{items.length > 0 ? items[0].id : ''}</div>
      </button>
    </div>
  );
};

export default ItemButton;
