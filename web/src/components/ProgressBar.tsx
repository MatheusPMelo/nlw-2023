interface IProgressBar {
    progress: number
}

export function ProgressBar(props: IProgressBar) {
    const progressStyles = {
        width: `${props.progress}%`
    }
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div 
                role='progressbar'
                aria-label="progresso de hábitos completados nesse dia"
                aria-valuenow={props.progress}
                className="h-3 rounded-xl bg-violet-600 transition-all duration-500"
                style={progressStyles}
            />
        </div>
    )
}