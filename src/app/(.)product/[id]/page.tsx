'use client';

import CustomImage from '@/components/image';
import { ProductType } from '@/interface';
import { Dialog } from '@headlessui/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';

const ProductDetailedPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);
  
  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setLoading(false);
    }
    getData();
  }, [id]);

  const handleClick = () => {
    const products: ProductType[] = JSON.parse(localStorage.getItem('cards') as string) || [];

    const isExistProduct = products.find(p => p.id === product?.id);

    if (isExistProduct) {
      const updateData = products.map(p => {
        if (p.id === product?.id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      localStorage.setItem('cards', JSON.stringify(updateData));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem('cards', JSON.stringify(data));
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={'mx-auto max-w-3xl rounded bg-white p-10'}>
            {loading ? (
              <div className="h-8 w-8  rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 ">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <>
                          <div className="flex items-center ml-2 mr-6">
                            <ReactStars value={product.rating.rate} edit={false} />
                            <p className="ps-5 text-blue-600 hover:underline cursor-pointer text-xs">see all {product.rating.count} reviews</p>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="line-clamp-5 text-sm">{product?.description}</p>
                    <div className="space-y-3 text-sm">
                      <button
                        onClick={() => handleClick()}
                        className="button bg-blue-600 w-full  text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                      >
                        Add to bag
                      </button>
                      <button
                        onClick={() => {
                          window.location.reload();
                        }}
                        className="button bg-blue-600 w-full  text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                      >
                        view full details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailedPage;
