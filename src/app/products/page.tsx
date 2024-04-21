import Feature from '@/components/feature';
import Product from '@/components/products';
import { ProductType } from '@/interface';
import React from 'react';

const ProductsPage = async () => {
  const data = await fetch('https://fakestoreapi.com/products');
  const products: ProductType[] = await data.json();
    
  return (
    <div className="px-[135px]">
      <Feature />
      <div className=""></div>
      <section className="flex flex-col space-y-12 ">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(prod => (
            <Product key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
