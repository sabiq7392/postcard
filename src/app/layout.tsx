export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <aside>
          <nav className={css`border: 1px solid red;`}>
            <div style={{ transform: "rotate(90deg)", display: "block", width: "fit-content" }}>
              <Logo.PostCard />
            </div>
          </nav>
        </aside> */}
        {children}
      </body>
    </html>
  )
}
