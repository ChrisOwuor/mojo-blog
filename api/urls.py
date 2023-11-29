from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt for exempting CSRF protection on specific views if necessary
from django.urls import path ,re_path
from . import views
from django.views.generic import TemplateView

app_name = 'api'

urlpatterns = [
    # Blog URLs
    path('api/search/',views.blog_search, name='search_page'),

    path('api/blogs/', views.Blogs, name='blog-list-create'),
    path('api/all/category/', views.Category, name='blog-list-create'),

    path('api/blogs/category/<int:id>/',
         views.Blogs_by_category, name='blog-list-create'),

    path('api/blogs/add', views.add_blog, name='blog-list-create'),
    path('api/blogs/edit/<str:uid>', views.edit_blog, name='blog-list-create'),

    path('api/generate_response/', views.generate_response, name='generate_response'),


    path('api/blogs/<str:uid>', views.get_single_blog,
         name='get_single_blog'),
    path('api/trending-blogs/', views.get_trending_blogs,
         name='get_trending_blogs'),

    path('api/featured-blogs/', views.get_featured_blogs,
         name='get_featured_blogs'),
    path('api/comment/', views.Comment, name='comment-list-create'),
    path('api/comment/<int:id>/',
         views.update_or_delete_comment, name='comment-detail'),
    path('api/blog/action/<int:id>/',
         views.update_or_delete_blog, name='comment-detail'),
    path('api/billing/<int:id>/', views.buy_premium, name='comment-detail'),
    path('api/stream/', views.stream_video, name='stream_video'),
    re_path(r'^(|create|single|profile|login|signup|blogs(|/all|/:name/:id/:uid)|about|bio|edit/blog|edit/user)(/.*)?$',
            TemplateView.as_view(template_name='index.html')),

]
