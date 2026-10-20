import net from 'node:net'
import { spawn } from 'node:child_process'
import path from 'node:path'

const port = Number(process.env.PORT || 3000)

function assertPortAvailable() {
  return new Promise((resolve, reject) => {
    const tester = net.createServer()

    tester.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        reject(
          new Error(
            `Le port ${port} est deja utilise. Un serveur tourne probablement deja pour ce projet.`,
          ),
        )
        return
      }
      reject(error)
    })

    tester.once('listening', () => tester.close(resolve))
    // Next listens on the IPv6 wildcard (::), which also covers IPv4 on Windows.
    tester.listen(port)
  })
}

try {
  await assertPortAvailable()
} catch (error) {
  console.error(`\n${error.message}`)
  console.error('Arretez le serveur existant avec Ctrl+C avant de relancer npm run dev.\n')
  process.exit(1)
}

const nextBin = path.join('node_modules', 'next', 'dist', 'bin', 'next')
const child = spawn(process.execPath, [nextBin, 'dev', '--port', String(port)], {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal))
}

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 0)
})
