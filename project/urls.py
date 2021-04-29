
from django.contrib import admin
from django.urls import path, include
from user_auth.views import UserAuthViewSet, home
from my_books.views import MyBookViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'user-auth', UserAuthViewSet, basename='user_auth')
router.register(r'my-books', MyBookViewSet, basename='my_books')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user-auth/', include('user_auth.urls')),
    path('rest-api/', include(router.urls)),
    path('', home, name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
