import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native';
import React from "react";
const { width, height } = Dimensions.get('window');

interface IContainer {
    children: React.ReactNode,
    style?: ViewStyle
}

const Container = (props: IContainer) => {
    return (
        <View
            {...props}
            style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        height: height,
        width: width,
        paddingVertical: 60,
        zIndex: 2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

export default Container;