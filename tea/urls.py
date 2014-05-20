from django.conf.urls import patterns, url

from tea import views

urlpatterns = patterns('',

    # json api
    url(r'^get_cloth/(\d+)/$', views.get_cloth, name='cloth'),
    url(r'^get_clothes/(\d+)/(\d+)/$', views.get_clothes, name='clothes'),
    url(r'^get_cloth_imgs/(\d+)/$', views.get_cloth_imgs, name='cloth_imgs'),
    url(r'^get_cloth_sizes/(\d+)/$', views.get_cloth_sizes, name='cloth_sizes'),

    # user log
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),

    # test view pages
    url(r'^cloth_show/(\d+)/$', views.cloth_show),
    url(r'^cloth_imgs/(\d+)/$', views.cloth_imgs_show),
)