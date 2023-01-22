import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo.svg'

export function Header() {
    const { navigate } = useNavigation()
    return (
        <View className='w-full flex-row items-center justify-between'>
            <Logo />
            <TouchableOpacity
                onPress={() => navigate('new')}
                activeOpacity={0.7}
                className='border border-violet-500 rounded-lg h-11 px-4 items-center flex-row'>
                <Feather
                    name='plus'
                    color={colors.violet[500]}
                    size={20}
                />
                <Text className='text-white ml-3 font-semibold text-base'>
                    Novo
                </Text>
            </TouchableOpacity>
        </View>
    )
}