import HeaderMenu from "@/components/menu/HeaderMenu";
import SideMenu from "@/components/menu/SideMenu";
import NoteComponent from "@/components/note/Note";

export default function Note({ params }: { params: { id: string } }) {

    return (
        <div className="w-full h-screen">
            <div className="flex flex-row h-full">
                <div className="h-full">
                    <SideMenu />
                </div>
                <div className="flex flex-col flex-1 h-full w-full">
                    <div className="">
                        <HeaderMenu />
                    </div>
                    <div className="h-full">
                        <NoteComponent id={params.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
