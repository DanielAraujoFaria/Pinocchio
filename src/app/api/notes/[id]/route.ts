import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await prisma.note.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Deleted" })

  } catch (error) {
    console.error("DELETE ERROR:", error)

    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content
      }
    })

    return NextResponse.json(updatedNote)

  } catch (error) {
    console.error("PUT ERROR:", error)

    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    )
  }
}