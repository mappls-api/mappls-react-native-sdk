import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import colors from '../constants/colors';
import { DirectionsCriteria } from 'mappls-direction-widget-react-native';


type RadioDataItem<T> = {
  label: string;
  value: T;
};
// type Props = {
//   label: string;
//   data: RadioDataItem[];
//   index: number;
//   callback: (selected: RadioDataItem) => void;
// };
type RadioProps<T> = {
  label: string;
  data: RadioDataItem<T>[];
  index: number;
  callback: (selected: RadioDataItem<T>) => void;
};
const RadioGroups = <T,>({ label, data, index, callback }: RadioProps<T>) => {
  return (
    <View>
      {/* Title */}
      <Text style={styles.label}>{label}</Text>

      {/* Radio Buttons */}
      <View style={styles.radioWrapper}>
       <RadioButtonRN
          data={data}
          initial={index}
          selectedBtn={callback}
          box={false}
          textStyle={styles.radioText}
          circleSize={16}
          activeColor={colors.accentPrimary} // ✅ use constant
          deactiveColor={colors.textSecondary} // ✅ use constant
          animationTypes={['pulse']}
        />
      </View>
    </View>
  );
};

export default RadioGroups;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary, // ✅ use constant
    marginBottom: 10,
  },
  radioWrapper: {
    flexDirection: 'column',
    gap: 8,
  },
  radioText: {
    fontSize: 14,
    color: colors.textPrimary, // ✅ use constant
  },
});