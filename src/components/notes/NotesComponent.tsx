"use client"
import isAuthenticated from "@/hooks/isAuthenticated";
import NotesContainer from "./NotesContainer";
import HeaderMenu from "../menu/HeaderMenu";
import SideMenu from "../menu/SideMenu";

export default function NotesComponent() {
    isAuthenticated();

    return (
        <div className="w-full h-screen">
            <div className="flex flex-row h-full">
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