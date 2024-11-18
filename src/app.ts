// src/app.ts
import { join } from "path";

// Store WebSocket connections
const clients = new Set<WebSocket>();

const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        // Handle WebSocket connections for hot reload
        if (url.pathname === '/hot-reload') {
            const upgraded = server.upgrade(req);
            if (upgraded) {
                // Will handle the WebSocket connection in the websocket event
                return undefined;
            }
            return new Response('Upgrade failed', { status: 500 });
        }

        // Serve static files
        if (url.pathname.startsWith('/static/')) {
            const filePath = join(import.meta.dir, 'static', url.pathname.replace('/static/', ''));
            const file = Bun.file(filePath);
            const contentType = url.pathname.endsWith('.css')
                ? 'text/css'
                : url.pathname.endsWith('.js')
                    ? 'text/javascript'
                    : 'text/plain';

            return new Response(file, {
                headers: {
                    "Content-Type": contentType,
                },
            });
        }

        // Serve index.html with hot reload script injected
        if (url.pathname === '/') {
            const html = await Bun.file(join(import.meta.dir, 'templates/index.html')).text();
            const hotReloadScript = `
        <script>
          const ws = new WebSocket('ws://localhost:3000/hot-reload');
          ws.onmessage = () => location.reload();
        </script>
      `;
            const modifiedHtml = html.replace('</body>', `${hotReloadScript}</body>`);

            return new Response(modifiedHtml, {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        }

        return new Response("Not Found", { status: 404 });
    },
    websocket: {
        open(ws) {
            clients.add(ws);
        },
        close(ws) {
            clients.delete(ws);
        },
        message() {
            // Handle any messages if needed
        },
    },
});

console.log(`Listening on http://localhost:${server.port}`);

// Watch for file changes
const watcher = watch([
    './src/static',
    './src/ts',
    './src/templates'
]);

watcher.on('change', () => {
    // Notify all clients to reload
    for (const client of clients) {
        client.send('reload');
    }
});

function watch(paths: string[]) {
    const { watch } = require('fs');
    const watcher = watch(paths[0], { recursive: true });

    paths.slice(1).forEach(path => {
        watch(path, { recursive: true }).on('change', (_, filename) => {
            watcher.emit('change', 'change', filename);
        });
    });

    return watcher;
}
