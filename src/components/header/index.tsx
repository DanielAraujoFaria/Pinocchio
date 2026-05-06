import { Clock } from "../clock"

export function Header(){
    return(
        <header className="bg-neutral-300 p-5 rounded-md mx-3 mb-2">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-black">
                    Pinocchio Notes
                </h1>

                <Clock/>
            </div>
        </header>
    )
}