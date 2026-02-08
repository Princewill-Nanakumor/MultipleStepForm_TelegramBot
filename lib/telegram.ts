const TELEGRAM_API = "https://api.telegram.org";

export type TelegramConfig = {
  botToken: string;
  chatId: string;
  enabled: boolean;
};

export type SendMessageOptions = {
  parse_mode?: "HTML" | "Markdown";
};

export type SendResult = { ok: boolean; error?: string };

/** Escape HTML to prevent injection in Telegram messages */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getTelegramConfig(): TelegramConfig {
  const botToken = process.env.TELEGRAM_BOT_TOKEN ?? "";
  const chatId = process.env.TELEGRAM_CHAT_ID ?? "";
  const enabled =
    process.env.TELEGRAM_ENABLED === "true" ||
    process.env.TELEGRAM_ENABLED === "1";

  return { botToken, chatId, enabled };
}

/** Check if Telegram is properly configured and enabled */
export function isTelegramEnabled(): boolean {
  const { botToken, chatId, enabled } = getTelegramConfig();
  return !!enabled && !!botToken && !!chatId;
}

export async function sendTelegramMessage(
  text: string,
  config?: TelegramConfig,
  options?: SendMessageOptions,
): Promise<SendResult> {
  const cfg = config ?? getTelegramConfig();
  const { botToken, chatId, enabled } = cfg;

  if (!enabled || !botToken || !chatId) {
    return { ok: false, error: "Telegram is not configured or disabled" };
  }

  const parseMode = options?.parse_mode ?? "HTML";

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      }),
    });

    const data = (await res.json()) as { ok: boolean; description?: string };

    if (!data.ok) {
      return {
        ok: false,
        error: data.description ?? "Unknown Telegram API error",
      };
    }
    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send Telegram message";
    return { ok: false, error: message };
  }
}

export type SurveyNotificationPayload = {
  surveyData: {
    district: string;
    hoursPerDay: string;
    situationChange: string;
    predictableSchedule: string;
    comments: string;
  };
  contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

/** Format and send the electricity survey notification */
export async function sendSurveyNotification(
  payload: SurveyNotificationPayload,
  config?: TelegramConfig,
): Promise<SendResult> {
  const { surveyData, contactData } = payload;

  const lines = [
    "🔌 <b>Kyiv Electricity Availability Survey</b>",
    "<b>Contact Information</b>",
    "<b>Name:</b> " +
      escapeHtml(
        [contactData.firstName, contactData.lastName]
          .filter(Boolean)
          .join(" ") || "—",
      ),
    "<b>Email:</b> " + escapeHtml(contactData.email || "—"),
    "<b>Phone:</b> " + escapeHtml(contactData.phone || "—"),

    "",
    "<b>District:</b> " + escapeHtml(surveyData.district),
    "<b>Hours per day:</b> " + escapeHtml(surveyData.hoursPerDay),
    "<b>Situation change:</b> " + escapeHtml(surveyData.situationChange || "—"),
    "<b>Timetable schedule:</b> " +
      escapeHtml(surveyData.predictableSchedule || "—"),
    surveyData.comments
      ? "<b>Comments:</b> " + escapeHtml(surveyData.comments)
      : "",
    "",
  ].filter(Boolean);

  const text = lines.join("\n");
  return sendTelegramMessage(text, config, { parse_mode: "HTML" });
}

export async function getTelegramChatId(): Promise<{
  ok: boolean;
  chatId?: string;
  error?: string;
}> {
  const { botToken, enabled } = getTelegramConfig();

  if (!enabled || !botToken) {
    return {
      ok: false,
      error: "TELEGRAM_BOT_TOKEN or TELEGRAM_ENABLED not set",
    };
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${botToken}/getUpdates`);
    const data = (await res.json()) as {
      ok: boolean;
      result?: Array<{
        message?: { chat?: { id: number; type: string; username?: string } };
      }>;
      description?: string;
    };

    if (!data.ok) {
      return {
        ok: false,
        error: data.description ?? "Failed to fetch updates",
      };
    }

    const updates = data.result ?? [];
    const lastWithChat = [...updates]
      .reverse()
      .find((u) => u.message?.chat?.id);

    if (!lastWithChat?.message?.chat?.id) {
      return {
        ok: false,
        error:
          "No messages found. Send a message to @kyiv_Electricity_Survay_bot first, then try again.",
      };
    }

    return { ok: true, chatId: String(lastWithChat.message.chat.id) };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch chat ID";
    return { ok: false, error: message };
  }
}
