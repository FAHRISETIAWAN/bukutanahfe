import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';
import NumberFormat from './NumberFormat';

const InfoCard = ({ nilai, satuan, title, value, children: icon }) => {
  return (
    <Card className='rounded-[10px] dark:bg-white'>
      <CardBody className="flex items-center">
        {icon}
        <div>
          <p className="mb-1 text-xs font-medium text-gray-600">{title}</p>
          <p className="text-md font-semibold text-gray-900">
            {/* Menambahkan logika kondisional */}
            {nilai === 'NumberFormat' ? (
              <NumberFormat nilai={value} />
            ) : (
              // Jika nilai bukan 'NumberFormat', tampilkan nilai aslinya
              <span>{value}</span>
            )}
          &nbsp;{satuan}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
