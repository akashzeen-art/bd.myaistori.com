// Set VITE_OTP_SEND_URL and VITE_OTP_VERIFY_URL to use a real SMS/OTP backend.
// Both endpoints receive JSON via POST: send -> { mobile }, verify -> { mobile, otp }.
// The verify endpoint should respond with { verified: true | false }.
// Without them no SMS is sent and any complete OTP is accepted.
const SEND_URL = import.meta.env.VITE_OTP_SEND_URL;
const VERIFY_URL = import.meta.env.VITE_OTP_VERIFY_URL;

export const OTP_LENGTH = 6;
const isOtpApiConfigured = Boolean(SEND_URL && VERIFY_URL);

const postJson = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export async function sendOtp(mobile) {
  if (!isOtpApiConfigured) return;
  const res = await postJson(SEND_URL, { mobile });
  if (!res.ok) throw new Error(`OTP send failed: ${res.status}`);
}

export async function verifyOtp(mobile, otp) {
  if (!isOtpApiConfigured) return new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp);
  const res = await postJson(VERIFY_URL, { mobile, otp });
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  return data.verified === true;
}
