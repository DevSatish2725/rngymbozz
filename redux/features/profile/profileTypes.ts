
export type profileDetails = Record<string, string>;
export type error = string;
export interface screenState {
    loading: boolean;
    error: string;
    details: profileDetails
}