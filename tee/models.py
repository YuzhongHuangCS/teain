#coding=utf-8
from django.db import models

# Create your models here.

# class Reporter(models.Model):
#   full_name = models.CharField(max_length=20)

#   def __unicode__(self):
#       return self.full_name

# class Article(models.Model):
#   pub_date = models.DateField()
#   headline = models.CharField(max_length=100)
#   content = models.TextField()
#   reporter = models.ForeignKey(Reporter)

#   def __unicode__(self):
#       return self.headline

class Clothes(models.Model):
    c_name = models.CharField(max_length=50)
    c_type = models.CharField(max_length=20)
    c_favor = models.IntegerField(default=0) #点赞数

    def __unicode__(self):
        return self.c_name

class Product(models.Model):
    title       = models.CharField(max_length=100)
    description = models.TextField()
    image_url   = models.CharField(max_length=200)
    price       = models.DecimalField(max_digits=8,decimal_places=2)


