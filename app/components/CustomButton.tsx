import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

/**
 * CustomButton Component - A reusable button component with an icon and text.
 * 
 * @param {string} title - The text to display on the button
 * @param {function} onPress - Callback function when button is pressed
 */
type CustomButtonProps = {
    title: string; // Text displayed next to the icon
    onPress: () => void; // Action triggered on button press
}

export default function CustomButton({title, onPress}: CustomButtonProps) {
  return (
    <View>
      {/* Main button container with press handler */}
      <TouchableOpacity 
        onPress={onPress}
        style={styles.button}
      >
        {/* Bus image */}
        <View> 
          <Image 
            style={styles.smallLogo}
            source={require('@/assets/images/bus_drawing.png')}
          />
        </View>
        
        {/* Button text */}
        <View>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    margin: 10,
    flexDirection: 'row', // Horizontal layout for icon + text
    backgroundColor: '#FAFA73', // Yellow background
    width: 200, 
    height: 35,
  },

  buttonText: {
    marginLeft: 10, // Spacing between icon and text
  },

  smallLogo: {
    width: 50,
    height: 35,
  },
})