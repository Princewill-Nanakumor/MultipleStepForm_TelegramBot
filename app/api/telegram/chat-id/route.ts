import { NextResponse } from "next/server";
import { getTelegramChatId } from "@/lib/telegram";

export async function GET() {
  const result = await getTelegramChatId();

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    chatId: result.chatId,
    message: "Add this to your .env: TELEGRAM_CHAT_ID=" + result.chatId,
  });
}
