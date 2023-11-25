from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, MyTokenObtainPairView

from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
app_name = 'user'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("profile/<int:id>", views.Profile, name="profile"),
    path("bio/<str:id>", views.Bio, name="profile"),
    path("user/<int:id>", views.User, name="profile"),
    path("user/top", views.Top_Author, name="profile"),


    path("pay/<int:id>", views.Premium_update, name="profile"),



]
