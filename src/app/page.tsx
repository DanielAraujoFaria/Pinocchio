"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CreateNote } from "@/components/CreateNote"
import { NoteCard } from "@/components/NoteCard"
import { useSearch } from "@/contexts/SearchContext"

type Note = {
  id: string
  title: string
  content: string
}

export default function Notes() {

  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedContent, setEditedContent] = useState("")

  const [loading, setLoading] = useState(false)
  const [loadingNotes, setLoadingNotes] = useState(true)

  const { search } = useSearch()
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )

  async function fetchNotes() {
    setLoadingNotes(true)

    const res = await fetch("/api/notes")
    const data = await res.json()

    setNotes(data)
    setLoadingNotes(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  async function createNote() {
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })

    setTitle("")
    setContent("")

    await fetchNotes()
    setLoading(false)
  }

  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    })

    await fetchNotes()
  }

  function startEditing(note: Note) {
    setEditingNoteId(note.id)
    setEditedTitle(note.title)
    setEditedContent(note.content)
  }

  async function updateNote(id: string) {
    setLoading(true)

    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editedTitle,
        content: editedContent
      })
    })

    setEditingNoteId(null)
    await fetchNotes()
    setLoading(false)
  }

  return (
    <div className="p-6 space-y-6">

      {/* CREATE NOTE */}
      <div className="flex justify-start">
        <CreateNote
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          createNote={createNote}
        />
      </div>

      {/* SIDE + NOTES */}
      <div className="flex gap-6">

        {/* NOTES AREA */}
        <div className="flex-1">

          {loadingNotes ? (
            <p>Loading notes...</p>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  editingNoteId={editingNoteId}
                  editedTitle={editedTitle}
                  editedContent={editedContent}
                  setEditedTitle={setEditedTitle}
                  setEditedContent={setEditedContent}
                  startEditing={startEditing}
                  updateNote={updateNote}
                  deleteNote={deleteNote}
                  cancelEdit={() => setEditingNoteId(null)}
                  loading={loading}
                />
              ))}

            </div>

          )}

        </div>

        {/* SIDE CONTENT */}
        <div className="bg-gray-200 w-96 h-63 rounded-md p-4">

        </div>
      </div>
    </div>
  )
}