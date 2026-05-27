"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "./ui/dialog"

type Note = {
  id: string
  title: string
  content: string
}

type NoteCardProps = {
  note: Note
  editingNoteId: string | null
  editedTitle: string
  editedContent: string
  setEditedTitle: (value: string) => void
  setEditedContent: (value: string) => void
  startEditing: (note: Note) => void
  updateNote: (id: string) => void
  deleteNote: (id: string) => void
  cancelEdit: () => void
  loading: boolean
}

export function NoteCard({
  note,
  editingNoteId,
  editedTitle,
  editedContent,
  setEditedTitle,
  setEditedContent,
  startEditing,
  updateNote,
  deleteNote,
  cancelEdit,
  loading
}: NoteCardProps) {

  const isEditing = editingNoteId === note.id

  return (
    <Dialog>
      

      {/* CARD */}
      <DialogTrigger asChild>
        <Card className="bg-gray-200 p-4 rounded-md aspect-square cursor-pointer hover:bg-gray-300 transition">

          <div className="bg-neutral-400 h-4 w-4 rounded-full mb-2"></div>

          <h2 className="font-semibold text-lg">
            {note.title}
          </h2>

          <p className="mb-3 line-clamp-4">
            {note.content}
          </p>

        </Card>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="max-w-xl">

        <DialogTitle>
          {note.title}
        </DialogTitle>

        {isEditing ? (
          <>
            <input
              className="border p-2 w-full mb-2 rounded"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <textarea
              className="border p-2 w-full mb-4 rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />

            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => updateNote(note.id)}
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {loading ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="destructive"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 whitespace-pre-wrap">
              {note.content}
            </p>

            <div className="flex gap-2 mt-6">

              <Button
                variant="secondary"
                onClick={() => startEditing(note)}
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm("Delete this note?")) {
                    deleteNote(note.id)
                  }
                }}
              >
                Delete
              </Button>

            </div>
          </>
        )}

      </DialogContent>

    </Dialog>
  )
}