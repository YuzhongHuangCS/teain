from django.conf.urls import patterns, url

from tee import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^detail/(\d+)/$', views.detail, name='detail'),
    url(r'^vote/$', views.vote, name='vote'),

    url(r'^list/$', views.list, name='list'),
)