"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

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
    <Card className="bg-gray-200 p-4 rounded-md aspect-square">

      <div className="bg-neutral-400 h-4 w-4 rounded-full mb-2"></div>

      {isEditing ? (
        <>
          <input
            className="border p-2 w-full mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full mb-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />

          <Button
            className="mr-2"
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
        </>
      ) : (
        <>
          <h2 className="font-semibold text-lg">
            {note.title}
          </h2>

          <p className="mb-3">
            {note.content}
          </p>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => startEditing(note)}
            >
              Edit
            </Button>

            <Button
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

    </Card>
  )
}