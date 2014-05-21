#coding=utf-8
from django.db import models

# Create your models here.

class Cloth(models.Model):
    title = models.CharField(max_length=50)
    summary = models.CharField(max_length=200)
    author = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    content = models.TextField()

    need = models.IntegerField(default=0)
    get = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    img_src = models.ImageField(upload_to='./tea/clothes_imgs')

    def __unicode__(self):
        return self.title

class ClothImg(models.Model):

    img_src = models.ImageField(upload_to='./tea/clothes_imgs')
    cloth = models.ForeignKey(Cloth)

    def __unicode__(self):
        return self.cloth.title

class ClothSize(models.Model):

    size = models.CharField(max_length=10)
    cloth = models.ForeignKey(Cloth)

    def __unicode__(self):
        return self.cloth.title + self.size
