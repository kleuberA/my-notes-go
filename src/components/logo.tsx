export default function Logo() {
    return (
        <div>
            <h1 className="text-secondary-foreground font-semibold text-xl flex items-center flex-row group cursor-pointer gap-1">
                My Notes
                <span className="text-primary rotate-[20deg] font-bold text-3xl group-hover:bg-primary group-hover:text-secondary-foreground rounded-sm p-1 transition-all duration-300">
                    Go
                </span>
            </h1>
        </div>
    )
}