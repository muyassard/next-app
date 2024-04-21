'use client';

import { ProductType } from '@/interface';
import Link from 'next/link';
import { FC } from 'react';
import CustomImage from './image';

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="border bg-white p-6 flex flex-col rounded-lg h-96 group hover:scale-105 transition-transform ease-in-out duration-200">
      <div className="relative max-h-72 flex-1">
        <CustomImage product={product} fill />
      </div>
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mt-10">{product.category}</h3>
      <div className=" font-semibold flex items-center justify-between mt-4 mb-1">
        <h4 className=" w-44 truncate">{product.title}</h4>
        <p className="">${product.price}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-2">{product.description}</p>
    </Link>
  );
};

export default Product;
