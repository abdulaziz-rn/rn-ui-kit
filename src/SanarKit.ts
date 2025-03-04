import io from 'socket.io-client';
import DeviceInfo from 'react-native-device-info';
import { getInfo } from './utils';

export type ConnectResponse = {
    message: string,
    status: boolean
}
export interface SanarKitInterface {
    connect( cid: string, info: any, lang?: string ): Promise<ConnectResponse>,
    disconnect(): void,
    connected: boolean,
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
}
  
class SanarKit implements SanarKitInterface {

    public eventListner: any;
    public session: any;
    public info: UserInfo | null = null;
    public connected: boolean = false;
    private _isChatEnabled: boolean = false;

    public get isChatEnabled(): boolean {
        return this._isChatEnabled;
    }

    setIsChatEnabled(value: boolean) {
        this._isChatEnabled = value;
    }

    async connect(cid: string, info: any, lang?: string) {
        try {
            let did = await DeviceInfo.getUniqueId();
            const { status, data, message, error_message } = await getInfo(cid, info, lang || 'en');
            if (status == 1000) {
                this.eventListner = io(data.messagingUrl, { query: `uid=${data.uid}&did=${did}` as any });
                this.session = data;
                this.info = info;
                this.connected = true;
                console.log('Connected successfully : ', this.connected);
                return { message: message, status: true };
            } else {
                this.connected = false;
                console.log('Connected failed : ', this.connected);
                return { message: error_message, status: false };
            };
        } catch (error) {
            this.connected = false;
            console.log('Connected failed : ', this.connected);
            throw error;
        }
    };

    disconnect() {
        if (this.eventListner) {
            this.eventListner.disconnect();
            console.log("Disconnected with Sanar");
        }
        this.session = null;
        this.info = null;
        this.connected = false;
    };
};

export default new SanarKit();