# Create your views here.
from django.shortcuts import render

def index(request):
    hello = 'helloaaaa'
    return render(request, 'index.html', {'var': hello})