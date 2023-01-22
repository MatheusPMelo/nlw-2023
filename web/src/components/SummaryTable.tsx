import { useEffect, useState } from "react"
import { generateDatesFromYearBegining } from "../utils/generate-dates-from-year-begining"
import { HabitDay } from "./HabitDay"
import { HabitDayToFill } from "./HabitDayToFill"
import { api } from "../services/api"
import dayjs from "dayjs"

const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S'
]

const summaryDates = generateDatesFromYearBegining()

const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type ISummary = {
    id: string;
    date: string;
    completed: number;
    amount: number;
}[]

export function SummaryTable() {

    const [summary, setSummary] = useState<ISummary>([])

    useEffect(() => {
        api.get('/summary')
            .then(res => setSummary(res.data))
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((day, i) => (
                    <div
                        key={`${day}-${i}`}
                        className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map((date, i) => {

                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return (
                        <HabitDay
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount}
                            defaultCompleted={dayInSummary?.completed}
                        />
                    )
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                    <HabitDayToFill key={i} />
                ))}
            </div>
        </div>
    )
}