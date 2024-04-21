'use client';

import CustomImage from '@/components/image';
import { ProductType } from '@/interface';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

const ShoppingCard = () => {
  const [products, setProducts] = useState<ProductType[]>(typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('cards') as string) || [] : []);
  const [subtotal, setSubtotal] = useState(0);

  const removeProduct = (id: number) => {
    const updatedCard = products.filter(product => product.id !== id);
    localStorage.setItem('cards', JSON.stringify(updatedCard));
    setProducts(updatedCard);
  };

  const handleIncrement = (id: number) => {
    const updatedCard = products.map(product => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    localStorage.setItem('cards', JSON.stringify(updatedCard));
    setProducts(updatedCard);
  };
  const handleDecrement = (id: number) => {
    const existProduct = products.find(product => product.id === id);
    if (existProduct?.quantity === 1) {
      removeProduct(existProduct.id);
    } else {
      const updatedCard = products.map(product => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      localStorage.setItem('cards', JSON.stringify(updatedCard));
      setProducts(updatedCard);
    }
  };

  useEffect(() => {
    const total = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setSubtotal(total);
  }, [products]);

  return (
    <>
      {products.length ? (
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products &&
                products.map(product => (
                  <div key={product.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <div className="relative w-[150px]">
                      <CustomImage product={product} />
                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
                        <p className="mt-1 text-xs text-gray-700 line-clamp-2">{product.description}</p>
                        <div className="flex items-center ml-2 mr-6">
                          <ReactStars value={product.rating.rate} edit={false} />
                          <p className="ps-5 text-blue-600 hover:underline cursor-pointer text-xs">see all {product.rating.count} reviews</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => handleDecrement(product.id)}
                          >
                            -
                          </span>
                          <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.quantity} min="1" readOnly />
                          <span
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => handleIncrement(product.id)}
                          >
                            +
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {(product.price * product.quantity).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => removeProduct(product.id)}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {subtotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {(10).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(subtotal + 10).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-white   dark:bg-gray-900 ">
          <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
            <div className=" ">
              <p className="mt-4 text-gray-500 dark:text-gray-400">You have no products yet</p>

              <div className="flex items-center mt-6 gap-x-3">
                <Link
                  href={'/products'}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <span>Go back</span>
                </Link>
              </div>
            </div>

            <img className="" src="https://merakiui.com/images/components/illustration.svg" alt="" />
          </div>
        </section>
      )}
    </>
  );
};

export default ShoppingCard;
