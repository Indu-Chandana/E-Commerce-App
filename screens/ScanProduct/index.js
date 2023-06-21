import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { MotiView, useAnimationState } from 'moti'
import { Shadow } from 'react-native-shadow-2'
import Svg, { Defs, Rect, Mask } from 'react-native-svg'

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

    // Moti
    const loaderAnimationState = useAnimationState({
        start: {
            opacity: 1
        },
        stop: {
            opacity: 0
        }
    })

    const productAnimationState = useAnimationState({
        hide: {
            opacity: 0,
            translateY: -10
        },
        show: {
            opacity: 1,
            translateY: 10
        }
    })

    // Barcode
    const [Barcode, setBarcode] = React.useState('')
    const [isScanned, setIsScanned] = React.useState(false)

    React.useState(() => {
        // Animation
        loaderAnimationState.transitionTo('stop')
        productAnimationState.transitionTo('hide')

        // Permissions
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

    function CameraFrame() {
        return (
            <Svg height="100%" width="100%" >
                <Defs>
                    <Mask id='mask' x="0" y="0" height="100%" width="100%">
                        <Rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                        <Rect x="18%" y="30%" width="250" height="250" fill="black" />
                    </Mask>
                </Defs>
                <Rect
                    height="100%"
                    width="100%"
                    fill="rgba(0, 0, 0, 0.8)"
                    mask='url(#mask)'
                />

                {/* Frame Border */}
                <Rect
                    x="18%"
                    y="30%"
                    width="250"
                    height="250"
                    strokeWidth="5"
                    stroke="#fff"
                    fill="transparent"
                />
            </Svg>

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

                    {/* Loading / Searching View */}
                    <MotiView
                        state={loaderAnimationState}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.dark60
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h2,
                                color: COLORS.light
                            }}
                        >
                            Searching
                        </Text>
                    </MotiView>

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
                                onPress={() => {
                                    loaderAnimationState.transitionTo('start')

                                    setTimeout(() => {
                                        loaderAnimationState.transitionTo('stop')
                                        productAnimationState.transitionTo('show')
                                    }, 2000)
                                }}
                            />
                        </View>
                    }

                    {/* QR code */}
                    {selectedOption == constants.scan_product_option.qr &&
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}>
                            <CameraFrame />
                        </View>}

                    {/* Product */}
                    <MotiView
                        state={productAnimationState}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120,
                            paddingVertical: SIZES.radius,
                            alignItems: 'center',
                            zIndex: 1,
                        }}
                    >
                        <Shadow>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    width: SIZES.width - (SIZES.padding * 2),
                                    alignItems: 'center',
                                    paddingHorizontal: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.light

                                }}
                            >
                                {/* Image */}
                                <Image
                                    source={images.luggage_01}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30
                                    }}
                                />

                                {/* Product name & SKU */}
                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: SIZES.radius
                                    }}>
                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            color: COLORS.primary
                                        }}
                                    >Vali Sakos</Text>
                                    <Text
                                        style={{
                                            ...FONTS.body4
                                        }}
                                    >SKU: 12345678</Text>
                                </View>

                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        color: COLORS.primary
                                    }}
                                >
                                    $ 67.00
                                </Text>

                            </TouchableOpacity>
                        </Shadow>

                    </MotiView>
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
