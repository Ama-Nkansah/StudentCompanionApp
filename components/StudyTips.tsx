import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

interface StudyTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'focus' | 'organization' | 'retention' | 'wellness';
}

const studyTips: StudyTip[] = [
  {
    id: '1',
    title: 'Create a Dedicated Study Space',
    description: 'Find a quiet, well-lit area free from distractions. Keep it organized and comfortable.',
    icon: 'home',
    category: 'organization'
  },
  {
    id: '2',
    title: 'Use Active Recall Techniques',
    description: 'Test yourself instead of just re-reading. Use flashcards, practice questions, or explain concepts to others.',
    icon: 'lightbulb-o',
    category: 'retention'
  },
  {
    id: '3',
    title: 'Take Regular Breaks',
    description: 'Follow the Pomodoro technique: 25 minutes of focused study, then 5-minute breaks.',
    icon: 'clock-o',
    category: 'focus'
  },
  {
    id: '4',
    title: 'Review Material Regularly',
    description: 'Spaced repetition helps information stick. Review notes within 24 hours, then weekly.',
    icon: 'refresh',
    category: 'retention'
  },
  {
    id: '5',
    title: 'Stay Hydrated and Rested',
    description: 'Your brain needs water and sleep to function optimally. Aim for 7-9 hours of sleep.',
    icon: 'heart',
    category: 'wellness'
  },
  {
    id: '6',
    title: 'Eliminate Distractions',
    description: 'Put your phone on silent, close unnecessary tabs, and use apps like Forest to stay focused.',
    icon: 'ban',
    category: 'focus'
  }
];

export default function StudyTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Tips', icon: 'list' },
    { id: 'focus', name: 'Focus', icon: 'crosshairs' },
    { id: 'organization', name: 'Organization', icon: 'folder' },
    { id: 'retention', name: 'Retention', icon: 'brain' },
    { id: 'wellness', name: 'Wellness', icon: 'heart' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? studyTips 
    : studyTips.filter(tip => tip.category === selectedCategory);

  const toggleTip = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <FontAwesome 
              name={category.icon as any} 
              size={16} 
              color={selectedCategory === category.id ? '#ffffff' : '#bae6fd'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tips List */}
      <ScrollView style={styles.tipsContainer} showsVerticalScrollIndicator={false}>
        {filteredTips.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={styles.tipItem}
            onPress={() => toggleTip(tip.id)}
            activeOpacity={0.8}
          >
            <View style={styles.tipHeader}>
              <FontAwesome name={tip.icon as any} size={20} color="#0891b2" />
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <FontAwesome 
                name={expandedTip === tip.id ? 'chevron-up' : 'chevron-down'} 
                size={16} 
                color="#bae6fd" 
              />
            </View>
            
            {expandedTip === tip.id && (
              <Text style={styles.tipDescription}>{tip.description}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryContainer: {
    paddingHorizontal: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  categoryText: {
    color: '#bae6fd',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  tipsContainer: {
    maxHeight: 300,
  },
  tipItem: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipTitle: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipDescription: {
    color: '#bae6fd',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
});