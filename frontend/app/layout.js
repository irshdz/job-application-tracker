import "./globals.css";

export const metadata = {
  title: "JobTracker",
  description: "Manage and track your job applications in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}