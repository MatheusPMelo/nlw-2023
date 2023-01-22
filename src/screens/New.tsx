import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BackButton } from '../Components/BackButton'
import { Checkbox } from '../Components/Checkbox'
import colors from 'tailwindcss/colors'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { api } from '../lib/axios'

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabado',
]

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('');

    function handleToggleWeekDay(weekDayIndex: number) {

        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handdleCreateNewHabit() {
        try {
            if(!title.trim || weekDays.length === 0){
                return Alert.alert('Novo Hábito', 'Informe seu novo hábito e a recorrência')
            }

            await api.post('/habits', {
                title,
                weekDays,
            })

            setTitle('')
            setWeekDays([])

            Alert.alert('Novo Hábito','Novo hábito criado com sucesso')
        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível criar um novo hábito!')
        }
    }
    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <BackButton />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className='text-white text-3xl font-extrabold mt-8 leading-tight'>
                    Criar hábito
                </Text>
                <Text className='text-white mt-6 font-semibold text-base'>
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className='text-white h-12 p-4 bg-zinc-900 rounded-lg mt-3 border-zinc-800 border focus:border-2 focus:border-green-600 transition-all duration-0.5'
                    placeholder='ex.: Exercícios, dormir bem, etc...'
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />
                <Text className='text-white mt-4 mb-3 font-semibold text-base'>
                    Qual a recorrência?
                </Text>
                {availableWeekDays.map((weekDay, index) => (

                    <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggleWeekDay(index)}
                    />
                ))}
                <TouchableOpacity
                    className='w-full mt-6 bg-green-600 flex justify-center items-center flex-row p-4 rounded-lg'
                    onPress={handdleCreateNewHabit}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />
                    <Text className='text-white  text-base font-semibold ml-3'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}