export type ConnectResponse = {
    message: string;
    status: boolean;
};
export interface SanarKitInterface {
    connect(cid: string, info: any, lang?: string): Promise<ConnectResponse>;
    disconnect(): void;
    connected: boolean;
}
declare class SanarKit implements SanarKitInterface {
    eventListner: any;
    session: any;
    info: any;
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
