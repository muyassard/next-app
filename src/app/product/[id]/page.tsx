import CustomImage from '@/components/image';
import { ProductType } from '@/interface';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: ProductType = await res.json();

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <CustomImage product={product} />
        <picture></picture>
        <div className="divide-2">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 text-xl md:text-3xl font-bold">${product.price}</h2>
          </div>
          <div className="">{product.description}</div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductPage;
