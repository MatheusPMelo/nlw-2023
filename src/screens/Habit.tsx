import { Alert, ScrollView, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { BackButton } from '../Components/BackButton'
import { useRoute } from '@react-navigation/native'
import { ProgressBar } from '../Components/ProgressBar'
import { Checkbox } from '../Components/Checkbox'
import dayjs from 'dayjs'
import Loading from '../Components/Loading'
import { api } from '../lib/axios'
import { generateProgressPercentage } from '../utils/generate-progress-percentege'
import { NoHabits } from '../Components/NoHabits'
import clsx from 'clsx'

interface IHabit {
    date: string
}

interface IDayInfo {
    completedHabits: string[]
    possibleHabits: {
        id: string
        title: string
    }[]
}

export function Habit() {
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<IDayInfo | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const route = useRoute()

    const { date } = route.params as IHabit

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitsProgress = dayInfo?.possibleHabits.length
        ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length)
        : 0

    const isDatePast = parsedDate.endOf('day').isBefore(new Date())

    async function fetchHabits() {
        try {
            setLoading(true)

            const response = await api.get('day',
                {
                    params: {
                        date
                    }
                })

            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabits)

        } catch (error) {
            console.log(error)
            Alert.alert('Ops...', 'Houve um erro na aplicação')
        }
        finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {

            await api.patch(`/habits/${habitId}/toggle`)

            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }
        } catch (err) {
            console.log(err)
            Alert.alert('Opss','Não foi possível atualizar o status do hábito')
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (loading)
        return <Loading />

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <BackButton />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className='text-zinc-400 mt-4 text-base'>
                    {dayOfWeek}
                </Text>
                <Text className='text-white text-4xl font-extrabold mt-4'>
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={habitsProgress} />
                <View className={clsx('mt-6', {
                    ['opacity-50']: isDatePast
                })}>
                    {dayInfo?.possibleHabits ? dayInfo?.possibleHabits.map(habit =>
                    (
                        <Checkbox
                            key={habit.id}
                            title={habit!.title}
                            checked={completedHabits.includes(habit.id)}
                            disabled={isDatePast}
                            onPress={() => handleToggleHabit(habit.id)}
                        />
                    )) : (
                        <NoHabits />
                    )
                    }
                </View>
                {isDatePast && (
                    <Text className='text-white text-center mt-10'>
                        Você não pode editar hábitos de uma data passada
                    </Text>
                )}
            </ScrollView>
        </View>
    )
}