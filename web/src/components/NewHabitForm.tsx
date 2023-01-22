import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, KeyReturn } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../services/api";

const weekDaysCheck = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabado'
]

export function NewHabitForm() {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if (!title || weekDays.length === 0)
            return

        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado')
    }

    function handleToggleWeekDay(weeDay: number) {
        if (weekDays.includes(weeDay)) {
            const weekDaysWithRemoved = weekDays.filter(day => day !== weeDay)

            setWeekDays(weekDaysWithRemoved)
        }
        else {
            const weekDaysWithAddedOne = [...weekDays, weeDay]

            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form
            onSubmit={createNewHabit}
            className="w-full flex flex-col mt-6"
        >
            <label
                className="font-semibold leading-tight"
                htmlFor="title"
            >
                Qual seu compromentimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Exercício, dormir bem, etc..."
                autoFocus
                value={title}
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-300"
                onChange={event => setTitle(event.target.value)}
            />
            <label
                className="font-semibold leading-tight mt-4"
                htmlFor=""
            >
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {weekDaysCheck.map((day, index) => (
                    <Checkbox.Root
                        key={day}
                        className='flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800 rounded-lg transition-all duration-300'
                        onCheckedChange={() => handleToggleWeekDay(index)}
                        checked={weekDays.includes(index)}
                    >
                        <div
                            className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 transition-colors duration-200 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 '
                        >
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>
                        <span
                            className='font-semibold text-lg text-white leading-tight'
                        >
                            {day}
                        </span>
                    </Checkbox.Root>
                ))}
            </div>

            <button
                className="flex items-center justify-center w-full rounded-lg bg-green-600 font-semibold gap-3 mt-6 p-4 hover:bg-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800"
                type="submit"
            >
                <Check
                    size={20}
                />
                Confirmar
            </button>
        </form>
    )
}