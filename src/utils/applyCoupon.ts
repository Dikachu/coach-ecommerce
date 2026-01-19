import type { Coupon, CouponResult } from "@/types/coupon";
import { fetchCouponByCode } from "@/services/couponService";
import { useEffect, useState } from "react";

export const applyCoupon = (
    subtotal: number,
    code: string
): CouponResult => {
    // const [promoCode, setPromoCode] = useState("");
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCouponByCode(code)
            .then((data) => {
                setCoupon(data);
            })
            .catch((error) => setError(error))
    }, [code]);

    if (!coupon) {
        return {
            isValid: false,
            discountedTotal: subtotal,
            discountAmount: 0,
            error: error || "Invalid coupon code",
        };
    }

    if (!coupon.isActive) {
        return {
            isValid: false,
            discountedTotal: subtotal,
            discountAmount: 0,
            error: "This coupon is no longer active",
        };
    }

    const isExpired = new Date(coupon.expiresAt).getTime() < Date.now();

    if (isExpired) {
        return {
            isValid: false,
            discountedTotal: subtotal,
            discountAmount: 0,
            error: "This coupon has expired",
        };
    }

    let discount = 0;

    if (coupon.type === "percentage") {
        discount = (subtotal * coupon.amount) / 100;
    }

    if (coupon.type === "fixed") {
        discount = coupon.amount;
    }

    // Never allow negative totals
    const discountedTotal = Math.max(subtotal - discount, 0);

    return {
        isValid: true,
        discountedTotal,
        discountAmount: discount,
        message: `Coupon applied successfully! ${coupon.type === "percentage" ? `You saved ${coupon.amount}%` : `You saved $${discount}`}`,
    };
};