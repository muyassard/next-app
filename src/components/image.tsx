"use client";

import { ProductType } from "@/interface";
import React, { FC, useState } from "react";
import Image from "next/image";

interface Props {
  product: ProductType;
  fill?: boolean;
}

const CustomImage: FC<Props> = ({ product, fill }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {fill ? (
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-contain duration-500 ease-in-out  ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-110 blur-0 grayscale-0"
          } `}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={900}
          className={`object-contain duration-500 ease-in-out  ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-110 blur-0 grayscale-0"
          } `}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </>
  );
};

export default CustomImage;
