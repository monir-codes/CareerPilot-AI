"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui' }}>
          <h1>Fatal Application Error</h1>
          <p>The application completely crashed. Please refresh.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px' }}>Reload Page</button>
        </div>
      </body>
    </html>
  );
}
