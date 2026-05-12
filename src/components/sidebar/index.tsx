import { Search } from "lucide-react";

export function Sidebar(){
    return(
        <div className="flex flex-col w-64 p-5 bg-neutral-300 text-white">
            <div className="flex mb-4 gap-2">
                <a>
                    <img src="https://i.pravatar.cc/60" alt="profile pic" className="rounded-xl"/>
                </a>
                
                <h1 className="mb-6 font-semibold text-black">Username</h1>
            </div>

            <a className="flex p-4 bg-neutral-400 rounded-xl">
                <Search className="h-4 w-4" />
            </a>

            <nav className="flex flex-col gap-3 mt-5 p-4 bg-neutral-400 rounded-xl">
                <a className="p-2 rounded-xl hover:bg-neutral-500">
                    Placeholder
                </a>

                <a className="p-2 rounded-xl hover:bg-neutral-500">
                    Placeholder
                </a>

                <a className="p-2 rounded-xl hover:bg-neutral-500">
                    Placeholder
                </a>
            </nav>
        </div>
    )
}