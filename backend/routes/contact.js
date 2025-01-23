import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
   const { name, email, department, message } = req.body;

   if (!name || !email || !department || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
   }

   try {
      // Nodemailer Transport Configuration
      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.GMAIL_USER, // Your Gmail address
            pass: process.env.GMAIL_PASS, // App-specific password
         },
      });

      // Email Content
      const mailOptions = {
         from: email, // Sender's email
         to: process.env.GMAIL_USER, // Your Gmail (where to send the form details)
         subject: `New Contact Form Submission to ${department}`,
         html: `
         <h3>Contact Form Submission</h3>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Department:</strong> ${department}</p>
         <p><strong>Message:</strong><br>${message}</p>
       `,
      };

      // Send Email
      await transporter.sendMail(mailOptions);

      res.status(200).json({
         success: true,
         message: "Your message was sent successfully!",
      });
   } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
         success: false,
         message: "Internal server error. Could not send the email.",
      });
   }
});

export default router;
