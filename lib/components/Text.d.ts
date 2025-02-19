import React from 'react';
import { TextProps, StyleProp, TextStyle } from 'react-native';
type TextVariant = 'heading' | 'subheading' | 'body' | 'caption';
export interface CustomTextProps extends TextProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
    variant?: TextVariant;
}
declare const Text: React.FC<CustomTextProps>;
export default Text;
