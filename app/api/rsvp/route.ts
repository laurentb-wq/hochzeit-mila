import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase nicht konfiguriert" }, { status: 503 });
  }

  const body = await req.json();
  const {
    attending,
    adult1_name,
    adult2_name,
    adult_remarks,
    children_count,
    children,
    kids_stay,
    kids_parents_leave,
    arrival,
    love_letter,
  } = body;

  if (!attending || !adult1_name) {
    return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });
  }

  const { error } = await supabase.from("rsvp").insert([{
    name: adult1_name,
    attending,
    adult2_name: adult2_name ?? null,
    adult_remarks: adult_remarks ?? null,
    children_count: children_count ?? 0,
    children: children ?? null,
    kids_stay: kids_stay ?? null,
    kids_parents_leave: kids_parents_leave ?? null,
    arrival: arrival ?? null,
    love_letter: love_letter ?? null,
  }]);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Datenbankfehler" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
