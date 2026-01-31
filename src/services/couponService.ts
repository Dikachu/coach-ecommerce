import { couponsCol } from "@/firebase/lib/firestore";
import type { Coupon } from "@/types/coupon";
import { getDocs, query, where } from "firebase/firestore";

export const fetchCouponByCode = async (code: string): Promise<Coupon | null> => {
    const q = query(couponsCol, where("code", "==", code.toUpperCase()));
    const snapshot = await getDocs(q);
    return !snapshot.empty ? { ...snapshot.docs[0].data(), id: snapshot.docs[0].id } : null;
};














// import { api } from "./api";
// import type { Coupon } from "@/types/coupon";

// export const fetchCouponByCode = async (
//     code: string
// ): Promise<Coupon | null> => {
//     try {
//         const res = await api.get<Coupon[]>(
//             `/coupons?code=${code.toUpperCase()}`
//         );

//         return res.data.length ? res.data[0] : null;
//     } catch {
//         return null;
//     }
// };