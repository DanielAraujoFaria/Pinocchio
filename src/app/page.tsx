"use client"

import { useState, useEffect } from "react"

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
    <div style={{ padding: 40 }}>
      <h1>Pinocchio Notes</h1>

      {loadingNotes ? (
        <p>Loading notes...</p>
      ) : (
        <>
          {/* CREATE NOTE */}
          <div style={{ marginBottom: 20 }}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <br />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <br />

            <button onClick={createNote}>
              Create Note
            </button>
          </div>

          {/* NOTES LIST */}
          {notes.map((note) => (
            <div
              key={note.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
              }}
            >

              {editingNoteId === note.id ? (
                <>
                  <input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />

                  <br />

                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />

                  <br />

                  <button onClick={() => updateNote(note.id)}>
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button onClick={() => setEditingNoteId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>

                  <button onClick={() => startEditing(note)}>
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("Delete this note?")) {
                        deleteNote(note.id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </> 
              )}

            </div>
          ))}
        </>
      )}

    </div>
  )
}