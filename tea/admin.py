from django.contrib import admin

# Register your models here.
from models import Cloth, ClothImg, ClothSize, ClothDesc, Order, Design_cloth

admin.site.register(Cloth)
admin.site.register(ClothImg)
admin.site.register(ClothSize)
admin.site.register(ClothDesc)

admin.site.register(Design_cloth)

admin.site.register(Order)