"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@hugeicons/core-free-icons"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

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
      <div className="p-4 border rounded-md bg-white space-y-3 max-w-md">
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          variant="outline"
          size="lg"
          onClick={createNote}
        >
          Create Note
        </Button>
      </div>

      {/* LOADING */}
      {loadingNotes ? (
        <p>Loading notes...</p>
      ) : (
        /* NOTES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {notes.map((note) => (
            <Card
              key={note.id}
              className="bg-blue-100 p-5 rounded-md"
            >

              {editingNoteId === note.id ? (
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
                    onClick={() => setEditingNoteId(null)}
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
                      variant="outline"
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

            </Card>
          ))}

        </div>
      )}
    </div>
  )
}