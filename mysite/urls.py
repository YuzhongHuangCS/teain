from django.conf.urls import patterns, include, url

import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT}),

    # my app
    url(r'^tee/', include('tee.urls', namespace='tee')), # test
    url(r'^tea/', include('tea.urls', namespace='tea')),
)
