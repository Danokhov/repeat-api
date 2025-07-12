export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { action, id, lesson } = req.body;

  if (!action || !id || !lesson) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbya9Uxtz5IkICs5IxDRO5jHUYSj_IW-aa4vgbvhAG1RJ-dquH6V2M2QrYlTuNKrfprI/exec";

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=${action}&id=${encodeURIComponent(id)}&lesson=${encodeURIComponent(lesson)}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
