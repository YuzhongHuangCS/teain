#-*- coding:utf-8 -*-

def app(environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/html')]
    start_response(status, headers)
    body=["Welcome to \n"]
    return body

from bae.core.wsgi import WSGIApplication
application = WSGIApplication(app)
