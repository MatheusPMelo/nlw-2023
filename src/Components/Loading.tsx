import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Loading: React.FC = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#09090A' }}
        >
            <ActivityIndicator
                color="#7C3AED"
                size={50}
            />
        </View>
    );
}

export default Loading;