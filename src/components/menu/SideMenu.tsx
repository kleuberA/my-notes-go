import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export default function SideMenu() {
    return (
        <section className="h-full w-64 border-r border-r-border flex items-center justify-center text-center">
            <div className="flex flex-col gap-3 p-2 text-center justify-center items-center">
                <ExclamationTriangleIcon className="text-yellow-500 w-32 h-32" />
                <h1 className="text-xl text-accent-foreground">The menu is under development</h1>
            </div>
        </section>
    )
}