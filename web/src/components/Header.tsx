import { Plus, X } from 'phosphor-react'
import logoImage from '../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
import { NewHabitForm } from './NewHabitForm';

export function Header() {

    return (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
            <img src={logoImage} alt="Habits" />

            <Dialog.Root>
                <Dialog.Trigger
                    type='button'
                    className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-all duration-200 hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-background'
                >
                    <Plus className='text-violet-500' size={20} />
                    Novo Hábito
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay
                        className='w-screen h-screen bg-black/80 backdrop-blur-sm fixed inset-0'
                    />
                    <Dialog.Content
                        className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    >
                        <Dialog.DialogClose
                        className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 font-bold focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 rounded-lg'
                        >
                            <X
                                size={24}
                                aria-label='Fechar'
                            />
                        </Dialog.DialogClose>
                        <Dialog.Title
                            className='text-3xl leading-tight font-extrabold'
                        >
                            Criar hábito
                        </Dialog.Title>

                        <NewHabitForm />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </div>
    )
}