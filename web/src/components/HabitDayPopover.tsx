import * as Checkbox from '@radix-ui/react-checkbox';

import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import dayjs from 'dayjs';


interface IHabitDayPopover {
    date: Date
    onCompletedChange: (completed: number) => void
}

interface IInfoHabits {
    possibleHabits: Array<{
        id: string
        title: string
        created_at: Date
    }>
    completedHabits: string[]
}

export function HabitDayPopover({ date, onCompletedChange }: IHabitDayPopover) {
    const [infoHabits, setInfoHabits] = useState<IInfoHabits>()

    useEffect(() => {
        api.get(`day`, {
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setInfoHabits(response.data);
        })
    }, [])

    const isDateInPast = dayjs(date)
        .endOf('day')
        .isBefore(new Date)


    async function handleToggleHabit(habitId: string) {

        await api.patch(`/habits/${habitId}/toggle`)

        const ishabitAlreadyCompleted = infoHabits!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if (ishabitAlreadyCompleted) {
            completedHabits = infoHabits!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...infoHabits!.completedHabits, habitId]
        }

        setInfoHabits({
            possibleHabits: infoHabits!.possibleHabits,
            completedHabits,
        })

        onCompletedChange(completedHabits.length)
    }

    return (
        <div className="mt-6 flex flex-col gap-3">

            {infoHabits?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        className='flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-background rounded-lg disabled:cursor-not-allowed'
                        checked={infoHabits.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                    >
                        <div
                            className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors duration-200'
                        >
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>
                        <span
                            className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:opacity-70'
                        >
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}



        </div>
    )
}