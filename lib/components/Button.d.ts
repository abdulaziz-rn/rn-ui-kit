import React from 'react';
import { TouchableOpacityProps, TextStyle, StyleProp } from 'react-native';
export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    style?: Record<string, any>;
    textStyle?: StyleProp<TextStyle>;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
