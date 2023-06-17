import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

import {
    IconButton,
    TextButton
} from '../../components'

import {
    COLORS, SIZES, FONTS, icons, constants, images
} from "../../constants"

const ScanProduct = ({ navigation }) => {
    // State
    const [selectedOption, setSelectedOption] = React.useState(constants.scan_product_option.camera)

    // Camera
    const devices = useCameraDevices(); // get access to the device camera
    const device = devices.back; // get access to the back camera

    // Handler
    const requestCameraPermission = React.useCallback(async () => {
        const permission = await Camera.requestCameraPermission();

        if (permission === 'denied') await Linking.openSettings();
    }, []);

    React.useState(() => {
        requestCameraPermission();
    }, []);


    // Render
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: SIZES.radius,
                    paddingBottom: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    alignItems: 'center',
                    backgroundColor: COLORS.light,
                    zIndex: 1
                }}
            >
                {/* Close */}
                <IconButton
                    icon={icons.close}
                    onPress={() => navigation.goBack()}
                />

                {/* title */}
                <Text
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        color: 'black',
                        ...FONTS.h2
                    }}
                >
                    {selectedOption == constants.scan_product_option.camera ? "Scan Camera" : "Scan QR Code"}
                </Text>

                {/* Add. options */}
                <IconButton
                    icon={icons.flash}
                    iconStyle={{
                        width: 25,
                        height: 25
                    }}
                />

                <IconButton
                    icon={icons.question_mark}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                    iconStyle={{
                        width: 25,
                        height: 25
                    }}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 90,
                    paddingTop: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    backgroundColor: COLORS.light
                }}
            >

                <TextButton
                    label="Scan QR Code"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOption == constants.scan_product_option.qr ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOption == constants.scan_product_option.qr ? COLORS.secondary : COLORS.primary
                    }}

                    onPress={() => {
                        setSelectedOption(constants.scan_product_option.qr)
                    }}
                />

                <TextButton
                    label="Scan Camera"
                    contentContainerStyle={{
                        flex: 1,
                        height: 55,
                        marginLeft: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedOption == constants.scan_product_option.camera ? COLORS.primary : COLORS.lightGrey
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: selectedOption == constants.scan_product_option.camera ? COLORS.secondary : COLORS.primary
                    }}

                    onPress={() => {
                        setSelectedOption(constants.scan_product_option.camera)
                    }}
                />

            </View>
        )
    }

    function renderCamera() {
        if (device == null) {
            return (
                <View
                    style={{
                        flex: 1
                    }}
                >

                </View>
            )
        } else {
            return (
                <View style={{
                    flex: 1
                }}>
                    <Camera
                        style={{ flex: 1 }}
                        device={device}
                        isActive={true}
                        enableZoomGesture
                    />

                    {/* Scan Button */}
                    {selectedOption == constants.scan_product_option.camera &&
                        <View
                            style={{
                                position: 'absolute',
                                alignItems: 'center',
                                bottom: SIZES.padding,
                                left: 0,
                                right: 0,
                            }}
                        >
                            {/* <Text>Hellooooooooooooooooooooooooooooooooooooo</Text> */}
                            <IconButton
                                icon={icons.scan}
                                containerStyle={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.light
                                }}
                                iconStyle={{
                                    width: 50,
                                    height: 50,
                                    tintColor: COLORS.primary
                                }}
                            />
                        </View>
                    }
                </View>
            )
        }
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >

            {/* Header */}
            {renderHeader()}

            {/* Camera */}
            {renderCamera()}

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default ScanProduct
