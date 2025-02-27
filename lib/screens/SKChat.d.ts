import React from 'react';
interface ISanarChat {
    onEndFlow: () => void;
    enable: boolean;
    appointmentId: any;
    empId: any;
    navigationOption?: boolean;
}
declare const SKChat: (props: ISanarChat) => React.JSX.Element | null;
export default SKChat;
