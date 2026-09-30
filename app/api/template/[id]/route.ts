import { db } from "@/lib/db";
import { getTemplateFiles, SUPPORTED_TEMPLATES } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const param = await params;
  const id = param.id;

  if (!id) {
    return Response.json({ error: "Missing playground ID" }, { status: 400 });
  }

  const playground = await db.playground.findUnique({
    where: { id },
  });

  if (!playground) {
    return Response.json({ error: "Playground not found" }, { status: 404 });
  }

  const templateKey = playground.template as TemplateId;

  if (!SUPPORTED_TEMPLATES.includes(templateKey)) {
    return Response.json({ error: "Invalid template" }, { status: 404 });
  }

  try {
    const templateFiles = getTemplateFiles(templateKey);

    return Response.json({ success: true, templateJson: templateFiles }, { status: 200 });
  } catch (error) {
    console.error("Error generating template JSON:", error);
    return Response.json({ error: "Failed to generate template" }, { status: 500 });
  }
}

