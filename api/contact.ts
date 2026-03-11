import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  // Validate fields
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const gmailUser = process.env.GMAIL_USER;
  let gmailPass = process.env.GMAIL_PASS;

  if (!gmailUser || !gmailPass) {
    return res.status(500).json({ error: "Server configuration error: Missing credentials" });
  }

  // Clean password
  gmailPass = gmailPass.replace(/\s/g, "");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const mailOptions = {
    from: gmailUser,
    to: "gargdia256@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}
