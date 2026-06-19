'use client';

import { LoaderProvider, useLoader } from '@/context/LoaderContext';
import Loader from '@/components/Loader';

function GlobalLoader() {
  const { loading } = useLoader();
  return loading ? <Loader /> : null;
}

export function Providers({ children }) {
  return <LoaderProvider>
    <GlobalLoader />
    {children}
  </LoaderProvider>;
}