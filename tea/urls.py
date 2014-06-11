from django.conf.urls import patterns, url
from django.views.generic import DetailView, ListView

from tea.models import Cloth
from tea import views, views_design

urlpatterns = patterns('',

    url(r'^$', views.index),

    # json api
    url(r'^api/get_cloth/(\d+)/$', views.get_cloth, name='cloth'),
    url(r'^api/get_cloth_list/(\d+)/(\d+)/$', views.get_cloth_list, name='cloth_list'),
    url(r'^api/get_cloth_imgs/(\d+)/$', views.get_cloth_imgs, name='cloth_imgs'),
    url(r'^api/get_cloth_descs/(\d+)/$', views.get_cloth_desc, name='cloth_descs'),
    url(r'^api/get_cloth_sizes/(\d+)/$', views.get_cloth_sizes, name='cloth_sizes'),

    url(r'api/get_design_list/$', views_design.get_design_cloth),

    # user log
    url(r'^accounts/register/$', views.register),
    url(r'^accounts/login/$', views.login_view),
    url(r'^accounts/logout/$', views.logout_view),
    url(r'^accounts/userinfo/$', views.user_info),

    # order
    url(r'api/make_order/$', views.make_order),
    url(r'api/get_user_orders/$', views.user_orders),

    # design
    url(r'^api/cloth_design/$', views_design.design_upload),


    # user log
    # url(r'^register/$', views.register, name='register'),
    # url(r'^login/$', views.login, name='login'),
    # url(r'^logout/$', views.logout, name='logout'),

    # test view pages
    url(r'^cloth_show/(\d+)/$', views.cloth_show),
    url(r'^cloth_imgs/(\d+)/$', views.cloth_imgs_show),

    url(r'^cloth_list/$', views.cloth_list),
    url(r'^cloth_detail/(\d+)/$', views.cloth_detail),

    # url(r'^cloth_list/$', ListView.as_view(
    #     queryset=Cloth.objects.all(),
    #     context_object_name='cloth_list',
    #     template_name='tea/cloth_list.html'
    # )),
)