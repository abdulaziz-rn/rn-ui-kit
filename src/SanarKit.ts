import io from 'socket.io-client';
import DeviceInfo from 'react-native-device-info';

export type ConnectResponse = {
    message: string,
    status: boolean
}
export interface SanarKitInterface {
    connect( cid: string, info: any, lang?: string ): Promise<ConnectResponse>,
    disconnect(): void,
}

export async function getInfo(cid : string, data = {}, lang : string) {
    const BUNDLE_ID = await DeviceInfo.getBundleId()
    const response = await fetch(`https://api.litedev.com/v1/member`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cid,
        'sales-channel': 'ios',
        'bundle-id': "com.example.demo",
        'Accept-Language': lang || 'en'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  

class SanarKit implements SanarKitInterface {

    public eventListner: any;
    public session: any;
    public info: any;

    async connect(cid: string, info: any, lang?: string) {
        try {
            let did = await DeviceInfo.getUniqueId();
            const { status, data, message, error_message } = await getInfo(cid, info, lang || 'en');
            console.log('data : ',data);
            if (status == 1000) {
                this.eventListner = io(data.messagingUrl, { query: `uid=${data.uid}&did=${did}` as any });
                this.session = data;
                this.info = info;
                return { message: message, status: true };
            } else {
                return { message: error_message, status: false };
            };
        } catch (error) {
            throw error;
        }
    };

    disconnect() {
        if (this.eventListner) {
            this.eventListner.disconnect();
            console.log("Disconnected with Sanar");
        }
    };
};

export default new SanarKit();