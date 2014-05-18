from django.conf.urls import patterns, url

from tea import views

urlpatterns = patterns('',

    url(r'^get_cloth/(\d+)/$', views.get_cloth, name='cloth'),
    url(r'^get_clothes/(\d+)/(\d+)/$', views.get_clothes, name='clothes'),
    url(r'^get_cloth_imgs/(\d+)/$', views.get_cloth_imgs, name='cloth_imgs'),
)