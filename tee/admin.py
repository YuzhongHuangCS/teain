from django.contrib import admin

from tee.models import Clothes
# Register your models here.
from models import Clothes, Cloth

admin.site.register(Clothes)
admin.site.register(Cloth)
