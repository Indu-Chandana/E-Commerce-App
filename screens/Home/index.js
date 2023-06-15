import React from 'react';
import {
    View
} from 'react-native'

import { TextButton } from "../../components"

const Home = () => {
    return (
        <View

            style={{
                flex: 1, alignItems: 'center',
                justifyContent: 'center'

            }}>
            <TextButton
                label="Scan"
            />

        </View>
    )
}

export default Home;