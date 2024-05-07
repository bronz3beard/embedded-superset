import axios from "axios";
import { NextRequest } from "next/server";
import { PASSWORD, SUPERSET_URL } from "@/app/constants";
import { singlePostRequest } from "@/utils/requestHelpers";
import {
  AxiosHeaders,
  RawAxiosResponseHeaders,
} from "@/utils/requestHelpers/request.types";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    const data = await createGuestToken(id);

    return Response.json(data);
  }
}

async function login() {
  const loginUrl = `${SUPERSET_URL}/api/v1/security/login`;

  const payload = {
    password: PASSWORD,
    provider: "db",
    refresh: true,
    username: "info2rory",
  };

  const response = await singlePostRequest<
    typeof payload,
    { access_token: string; refresh_token: string }
  >(loginUrl, payload);

  const tokens = {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
  };

  return tokens;
}

async function getCsrfToken(
  accessToken: string
): Promise<{ sessionCookie: string; csrfToken: string }> {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const response = await axios.get(
    `${SUPERSET_URL}/api/v1/security/csrf_token/`,
    {
      headers,
    }
  );

  const sessionCookie = await extractSessionCookie(response.headers);

  return {
    sessionCookie: sessionCookie,
    csrfToken: response.data.result,
  };
}

async function createGuestToken(id: string) {
  try {
    const { accessToken } = await login();
    const { sessionCookie, csrfToken } = await getCsrfToken(accessToken);

    const guestTokenEndpoint = `${SUPERSET_URL}/api/v1/security/guest_token/`;

    const payload = {
      user: {
        username: "public_guest",
        firstName: "public_guest",
        lastName: "public_guest",
      },
      resources: [
        {
          type: "dashboard",
          id,
        },
      ],
      rls: [],
    };

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Referer: `${SUPERSET_URL}/api/v1/security/csrf_token/`,
      "X-CSRFToken": csrfToken,
      Cookie: `session=${sessionCookie}`,
    };

    const response = await singlePostRequest<typeof payload, { token: string }>(
      guestTokenEndpoint,
      payload,
      { headers }
    );

    return response.token;
  } catch (error: any) {
    console.error("🚀 ~ createGuestToken ~ error:", error);
    throw new Error(error.response?.statusText);
  }
}

async function extractSessionCookie(
  headers: AxiosHeaders | Partial<RawAxiosResponseHeaders>
) {
  const setCookieHeader = headers["set-cookie"];

  if (setCookieHeader && setCookieHeader.length > 0) {
    const sessionCookieMatch = setCookieHeader[0].match(/session=([^;]+);/);
    if (sessionCookieMatch && sessionCookieMatch.length > 1) {
      return sessionCookieMatch[1];
    }
  }

  return null;
}
