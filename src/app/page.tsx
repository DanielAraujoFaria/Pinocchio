"use client"

import { useEffect, useState } from "react"

type Note = {
  id: string
  title: string
  content: string
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  async function loadNotes() {
    const res = await fetch("/api/notes")
    const data = await res.json()
    setNotes(data)
  }

  useEffect(() => {
    loadNotes()
  }, [])

  async function createNote() {
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })

    await loadNotes()

    setTitle("")
    setContent("")
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Pinocchio</h1>

      {/* FORMULÁRIO */}
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
          Create note
        </button>
      </div>

      {/* LISTA DE NOTAS */}
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </main>
  )
}