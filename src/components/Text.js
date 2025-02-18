import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ 
  children, 
  style, 
  variant = 'body',
  ...props 
}) => {
  return (
    <RNText 
      style={[styles[variant], style]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  body: {
    fontSize: 16,
    color: '#000000',
  },
  caption: {
    fontSize: 14,
    color: '#666666',
  },
});

export default Text; 