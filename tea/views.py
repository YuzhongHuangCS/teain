#coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.core import serializers

from tea.models import Cloth, ClothImg, ClothSize
# Create your views here.

def get_cloth(request, cloth_id):

    cloth = []
    cloth.append(Cloth.objects.get(pk=cloth_id))
    data = serializers.serialize('json', cloth)
    return HttpResponse(data)

def get_cloth_list(request, start_id, limit):

    cloth_list = Cloth.objects.all()[start_id:start_id+limit]
    data = serializers.serialize('json', cloth_list)
    return HttpResponse(data)

def get_cloth_imgs(request, cloth_id):

    cloth_imgs = ClothImg.objects.filter(cloth=cloth_id)
    data = serializers.serialize('json', cloth_imgs)
    return HttpResponse(data)

def get_cloth_sizes(request, cloth_id):

    cloth_sizes = ClothSize.objects.filter(cloth=cloth_id)
    data = serializers.serialize('json', cloth_sizes)
    return HttpResponse(data)

#-----------------------------------------------------------

def cloth_show(request, cloth_id):

    cloth = Cloth.objects.get(pk=cloth_id)
    cloth_dict = {
        'title': u'衣服详细',
        'cloth': cloth,
    }
    return render(request, 'tea/show.html', cloth_dict)

def cloth_imgs_show(request, cloth_id):

    cloth_imgs = ClothImg.objects.filter(cloth=cloth_id)
    cloth_dict = {
        'title': u'衣服图片列表',
        'cloth_imgs': cloth_imgs,
    }
    return render(request, 'tea/show_imgs.html', cloth_dict)


# user
#--------------------------------------------------------------------

def user_info(request):

    if not request.user.is_authenticated():
        return HttpResponse("None")

    user = request.user
    data = serializers.serialize('json', (user,))
    return HttpResponse(data)


def login_view(request):

    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            return HttpResponse('ok')
        return HttpResponse('None')
    else:
        return render(request, 'tea/login.html', None)

def logout_view(request):

    logout(request)
    return HttpResponse('ok')


class reg_form(object):
    error = ''
    valid = False

    def __init__(self, POST):
        self.username = POST['username']
        self.password = POST['password']
        self.email = POST['email']

        # to do, check validation
        self.valid = True

    def is_valid(self):
        return self.valid

def register(request):

    if request.method == 'POST':
        form = reg_form(request.POST)
        if form.is_valid():
            user = User.objects.create_user(form.username, form.email, form.password)
            if user is not None:
                user.save()
                return HttpResponse('ok')
        return HttpResponse('None')
    else:
        return render(request, 'tea/register.html', None)

























#
# def register(request):
#
#     if 'POST' == request.method:
#         username = request.POST['username']
#         password = request.POST['password']
#         email = request.POST['email']
#         user = User.objects.create_user(username, email, password)
#         if user is not None:
#             user.save()
#             data = serializers.serialize('json', {'msg': 'ok'})
#             return HttpResponse(data)
#         else:
#             data = serializers.serialize('json', {'msg': 'failed'})
#             return HttpResponse(data)
#
#
# def login_user(request):
#
#     if 'POST' == request.method:
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             if user.is_active:
#                 login(request, user)
#                 # return HttpResponseRedirect()
#             else:
#                 pass
#
#
# def logout_user(request):
#
#     logout(request)