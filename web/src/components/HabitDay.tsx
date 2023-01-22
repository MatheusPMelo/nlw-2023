import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitDayPopover } from './HabitDayPopover';
import { ProgressBar } from './ProgressBar';
import { useState } from 'react';

interface IHabitDay {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: IHabitDay) {

    const [completed, setCompleted] = useState(defaultCompleted)

    const completedPercenteage = amount > 0 ? Math.round((completed / amount) * 100) : 0
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleCompletedChange(completed: number) {
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-background', {
                    'bg-zinc-900 border-zinc-800': completedPercenteage === 0,
                    'bg-violet-200 border-violet-100': completedPercenteage > 0 && completedPercenteage < 20,
                    'bg-violet-400 border-violet-300': completedPercenteage >= 20 && completedPercenteage < 40,
                    'bg-violet-500 border-violet-400': completedPercenteage >= 40 && completedPercenteage < 60,
                    'bg-violet-600 border-violet-500': completedPercenteage >= 60 && completedPercenteage < 80,
                    'bg-violet-700 border-violet-600': completedPercenteage >= 80
                })}
            />

            <Popover.Portal>
                <Popover.Content
                    className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'
                >
                    <span
                        className='text-zinc-400 font-semibold text-sm'
                    >
                        {dayOfWeek}
                    </span>
                    <span
                        className='font-extrabold text-3xl leading-tight mt-1'
                    >
                        {dayAndMonth}
                    </span>
                    <ProgressBar
                        progress={completedPercenteage}
                    />

                    <HabitDayPopover
                        date={date}
                        onCompletedChange={handleCompletedChange}
                    />

                    <Popover.Arrow
                        className='fill-zinc-900'
                        height={17}
                        width={28}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}