
# Register your models here.
from django.contrib import admin
from user.models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'user_name', )
    list_filter = ("id", 'email', 'user_name',
                   'is_active', 'is_staff', "phone",)
    ordering = ('-start_date',)
    list_display = ("id", 'email', 'user_name', "phone",
                    'is_active', 'is_staff', "gender", "image","age","gender","country")
    fieldsets = (
        (None, {'fields': ('email', 'user_name','gender','image',
                           'age','country','phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'password1', 'password2', 'is_active', "phone", 'is_staff')}
         ),
    )


admin.site.register(NewUser, UserAdminConfig)
