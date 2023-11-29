from django.urls import path
from .views import (
    update_profile_picture,
    update_user_name,
    update_my_bio,
    update_email,
    update_phone,
    update_security,
    update_personal_info,
)

urlpatterns = [
    path('update_profile_picture/<int:user_id>/', update_profile_picture, name='update-profile-picture'),
    path('update_user_name/<int:user_id>/', update_user_name, name='update-user-name'),
    path('update_my_bio/<int:user_id>/', update_my_bio, name='update-my-bio'),
    path('update_email/<int:user_id>/', update_email, name='update-email'),
    path('update_phone/<int:user_id>/', update_phone, name='update-phone'),
    path('update_security/<int:user_id>/', update_security, name='update-security'),
    path('update_personal_info/<int:user_id>/', update_personal_info, name='update-personal-info'),
]