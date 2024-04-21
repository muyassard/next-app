'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/products');
  }, []);

  return null;
};

export default Custom404;
