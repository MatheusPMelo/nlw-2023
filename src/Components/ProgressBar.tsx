import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated'

interface IProgressBar {
    progress?: number
}

export function ProgressBar({ progress = 0 }) {
    const sharedProgress = useSharedValue(progress)

    const style = useAnimatedStyle( () => {
        return {
            width: `${sharedProgress.value}%`
        }
    })

    useEffect(() => {
        sharedProgress.value = withTiming(progress)
    }, [progress])

    return (
        <View
            className='w-full bg-zinc-700 h-3 rounded-lg my-4'
        >
            <Animated.View
                className=' bg-violet-600 h-3 rounded-lg'
                style={style}
            />
        </View>
    )
}