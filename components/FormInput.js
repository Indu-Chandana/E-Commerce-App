import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

const FormInput = ({
    containerStyle,
    inputContainerStyle,
    placeholder,
    inputStyle,
    value = "",
    prependComponent,
    appendComponent,
    onChange,
    onPress,
    editable,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    maxLength,
    placeholderTextColor = COLORS.dark60
}) => {
    return (
        <View style={{ ...containerStyle }}>
            <View
                style={{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    backgroundColor: COLORS.lightGrey,
                    ...inputContainerStyle
                }}
            >
                {prependComponent}

                <TextInput
                    style={{
                        flex: 1,
                        paddingVertical: 0,
                        ...FONTS.body3,
                        ...inputStyle,
                        // backgroundColor: 'blue'
                    }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoComplete={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChange={(text) => onChange(text)}
                    onPressIn={onPress}
                    editable={editable}
                />

                {appendComponent}
            </View>
        </View>
    )
}

export default FormInput