import { useMemo } from 'react';
import type { PriceCalculation } from '../types';

interface PricingProps {
  basePrice: number;
  nights: number;
  cleaningFee: number;
  serviceFeePercentage: number;
  taxPercentage: number;
  discountPercentage: number;
}

export const usePricing = (props: PricingProps | null): PriceCalculation => {
  return useMemo(() => {
    if (!props) {
      return { subtotal: 0, discount: 0, serviceFee: 0, cleaningFee: 0, taxes: 0, total: 0 };
    }

    const { basePrice, nights, cleaningFee, serviceFeePercentage, taxPercentage, discountPercentage } = props;
    const subtotal = basePrice * nights;
    const discount = subtotal * (discountPercentage / 100);
    const subtotalAfterDiscount = subtotal - discount;
    const serviceFee = subtotalAfterDiscount * (serviceFeePercentage / 100);
    const taxes = (subtotalAfterDiscount + serviceFee + cleaningFee) * (taxPercentage / 100);
    const total = subtotalAfterDiscount + serviceFee + cleaningFee + taxes;

    return { subtotal, discount, serviceFee, cleaningFee, taxes, total };
  }, [props]);
};