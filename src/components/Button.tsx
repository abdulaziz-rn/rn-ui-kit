import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle, StyleProp } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  style?: Record<string, any>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  ...props 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress} 
      {...props}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button; 