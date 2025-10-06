import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import colors from '../constants/colors';

interface CheckBoxListProps<T> {
  items: T[];
  selected?: T[];
  onChange?: (selected: T[]) => void;
  title?: string;
  getLabel?: (item: T) => string; // optional, for custom label extraction
}

function CheckBoxGroup<T extends string | { toString(): string }>({
  items,
  selected = [],
  onChange,
  title,
  getLabel,
}: CheckBoxListProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>(selected);

  const toggleItem = (item: T, isChecked: boolean) => {
    const updated = isChecked
      ? [...selectedItems, item]
      : selectedItems.filter(i => i !== item);

    setSelectedItems(updated);
    onChange?.(updated);
  };

  useEffect(() => {
    setSelectedItems(selected);
  }, [selected]);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {items.map((item, index) => {
        const label = getLabel ? getLabel(item) : item.toString();
        return (
          <View key={index} style={styles.checkboxContainer}>
            <CheckBox
              value={selectedItems.includes(item)}
              onValueChange={val => toggleItem(item, val)}
              tintColors={{ true: colors.accentPrimary, false: '#666' }}
            />
            <Text style={styles.label}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: { marginBottom: 10, color: colors.textPrimary },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  label: { marginLeft: 8, color: colors.textPrimary },
});

export default CheckBoxGroup;
