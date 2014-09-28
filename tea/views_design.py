#coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core import serializers

from tea.models import Cloth, ClothImg, ClothSize, ClothDesc, Order, Design_cloth
from tea.forms import RegisterForm, OrderForm, ClothUploadForm

from django.contrib.auth.decorators import login_required


@login_required
def design_upload(request):

    user = request.user

    if request.method == 'POST':
        form = ClothUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form_data = form.cleaned_data
            cloth_design = Cloth(title=form_data['title'], content=form_data['content'],
                                 price=form_data['price'], color=form_data['color'],
                                 img_src=form_data['front_img'], back_img=form_data['back_img'],
                                 online=False)
            cloth_design.save()
            design = Design_cloth(cloth=cloth_design, user=user)
            design.save()
            return HttpResponse(cloth_design.id)
        return HttpResponse('None')
    else:
        form = ClothUploadForm()
        form_dict = {
            'form': form,
        }
        return render(request, 'tea/design_cloth_form.html', form_dict)



@login_required
def get_design_cloth(request):

    user = request.user
    cloth_list = Design_cloth.objects.filter(user=user)
    data = serializers.serialize('json', cloth_list)
    return HttpResponse(data)

