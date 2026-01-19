export type CouponType = "percentage" | "fixed";

export interface Coupon {
    id: string;
    code: string; // e.g. "SAVE10"
    type: CouponType;
    amount: number; // 10 (percent) or 500 (fixed)
    isActive: boolean;
    expiresAt: string; // ISO date string
}

export interface CouponResult {
    code?: string;
    isValid: boolean;
    discountedTotal: number;
    discountAmount: number;
    message?: string;
    error?: string;
}