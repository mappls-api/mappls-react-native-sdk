import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import colors from '../constants/colors';

interface CheckBoxListProps {
  items: string[]; // List of string items
  selected?: string[]; // Default selected items
  onChange?: (selected: string[]) => void;
  title?: string;
}

const CheckBoxGroup: React.FC<CheckBoxListProps> = ({
  items,
  selected = [],
  onChange,
  title,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selected);

  const toggleItem = (item: string, isChecked: boolean) => {
    const updated = isChecked
      ? [...selectedItems, item]
      : selectedItems.filter(i => i !== item);

    setSelectedItems(updated);
    if (onChange) onChange(updated);
  };

  useEffect(() => {
    setSelectedItems(selected);
  }, [selected]);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {items.map((item, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <CheckBox
            value={selectedItems.includes(item)}
            onValueChange={(newValue) => toggleItem(item, newValue)}
            tintColors={{ true: colors.accentPrimary, false: '#666' }}
          />
          <Text style={styles.label}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: {   marginBottom: 10 ,color:colors.textPrimary},
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  label: {  marginLeft: 8,color: colors.textPrimary },
});

export default CheckBoxGroup;
