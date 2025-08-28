import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';   
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Import the individual feature components
import StudyTimer from '@/components/StudyTimer';
import StudyResources from '@/components/StudyResource';
import StudyTips from '@/components/StudyTips';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#00494c', dark: '#00494c' }}
      headerImage={
        <View style={styles.headerImageContainer}>
          <FontAwesome 
            name="graduation-cap" 
            size={120} 
            color="#7dd3fc" 
            style={styles.headerImage}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Learning Hub</ThemedText>
        <FontAwesome name="lightbulb-o" size={24} color="#7dd3fc" />
      </ThemedView>
      
      <ThemedText style={styles.subtitle}>
        Essential tools to enhance your academic journey.
      </ThemedText>

      <Collapsible title="Study Timer">
        <ThemedText>
          Stay focused with the Pomodoro technique - 25 minutes of focused study followed by short breaks.
        </ThemedText>
        
        {/* Use the imported StudyTimer component */}
        <StudyTimer />
        
        <ExternalLink href="https://pomofocus.io/">
          <ThemedText type="link">Try online timer</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Study Resources">
        <ThemedText>
          Access free educational content and tools to support your learning.
        </ThemedText>
        
        {/* Use the imported StudyResources component */}
        <StudyResources />
        
        <ExternalLink href="https://www.khanacademy.org/">
          <ThemedText type="link">Free online courses</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Study Tips">
        <ThemedText>
          Proven techniques to improve your study habits and academic performance.
        </ThemedText>
        
        {/* Use the imported StudyTips component */}
        <StudyTips />
        
        <ExternalLink href="https://www.coursera.org/articles/study-techniques">
          <ThemedText type="link">More study techniques</ThemedText>
        </ExternalLink>
      </Collapsible>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Ready to improve your study habits?
        </ThemedText>
        <TouchableOpacity style={styles.ctaButton}>
          <ThemedText style={styles.ctaButtonText}>Start Learning</ThemedText>
          <FontAwesome name="arrow-right" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    position: 'absolute',
    bottom: -60,
    left: -40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#bae6fd',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  // Footer Styles
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0891b2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});