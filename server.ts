import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ override: true });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for Gmail Credentials
    const gmailUser = process.env.GMAIL_USER;
    let gmailPass = process.env.GMAIL_PASS;

    if (!gmailUser || !gmailPass) {
      console.error("GMAIL_USER or GMAIL_PASS not set");
      return res.status(500).json({ error: "Server configuration error. Please check environment variables." });
    }

    // Clean password (remove spaces if any)
    gmailPass = gmailPass.replace(/\s/g, "");

    console.log(`Attempting to send email from: ${gmailUser}`);
    console.log(`Password length: ${gmailPass.length}`);
    console.log(`Password starts with: ${gmailPass.substring(0, 2)}... and ends with: ...${gmailPass.substring(gmailPass.length - 2)}`);

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
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      
      if (error.code === 'EAUTH' || error.responseCode === 535) {
        return res.status(401).json({ 
          error: "Authentication failed. Please ensure you are using a Gmail App Password, not your regular password.",
          details: error.message
        });
      }
      
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
