'use client'

import { Search } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext"

export function Sidebar() {
    const { search, setSearch } = useSearch()

    return (

        <div className="flex flex-col w-64 p-5 bg-neutral-300 text-white">
            <div className="flex mb-4 gap-2">
                <a>
                    <img src="https://i.pravatar.cc/60" alt="profile pic" className="rounded-xl" />
                </a>

                <h1 className="mb-6 font-semibold text-black">Username</h1>
            </div>

            <div className="flex items-center gap-2 p-4 bg-neutral-400 rounded-xl">
                <Search className="h-4 w-4 white" />

                <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
                />
            </div>

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