import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'card' | 'section' | 'elevated';
  children: React.ReactNode;
}

export function ThemedView({ variant = 'default', children, style, ...props }: ThemedViewProps) {
  const getViewStyle = () => {
    switch (variant) {
      case 'card':
        return styles.card;
      case 'section':
        return styles.section;
      case 'elevated':
        return styles.elevated;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[getViewStyle(), style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  elevated: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});