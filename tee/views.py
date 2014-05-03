# Create your views here.
from django.shortcuts import render
import django

def index(request):
    hello = 'helloaaaa'
    version = django.VERSION
    return render(request, 'index.html', {'var': hello, 'version': version})
