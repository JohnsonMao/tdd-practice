import { FC } from 'react';
import { Button, Col, Row, Typography } from 'antd';

import type { AgeGroupPriceHeaderProps } from './AgeGroupPriceList.type';

const AgeGroupPriceItem: FC<AgeGroupPriceHeaderProps> = ({
  index,
  id,
  onRemove,
}) => {
  return (
    <Row align="middle">
      <Col flex="auto">
        <Typography.Title level={4}>價格設定 - {index + 1}</Typography.Title>
      </Col>
      {onRemove && (
        <Col>
          <Button type="text" danger onClick={() => onRemove(id)}>
            Ｘ 移除
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default AgeGroupPriceItem;
