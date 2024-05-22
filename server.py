import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyServer:
    def __init__(self, port):
        self.port = port
        self.server_address = ('', self.port)
        self.httpd = HTTPServer(self.server_address, SimpleHTTPRequestHandler)

    def open_browser(self, browser_type='chrome'):
        url = f"http://localhost:{self.port}"
        print(f"Starting HTTP server at {url}")

        if browser_type == 'chrome':
            chrome_path = 'C:/Program Files/Google/Chrome/Application/chrome.exe %s --incognito'
            webbrowser.get(chrome_path).open(url)
        elif browser_type == 'firefox':
            firefox_path = 'C:/Program Files/Mozilla Firefox/firefox.exe %s -private-window'
            webbrowser.get(firefox_path).open(url)


    def run(self):
        self.open_browser()
        print(f"Running server...")
        self.httpd.serve_forever()

if __name__ == "__main__":
    server = MyServer(port=5216)
    server.run()
