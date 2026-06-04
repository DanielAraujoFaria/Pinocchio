"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "./ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Note = {
  id: string
  title: string
  content: string
  tags?: string[]
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
  loading,
}: NoteCardProps) {

  const isEditing = editingNoteId === note.id

  const [selectedTags, setSelectedTags] = useState<string[]>(
    note.tags ?? []
  )

  async function saveTags(tags: string[]) {
    await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        tags,
      }),
    })
  }

  async function addTag(tag: string) {
    if (selectedTags.includes(tag)) return

    const updatedTags = [...selectedTags, tag]

    setSelectedTags(updatedTags)

    await saveTags(updatedTags)
  }

  async function toggleTag(tag: string) {
    let updatedTags: string[]

    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter(
        (t) => t !== tag
      )
    } else {
      updatedTags = [...selectedTags, tag]
    }

    setSelectedTags(updatedTags)

    await saveTags(updatedTags)
  }

  return (
    <Dialog>

      {/* CARD */}
      <DialogTrigger asChild>
        <Card className="bg-gray-200 p-4 rounded-md aspect-square cursor-pointer hover:bg-gray-300 hover:-translate-y-2 hover:scale-105 ease-in-out transition">

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

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="px-2 py-1 rounded-full bg-neutral-300 text-xs hover:bg-neutral-400 transition"
                >
                  {tag} ✕
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-6">

              <Select
                onValueChange={toggleTag}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Study">Study</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Important">Important</SelectItem>
                </SelectContent>
              </Select>

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