import asyncio
from aiohttp import web
import webbrowser
import os

class MyAsyncServer:
    def __init__(self, port, static_dir='static'):
        self.port = port
        self.app = web.Application()
        self.app.router.add_static('/static/', static_dir, name='static')
        self.app.router.add_get('/', self.index)

    async def index(self, request):
        return web.FileResponse('./index.html')

    def open_browser(self, browser_type='chrome'):
        url = f"http://localhost:{self.port}"
        print(f"Opening browser at {url}")

        if browser_type == 'chrome':
            chrome_path = 'C:/Program Files/Google/Chrome/Application/chrome.exe %s --incognito'
            webbrowser.get(chrome_path).open(url)
        elif browser_type == 'firefox':
            firefox_path = 'C:/Program Files/Mozilla Firefox/firefox.exe %s -private-window'
            webbrowser.get(firefox_path).open(url)

    async def run_server(self):
        runner = web.AppRunner(self.app)
        await runner.setup()
        site = web.TCPSite(runner, 'localhost', self.port)
        await site.start()
        print(f"Running server on http://localhost:{self.port}")

        while True:
            await asyncio.sleep(3600)

if __name__ == "__main__":
    server = MyAsyncServer(port=5324)
    asyncio.run(server.run_server())
    server.open_browser()
