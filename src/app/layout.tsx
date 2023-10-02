import './globals.css'
import type { Metadata } from 'next'
import React from "react";
import 'bootstrap/dist/css/bootstrap.css'

export const metadata: Metadata = {
  title: 'Old Man Yells At Tech',
  description: 'Blog where I complain about tech',
  viewport: "width=device-width, initial-scale=1"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>{children}</body>
    </html>
  )
}
