import { useState, useCallback, useContext, useEffect } from "react";
import { fetchCouponByCode } from "@/services/couponService";
import type { Coupon, CouponResult } from "@/types/coupon";
import { formatPrice } from "@/utils/formatPrice";
import { CartContext } from "@/context/CartContext";

export const useCoupon = (subtotal: number) => {
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [result, setResult] = useState<CouponResult | null>(null);
    const [loading, setLoading] = useState(false);
    const cart = useContext(CartContext);

    if (!cart) return null;
    const { storedCoupon, storeCoupon } = cart;

    const applyCoupon = useCallback(
        async (code: string) => {
            // console.log("code stored", code);
            
            if (!code.trim()) {
                setCoupon(null);
                setResult({
                    isValid: false,
                    discountedTotal: subtotal,
                    discountAmount: 0,
                    error: "Please enter a coupon code",
                });
                return;
            }

            setLoading(true);

            try {
                const fetchedCoupon = await fetchCouponByCode(code);

                if (!fetchedCoupon) {
                    setCoupon(null);
                    setResult({
                        code,
                        isValid: false,
                        discountedTotal: subtotal,
                        discountAmount: 0,
                        error: "Invalid coupon code",
                    });
                    return;
                }

                if (!fetchedCoupon.isActive) {
                    setResult({
                        code,
                        isValid: false,
                        discountedTotal: subtotal,
                        discountAmount: 0,
                        error: "This coupon is no longer active",
                    });
                    return;
                }

                const isExpired =
                    new Date(fetchedCoupon.expiresAt).getTime() < Date.now();

                if (isExpired) {
                    setResult({
                        code,
                        isValid: false,
                        discountedTotal: subtotal,
                        discountAmount: 0,
                        error: "This coupon has expired",
                    });
                    return;
                }

                let discount = 0;

                if (fetchedCoupon.type === "percentage") {
                    discount = (subtotal * fetchedCoupon.amount) / 100;
                }

                if (fetchedCoupon.type === "fixed") {
                    discount = fetchedCoupon.amount;
                }

                const discountedTotal = Math.max(subtotal - discount, 0);

                setCoupon(fetchedCoupon);
                storeCoupon(fetchedCoupon.code);
                setResult({
                    code: fetchedCoupon.code,
                    isValid: true,
                    discountedTotal,
                    discountAmount: discount,
                    message: "Coupon applied successfully! " +
                        (fetchedCoupon.type === "percentage"
                            ? `You saved ${fetchedCoupon.amount}%`
                            : `You saved ${formatPrice(discount)}`),
                });
            } catch {
                setResult({
                    isValid: false,
                    discountedTotal: subtotal,
                    discountAmount: 0,
                    error: "Something went wrong. Try again.",
                });
            } finally {
                setLoading(false);
            }
        },
        [subtotal, storedCoupon, storeCoupon]
    );

    useEffect(() => {
        if (storedCoupon) {
            applyCoupon(storedCoupon);
        }
    }, [storedCoupon, applyCoupon]);

    const clearCoupon = useCallback(() => {
        setCoupon(null);
        setResult(null);
        storeCoupon(null);
    }, [storeCoupon]);

    return {
        code: coupon?.code,
        coupon,
        result,
        loading,
        applyCoupon,
        clearCoupon,
    };
};