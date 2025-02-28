import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, I18nManager } from 'react-native';
import WebView from 'react-native-webview';
import Container from '../components/Container';
import SanarKit from '../SanarKit';
const { width, height } = Dimensions.get('window');
interface ISanarChat {
    onEndFlow: () => void,
    enable: boolean,
    appointmentId: any,
    empId: any,
    navigationOption?: boolean
}

const SKChat = (props: ISanarChat) => {
    const [baseUrl, setBaseUrl] = useState('');
    const { appointmentId, empId, enable, onEndFlow } = props;
    const language = I18nManager.isRTL ? 'ar' : 'en';

    useEffect(() => {
        if (enable) {
            if (SanarKit.session) {
                // let CHAT_URL = `${SanarKit.session.chatUrl}/${appointmentId}/${empId}?token=${SanarKit.session.token}&lang=${language}`;
                let CHAT_URL = `${'http://192.168.0.103:9003/chat'}/${appointmentId}/${empId}?token=${SanarKit.session.token}&lang=${language}`;
                if (!props.navigationOption) { CHAT_URL = `${CHAT_URL}&nav=0` }
                setBaseUrl(CHAT_URL);
            } else {
                console.warn('Not connected to Sanar Sarvices!');
                onEndFlow();
            }
        }
    }, [enable])

    const onMessage = (event: any) => {
        if ((!event.canGoBack && event.data && event.data.includes('home')) || (event.canGoBack && event.data && event.data.includes('home'))) {
            setBaseUrl('');
            onEndFlow();
        }
    }

    if (!enable || !baseUrl) {
        return (null);
    }
    return (
        <Container>
            <WebView
                source={{
                    uri: baseUrl,
                }}
                style={{ flex: 1 }}
                // incognito
                onMessage={(event) => onMessage(event.nativeEvent)}
                injectedJavaScript={`
                (function() {
                    function wrap(fn) {
                    return function wrapper() {
                        var res = fn.apply(this, arguments);
                        window.ReactNativeWebView.postMessage(window.location.href);
                        return res;
                    }
                    }
                    history.pushState = wrap(history.pushState);
                    history.replaceState = wrap(history.replaceState);
                    history.go = wrap(history.go);
                    window.addEventListener('popstate', function() {
                        window.ReactNativeWebView.postMessage('navigationStateChange');
                    });
                })();
                true;
            `} />
        </Container>
    );
}

export default SKChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        marginTop:25,
        marginBottom:30,
    }
});