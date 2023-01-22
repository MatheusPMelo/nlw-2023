import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import color from 'tailwindcss/colors'

interface ICheckbox extends TouchableOpacityProps {
    title: string
    checked?: boolean
}

export function Checkbox({ checked = false, title, ...rest }: ICheckbox) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row mb-2 items-center flex gap-3'
            {...rest}
        >
            {checked
                ?
                <Animated.View
                    className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'
                    entering={ZoomIn}
                    exiting={ZoomOut}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={color.white}
                    />
                </Animated.View>
                :
                <View className='h-8 w-8 bg-zinc-900 border border-zinc-800 rounded-lg items-center justify-center' />
            }
            <Text
                className='text-white font-semibold text-base ml-3'
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}