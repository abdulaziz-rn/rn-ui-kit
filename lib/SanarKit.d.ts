export type ConnectResponse = {
    message: string;
    status: boolean;
};
export interface SanarKitInterface {
    connect(cid: string, info: any, lang?: string): Promise<ConnectResponse>;
    disconnect(): void;
}
export declare function getInfo(cid: string, data: {} | undefined, lang: string): Promise<any>;
declare class SanarKit implements SanarKitInterface {
    eventListner: any;
    session: any;
    info: any;
    connect(cid: string, info: any, lang?: string): Promise<{
        message: any;
        status: boolean;
    }>;
    disconnect(): void;
}
declare const _default: SanarKit;
export default _default;
