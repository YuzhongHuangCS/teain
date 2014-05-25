from django.contrib import admin

# Register your models here.
from models import Cloth, ClothImg, ClothSize, Order

admin.site.register(Cloth)
admin.site.register(ClothImg)
admin.site.register(ClothSize)

admin.site.register(Order)