import { Button } from "./ui/button";

export default function ContainerHome() {
    return (
        <section className="w-full h-[calc(100dvh_-_4rem)]">
            <div className="flex flex-col gap-10 items-center justify-center h-full">
                <h1 className="text-6xl font-bold text-secondary-foreground w-[60dvw] text-center">Welcome to your notes app, start saving your texts easily.</h1>
                <Button className="w-52 hover:text-primary hover:bg-secondary border border-transparent hover:border-primary">Start for free</Button>
            </div>
        </section>
    )
}