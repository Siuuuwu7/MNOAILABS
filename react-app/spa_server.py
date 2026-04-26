#!/usr/bin/env python3
"""SPA-aware static server for the MNO AI LABS React build."""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = sys.argv[1] if len(sys.argv) > 1 else '/root/minhaz/mnoailabs/dist'
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 4174
BIND = sys.argv[3] if len(sys.argv) > 3 else '127.0.0.1'

os.chdir(ROOT)

ASSET_EXT = ('.js', '.css', '.png', '.svg', '.ico', '.jpg', '.jpeg', '.webp', '.gif', '.woff', '.woff2', '.ttf', '.json', '.map', '.txt', '.xml')

class SPAHandler(SimpleHTTPRequestHandler):
    def _route(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        rel = path.lstrip('/')
        fs_path = os.path.join(ROOT, rel)
        if rel and not os.path.exists(fs_path) and not rel.startswith('assets/') and not rel.endswith(ASSET_EXT):
            self.path = '/index.html'

    def do_GET(self):
        self._route()
        return super().do_GET()

    def do_HEAD(self):
        self._route()
        return super().do_HEAD()

    def end_headers(self):
        if self.path.endswith('.html') or self.path in ('/', '/index.html'):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        else:
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), fmt % args))

if __name__ == '__main__':
    print(f"Serving SPA at http://{BIND}:{PORT}/ from {ROOT}")
    ThreadingHTTPServer((BIND, PORT), SPAHandler).serve_forever()
