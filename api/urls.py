from django.urls import path
from . import views
app_name = 'api'

urlpatterns = [
    # Blog URLs
    path('blogs/', views.Blogs, name='blog-list-create'),
    path('all/category/', views.Category, name='blog-list-create'),

    path('blogs/category/<int:id>/',
         views.Blogs_by_category, name='blog-list-create'),

    path('blogs/add', views.add_blog, name='blog-list-create'),


    path('blogs/<str:uid>', views.get_single_blog,
         name='get_single_blog'),
    path('trending-blogs/', views.get_trending_blogs,
         name='get_trending_blogs'),

    path('featured-blogs/', views.get_featured_blogs,
         name='get_featured_blogs'),
    path('comment/', views.Comment, name='comment-list-create'),
    path('comment/<int:id>/', views.update_or_delete_comment, name='comment-detail'),
    path('blog/action/<int:id>/', views.update_or_delete_blog, name='comment-detail'),
    path('billing/<int:id>/', views.buy_premium, name='comment-detail'),







    # path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),

    # # Blog Category URLs
    # path('blog-categories/', BlogCategory,),
    #      name='blog-category-list'),

    # # Comment URLs
    # path('comments/', Comment, name='comment-list-create'),
    # path('comments/<int:pk>/', Comment, name='comment-detail'),

    # # Like URLs
    # path('likes/', LikeList, name='like-list-create'),
    # path('likes/<int:pk>/', LikeDetailView.as_view(), name='like-detail'),

]
