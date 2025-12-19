import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

/**
 * SearchBar Component - A customizable search input with icon button.
 * 
 * @param {string} placeholder - Optional placeholder text (default: "Heading somewhere?")
 */
const SearchBar = ({ placeholder = "Heading somewhere?" }) => {
    // State for search input value
    const [search, setSearch] = React.useState('');
 
    const updateSearch = (value) => {
        setSearch(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Search text input */}
            <TextInput 
                style={styles.input}
                value={search}
                onChangeText={updateSearch}
                placeholder={placeholder}
                autoCapitalize="words"
                autoCorrect={false}
            />

            {/* Search button with magnifying glass icon */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => updateSearch(search)} 
            >
                <Icon name="search" size={24} color="#000" />
            </TouchableOpacity> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: -1, 
        backgroundColor: '#FAF9F6', // Off-white background
        paddingHorizontal: 8,
        borderRadius: 30, 
        margin: 30,
        marginTop: -10, 
        borderWidth: 2,
        borderColor: '#808080', 
    },

    input: {
        fontSize: 16,
        padding: 8, 
    },

    button: {
        backgroundColor: '#00BCFF', // Bright blue background
        borderRadius: 6,
        padding: 3, 
        marginTop: 6,
        position: 'absolute',
        right: 10, 
        alignItems: 'flex-end'
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default SearchBar;