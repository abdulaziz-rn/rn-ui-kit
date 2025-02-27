import { ViewStyle } from 'react-native';
import React from "react";
interface IContainer {
    children: React.ReactNode;
    style?: ViewStyle;
}
declare const Container: (props: IContainer) => React.JSX.Element;
export default Container;
