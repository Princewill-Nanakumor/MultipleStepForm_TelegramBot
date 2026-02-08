import { NextResponse } from "next/server";
import {
  sendSurveyNotification,
  getTelegramConfig,
} from "@/lib/telegram";

type SurveyPayload = {
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

export async function POST(request: Request) {
  const config = getTelegramConfig();

  if (!config.enabled) {
    return NextResponse.json(
      { success: true, message: "Survey recorded (Telegram disabled)" },
      { status: 200 }
    );
  }

  let payload: SurveyPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { surveyData, contactData } = payload;
  if (!surveyData || !contactData) {
    return NextResponse.json(
      { success: false, error: "Missing surveyData or contactData" },
      { status: 400 }
    );
  }

  const result = await sendSurveyNotification(payload, config);

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: result.error ?? "Failed to send to Telegram" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
