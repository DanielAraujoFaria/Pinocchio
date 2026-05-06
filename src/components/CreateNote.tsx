import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type CreateNoteProps = {
    title: string
    setTitle: (value: string) => void
    content: string
    setContent: (value: string) => void
    createNote: () => void
}

export function CreateNote({
    title,
    setTitle,
    content,
    setContent,
    createNote
}: CreateNoteProps) {

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button size="icon" className="rounded-2xl h-12 w-12 text-xl bg-neutral-300 text-black font-extrabold"><Plus /></Button>
            </DialogTrigger>

            <DialogContent>

                <h2 className="text-lg font-bold mb-4">Create Note</h2>

                <input
                    className="border p-2 rounded mb-3 w-full"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Button variant="outline" onClick={createNote}>
                    Create Note
                </Button>

            </DialogContent>

        </Dialog>
    )
}