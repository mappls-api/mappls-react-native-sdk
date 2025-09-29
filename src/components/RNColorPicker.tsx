
import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import colors from '../constants/colors';

interface RNColorPickerProps {
  visible: boolean;
  defaultColor?: string;
  onColorSelected: (color: string) => void;
  onRequestClose: () => void;
}

const RNColorPicker: React.FC<RNColorPickerProps> = ({
  visible,
  defaultColor = colors.backgroundSecondry,
  onColorSelected,
  onRequestClose,
}) => {
  const [color, setColor] = useState(defaultColor);

  // Reset color every time modal opens
  useEffect(() => {
    if (visible) {
      setColor(defaultColor);
    }
  }, [visible, defaultColor]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ width: 300, height: 300 }}>
            <ColorPicker
              color={color}
              onColorChange={setColor} // live preview
              thumbSize={30}
              sliderSize={30}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.backgroundPrimary,borderColor: colors.accentPrimary, }]}
              onPress={() => {
                onColorSelected(color); // pass selected color back
                onRequestClose(); // close modal
              }}
            >
              <Text style={[styles.buttonText,{color: colors.accentPrimary,}]}>OK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.backgroundPrimary,borderColor:colors.strokeBorder }]}
              onPress={onRequestClose} // just close without saving
            >
              <Text style={[styles.buttonText,{color: colors.textPrimary}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor:colors.strokeBorder,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 420,
    width: 350,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.backgroundPrimary,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
   
 
});

export default RNColorPicker;
