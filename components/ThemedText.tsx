import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'subtitle' | 'body' | 'caption' | 'link' | 'defaultSemiBold';
  children: React.ReactNode;
}

export function ThemedText({ type = 'body', children, style, ...props }: ThemedTextProps) {
  const getTextStyle = () => {
    switch (type) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      case 'link':
        return styles.link;
      case 'defaultSemiBold':
        return styles.defaultSemiBold;
      default:
        return styles.body;
    }
  };

  return (
    <Text style={[getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  subtitle: {
    color: '#bae6fd',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  caption: {
    color: '#bae6fd',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  link: {
    color: '#7dd3fc',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    lineHeight: 22,
  },
  defaultSemiBold: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
});