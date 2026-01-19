import { api } from "./api";
import type { Coupon } from "@/types/coupon";

export const fetchCouponByCode = async (
    code: string
): Promise<Coupon | null> => {
    try {
        const res = await api.get<Coupon[]>(
            `/coupons?code=${code.toUpperCase()}`
        );

        return res.data.length ? res.data[0] : null;
    } catch {
        return null;
    }
};