// Set VITE_OTP_SEND_URL and VITE_OTP_VERIFY_URL to use a real SMS/OTP backend.
// Both endpoints receive JSON via POST: send -> { mobile }, verify -> { mobile, otp }.
// The verify endpoint should respond with { verified: true | false }.
// Without them the app runs in demo mode: the code is generated in the browser
// and shown on the OTP page, because no SMS is actually sent.
const SEND_URL = import.meta.env.VITE_OTP_SEND_URL;
const VERIFY_URL = import.meta.env.VITE_OTP_VERIFY_URL;
const DEMO_KEY = "demoOtp";

export const OTP_LENGTH = 6;
export const isDemoOtp = !SEND_URL || !VERIFY_URL;

const postJson = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const getDemoOtp = (mobile) => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(DEMO_KEY) || "null");
    return saved && saved.mobile === mobile ? saved.code : null;
  } catch {
    return null;
  }
};

export async function sendOtp(mobile) {
  if (isDemoOtp) {
    const code = String(Math.floor(10 ** (OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (OTP_LENGTH - 1)));
    sessionStorage.setItem(DEMO_KEY, JSON.stringify({ mobile, code }));
    return;
  }
  const res = await postJson(SEND_URL, { mobile });
  if (!res.ok) throw new Error(`OTP send failed: ${res.status}`);
}

export async function verifyOtp(mobile, otp) {
  if (isDemoOtp) {
    const ok = getDemoOtp(mobile) === otp;
    if (ok) sessionStorage.removeItem(DEMO_KEY);
    return ok;
  }
  const res = await postJson(VERIFY_URL, { mobile, otp });
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  return data.verified === true;
}
