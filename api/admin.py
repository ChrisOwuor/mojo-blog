# In your app's admin.py file
from django.contrib import admin
from .models import BlogCategory, Blog, BlogComment, Like ,Subscription



@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'premium_user', 'is_premium']


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('id',"uid",  'category_name',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'creator', 'category',
                    'created_at', 'updated_at', "image")
    list_filter = ('creator', 'category', 'created_at')


@admin.register(BlogComment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment_by', 'blog',  'created_at')
    list_filter = ('comment_by', 'blog', 'created_at')


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'like_by', 'blog')
    list_filter = ('like_by', 'blog')
