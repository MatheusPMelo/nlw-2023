import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

export function NoHabits() {
    const { navigate } = useNavigation()
    return (
        <Text className='text-zinc-400 text-sm active:text-violet-900'>
            Você ainda não está monitorando nenhum hábito, comece{' '}
            <Text
                className='text-violet-400 underline'
                onPress={() => navigate('new')}
            >
                cadastrando um
            </Text>
            .
        </Text>
    )
}