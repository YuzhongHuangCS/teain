#-*- coding:utf-8 -*-

def app(environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/html')]
    start_response(status, headers)
    body=["Welcome to \n"]

    import django
    return "django version: " + django.get_version()

    #return body

from bae.core.wsgi import WSGIApplication
application = WSGIApplication(app)
