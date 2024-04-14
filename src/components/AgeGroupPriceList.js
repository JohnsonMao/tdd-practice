import List, { ListItem } from './base/List';
import AgeGroupSelect from './AgeGroupSelect';
import PriceInput from './PriceInput';
import Button from './base/Button';

export default function AgeGroupPriceList() {
  return (
    <>
      <List>
        <ListItem>
          <h2 className="font-bold font-lg">價格設定 - 1</h2>
          <div className="flex gap-4">
            <AgeGroupSelect className="flex-1" />
            <PriceInput name="price" className="flex-1" />
          </div>
        </ListItem>
      </List>
      <Button>＋新增價格設定</Button>
    </>
  );
}
