#coding=utf-8
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Cloth(models.Model):

    title = models.CharField(max_length=50)
    keywords = models.CharField(max_length=100)
    summary = models.CharField(max_length=200)
    author = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    content = models.TextField()

    need = models.IntegerField(default=0)
    get = models.IntegerField(default=0)
    got = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    end_date = models.DateField(null=True)
    color = models.IntegerField(default=0)

    img_src = models.ImageField(upload_to='./tea/clothes_imgs')
    back_img = models.ImageField(upload_to='./tea/clothes_imgs')

    online = models.BooleanField(default=False)

    def __unicode__(self):
        return self.title


class Design_cloth(models.Model):

    cloth = models.ForeignKey(Cloth)
    user  = models.ForeignKey(User)

    def __unicode__(self):
        return self.cloth.title + ' -- ' + self.cloth.author


class ClothUpload(models.Model):

    title = models.CharField(max_length=50)
    content = models.TextField()

    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.IntegerField(default=0)

    front_img = models.ImageField(upload_to='./tea/clothes_imgs')
    back_img  = models.ImageField(upload_to='./tea/clothes_imgs')

    user = models.ForeignKey(User)

    def __unicode__(self):
        return self.title


class ClothImg(models.Model):

    img_src = models.ImageField(upload_to='./tea/clothes_imgs')
    cloth = models.ForeignKey(Cloth)

    def __unicode__(self):
        return self.cloth.title


class ClothDesc(models.Model):

    img_src = models.ImageField(upload_to='./tea/clothes_descs')
    cloth = models.ForeignKey(Cloth)

    def __unicode__(self):
        return self.cloth.title


class ClothSize(models.Model):

    size = models.CharField(max_length=10)
    cloth = models.ForeignKey(Cloth)

    def __unicode__(self):
        return self.cloth.title + ' -- '+ self.size


class Order(models.Model):

    user = models.ForeignKey(User)
    cloth = models.ForeignKey(Cloth)
    num = models.IntegerField()

    sum_price = models.DecimalField(max_digits=10, decimal_places=2)

    ord_date = models.DateTimeField(auto_now=True)
    payed = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default='未付款')

    def __unicode__(self):
        return self.user.username + ' -- ' + self.cloth.title


