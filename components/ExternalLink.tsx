import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  style?: any;
}

export function ExternalLink({ href, children, style }: ExternalLinkProps) {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(href);
      
      if (supported) {
        await Linking.openURL(href);
      } else {
        Alert.alert(
          'Cannot Open Link',
          `The link "${href}" cannot be opened.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error opening the link.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{children}</Text>
      <FontAwesome name="external-link" size={14} color="#7dd3fc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  text: {
    color: '#7dd3fc',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});