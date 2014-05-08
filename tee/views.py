from django.shortcuts import render, get_object_or_404

from django.http import Http404, HttpResponseRedirect
from django.core.urlresolvers import reverse

from tee.models import Clothes
# Create your views here.

def index(request):
    return render(request, 'tee/index.html', None)

def detail(request, clothes_id):
    clothes = get_object_or_404(Clothes, pk=clothes_id)
    return render(request, 'tee/detail.html', {'clothes': clothes})

def vote(request):

    try:
        clothes_id = request.POST['c_id']
        clothes = Clothes.objects.get(pk=clothes_id)
    except:
        raise Http404
    else:
        clothes.c_favor += 1
        clothes.save()
        return HttpResponseRedirect(reverse('tee:detail', args=(clothes.id, )))
    