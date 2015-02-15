from django.conf.urls import patterns, include, url
from django.contrib import admin
from app.views import HomeView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^user/(?P<pk>\d+)/$', HomeView.as_view(), name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
