# Assuming you have a custom user model in user.models
from user.models import NewUser
from django.db import models

import uuid


class BlogCategory(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    category_name = models.CharField(max_length=255)

    def __str__(self):
        return self.category_name


class Blog(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    creator = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(
        BlogCategory, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to="static/Blog_images", blank=True)
    is_premium = models.BooleanField(default=False)
    def __str__(self):
        return self.title


class BlogComment(models.Model):
    comment_by = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.comment_by.user_name} on {self.blog.title}"




class Like(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    like_by = models.ForeignKey(NewUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"Like by {self.like_by.user_name} on {self.blog.title}"


class Subscription(models.Model):
    premium_user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    is_premium = models.BooleanField(default=False)
