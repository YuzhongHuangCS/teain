#coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse

from django.core import serializers

from tea.models import Cloth, ClothImg
# Create your views here.

def get_cloth(request, cloth_id):

    cloth = []
    cloth.append(Cloth.objects.get(pk=cloth_id))
    data = serializers.serialize('json', cloth)
    return HttpResponse(data)

def get_clothes(request, start_id, limit):

    clothes = Cloth.objects.all()[start_id:start_id+limit]
    data = serializers.serialize('json', clothes)
    return HttpResponse(data)

def get_cloth_imgs(request, cloth_id):

    cloth_imgs = ClothImg.objects.filter(cloth=cloth_id)
    data = serializers.serialize('json', cloth_imgs)
    return HttpResponse(data)
