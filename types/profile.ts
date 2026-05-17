export type MemberStatus = "Active" | "Expired" | "Expiring Soon" | "INACTIVE" | "PENDING";

export interface InitialState {
    loading: boolean;
    details: {
        ownerName: string;
        gymName: string;
        id: number;
        subscriptionPlan: string | null;
        subscriptionStatus: MemberStatus;
        address: string;
        phone: string;
        trialEndDate: string;
    };
    error: string;
}