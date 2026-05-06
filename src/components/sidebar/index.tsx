import { Search } from "lucide-react";

export function Sidebar(){
    return(
        <div className="flex flex-col w-64 p-5 bg-neutral-300 text-white">
            <h1 className="mb-6 text-xl font-bold text-black">Pinocchio</h1>

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