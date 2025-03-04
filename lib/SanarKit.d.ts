export type ConnectResponse = {
    message: string;
    status: boolean;
};
export interface SanarKitInterface {
    connect(cid: string, info: any, lang?: string): Promise<ConnectResponse>;
    disconnect(): void;
    connected: boolean;
}
export type UserInfo = {
    first_name: string;
    last_name: string;
    dob: string;
    gender: string;
    nationality: string;
    document_id: string;
    mid: string;
    document_type: number;
    phone_code: string;
    phone_no: string;
    maritalStatus: string;
};
declare class SanarKit implements SanarKitInterface {
    eventListner: any;
    session: any;
    info: UserInfo | null;
    connected: boolean;
    private _isChatEnabled;
    get isChatEnabled(): boolean;
    setIsChatEnabled(value: boolean): void;
    connect(cid: string, info: any, lang?: string): Promise<{
        message: any;
        status: boolean;
    }>;
    disconnect(): void;
}
declare const _default: SanarKit;
export default _default;
