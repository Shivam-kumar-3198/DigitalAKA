'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/Loader';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <Loader /> : null;
}
