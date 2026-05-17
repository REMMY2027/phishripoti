# 🔐 PhishRipoti

### A secure, anonymous phishing reporting and awareness web app built for Kenyan financial institutions.

🌐 **Live app:** [phishripoti.netlify.app](https://phishripoti.netlify.app)
<img width="1562" height="936" alt="Screenshot 2026-05-17 at 18 07 11" src="https://github.com/user-attachments/assets/967a7858-8074-4303-81cb-76c4a872c0ca" />


---

## The problem I was trying to solve

Employees in Kenyan banks and SACCOs are among the most targeted by phishing attacks, but most of them never report it. Not because they don't notice, but because they're afraid. Afraid of being blamed. Afraid of looking foolish. Afraid of getting a colleague in trouble.

On top of that, most organisations don't have an easy, accessible way for employees to report a suspicious email. So threats go unreported, and the same attacks keep working.

I built PhishRipoti to fix that.

---

## What PhishRipoti does

PhishRipoti gives employees a completely anonymous way to report suspicious emails — no login, no name, no identity collected at any point. The app uses GPT-4o to analyse the email content, scans any links using Google Safe Browsing, and gives the employee a clear risk result in plain English along with specific advice on what to do next.

There's also an Awareness Hub where employees can take AI-generated quizzes tailored to their department; using real Kenyan banking scenarios involving KCB, Equity Bank, M-Pesa, Safaricom, and the Central Bank of Kenya.

IT Managers get their own secure dashboard where they can see threat patterns across the organisation, without ever knowing who submitted what.

---

## Key features

- **Anonymous reporting** - no login, no registration, no personal data collected ever. Every report gets a random token like `RPT-XXXX-XXXX-XXXX`. That's it.
- **AI Quick Fill** - paste a suspicious email and GPT-4o automatically extracts all the details, analyses the content, and scans the links simultaneously
- **Risk scoring** - 70% content analysis + 30% link scan = a composite LOW / MEDIUM / HIGH risk result
- **What To Do Next** - after every result the employee gets specific, plain-English guidance on exactly what to do right now
- **Awareness Hub** - GPT-4o generates 5 department-specific quiz questions per session, with a pre and post assessment so you can actually measure what was learned
- **IT Manager Dashboard** - live risk charts, threat timeline, full report details, and awareness session statistics. Protected by two-step email OTP authentication.

---

## How it was evaluated

I ran a usability evaluation with 13 postgraduate cybersecurity students at Griffith College Limerick. Here's what they said:

| What we measured | Result |
|---|---|
| Found the app easy to use | 100% |
| Confident their identity was protected | 100% |
| Found the AI Quick Fill useful | 100% |
| Found the What To Do Next guidance useful | 100% |
| Would recommend PhishRipoti to colleagues | 84.6% said Yes, 0% said No |
| Overall satisfied with the app | 100% |

30 functional and security test cases. 100% pass rate.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| AI Engine | GPT-4o via OpenAI API |
| Link Scanning | Google Safe Browsing API |
| Email (OTP) | SendGrid |
| Hosting (Frontend) | Netlify |
| Hosting (Backend) | Render |
| Version Control | GitHub |
| Uptime Monitoring | UptimeRobot |

---

## A note on loading time

The backend runs on Render's free tier which spins down during inactivity. The first time you visit the app after a period of no traffic, it may take up to 30 seconds to wake up. After that it runs normally. Just give it a moment, it's worth it.

---

## Project context

This app was built as my MSc dissertation project at Griffith College, Limerick (MSc in Network and Information Security), supervised by Brendan Fogarty. The research behind it included a survey of 60 employees across Kenyan financial institutions and interviews with three IT security managers; all of which confirmed the gap this app is trying to close.

---

## Try it yourself

👉 [phishripoti.netlify.app](https://phishripoti.netlify.app)

Go to the landing page, click **Report a Phishing Email**, and paste any suspicious email you've received. See what the AI makes of it.

If you want to see the IT Manager dashboard, reach out and I'll share the credentials.

---

## Get in touch

Built by **Remmy Kirumira** - MSc Network and Information Security, Griffith College Limerick.

If you're working in IT, cybersecurity, fintech, or information security and want to talk, I'd love to connect.

🔗 [LinkedIn](https://www.linkedin.com/in/remmykirumira/) &nbsp;|&nbsp; 📧 kirumira.kunta@gmail.com
