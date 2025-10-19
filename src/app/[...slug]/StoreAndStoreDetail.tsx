'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import StoreComponet from '../store/StoreComponet';
import { decodeString } from '../utils/enocodeAndDecode';
import StoresDetailDemoRouteTest from '../stores/storesDetail';

function StoreAndStoreDetail() {
  const pathname = usePathname();

  // Get the last path segment
  const lastSegmentEncoded = React.useMemo(
    () => pathname.split('/').filter(Boolean).pop() || '',
    [pathname]
  );

  // Decode once
  const lastSegment = React.useMemo(
    () => decodeString(lastSegmentEncoded),
    [lastSegmentEncoded]
  );

  // Check if it's only a number
  const isNumberOnly = /^\d+$/.test(lastSegment);

  return (
    <>
      {isNumberOnly ? <StoresDetailDemoRouteTest /> : <StoreComponet />}
    </>
  );
}

export default StoreAndStoreDetail;
