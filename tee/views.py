# Create your views here.
from django.shortcuts import reder_to_response

def index(req):
    hello = 'helloaaaa'
    return render_to_response('index.html', {'var':hello})