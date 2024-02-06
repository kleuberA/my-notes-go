import HeaderMenu from "@/components/menu/HeaderMenu";
import SideMenu from "@/components/menu/SideMenu";
import NotesContainer from "@/components/notes/NotesContainer";

export default function Notes() {
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
                        <NotesContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}