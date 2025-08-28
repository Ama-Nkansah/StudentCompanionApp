import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

interface ResourceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  url: string;
  color: string;
}

const resources: ResourceItem[] = [
  {
    id: '1',
    title: 'Math Help',
    icon: 'calculator',
    description: 'Algebra, calculus, and more',
    url: 'https://www.khanacademy.org/math',
    color: '#0891b2'
  },
  {
    id: '2',
    title: 'Study Guides',
    icon: 'book',
    description: 'Comprehensive study materials',
    url: 'https://www.sparknotes.com/',
    color: '#7dd3fc'
  },
  {
    id: '3',
    title: 'Programming',
    icon: 'code',
    description: 'Learn to code step by step',
    url: 'https://www.freecodecamp.org/',
    color: '#bae6fd'
  },
  {
    id: '4',
    title: 'Language Learning',
    icon: 'language',
    description: 'Master new languages',
    url: 'https://www.duolingo.com/',
    color: '#0891b2'
  },
  {
    id: '5',
    title: 'Science Lab',
    icon: 'flask',
    description: 'Interactive science experiments',
    url: 'https://phet.colorado.edu/',
    color: '#7dd3fc'
  },
  {
    id: '6',
    title: 'Writing Center',
    icon: 'pencil',
    description: 'Improve your writing skills',
    url: 'https://owl.purdue.edu/owl/purdue_owl.html',
    color: '#bae6fd'
  }
];

export default function StudyResources() {
  const handleResourcePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {resources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceItem}
            onPress={() => handleResourcePress(resource.url)}
          >
            <View style={[styles.iconContainer, { backgroundColor: resource.color + '20' }]}>
              <FontAwesome name={resource.icon as any} size={24} color={resource.color} />
            </View>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap any resource to open in your browser
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  resourceItem: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  resourceTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  resourceDescription: {
    color: '#bae6fd',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#bae6fd',
    fontSize: 12,
    fontStyle: 'italic',
  },
});