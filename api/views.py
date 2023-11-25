from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from api.models import Blog, BlogCategory, Like, BlogComment, Subscription
from api.serializers import BlogSerializer, BlogCategorySerializer, CommentSerializer, LikeSerializer, SubscriptionSerializer
from user.models import NewUser
from user.serializers import CustomUserSerializer
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Count


# # get all blogs and to post a blog
# @api_view(['GET'])
# @parser_classes([MultiPartParser, FormParser])
# def Blogs(request):
#     if request.method == 'GET':
#         blogs = Blog.objects.all()
#         # Create a list to store serialized data with user names
#         serialized_data = []

#         for blog in blogs:
#             data = BlogSerializer(blog).data
#             # Replace 'user_name' with the actual field name for the user's name
#             data['creator'] = blog.creator.user_name
#             data['category'] = blog.category.category_name
#             data['category_id'] = blog.category.id
#             data['image']= blog.creator.image

#             serialized_data.append(data)

#         return Response(serialized_data, status.HTTP_200_OK)


# view to get all blogs
@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
def Blogs(request):
    if request.method == 'GET':
        blogs = Blog.objects.all()
        # Create a list to store serialized data with user names
        serialized_data = []

        for blog in blogs:
            profile = NewUser.objects.get(id=blog.creator.id)
            serializer = CustomUserSerializer(profile).data
            data = BlogSerializer(blog).data
            # Replace 'user_name' with the actual field name for the user's name
            data['creator'] = blog.creator.user_name
            data['category'] = blog.category.category_name
            data['category_id'] = blog.category.id

            data['profile'] = serializer["image"]

            serialized_data.append(data)

        return Response(serialized_data, status.HTTP_200_OK)

# views to serve hero section


# get all catgories
@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
def Category(request):
    if request.method == 'GET':
        cat = BlogCategory.objects.all()
        serializer = BlogCategorySerializer(cat, many=True).data
        # Create a list to store serialized data with user names

        return Response(serializer, status.HTTP_200_OK)
# get all blogs and to post a blog


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser])
def Blogs_by_category(request, id):
    if request.method == 'GET':

        blogs = Blog.objects.filter(category=id)
        # Create a list to store serialized data with user names
        serialized_data = []

        for blog in blogs:
            profile = NewUser.objects.get(id=blog.creator.id)
            serializer = CustomUserSerializer(profile).data
            data = BlogSerializer(blog).data
            # Replace 'user_name' with the actual field name for the user's name
            data['creator'] = blog.creator.user_name
            data['category'] = blog.category.category_name
            data["category_uid"] = blog.category.uid
            data['profile'] = serializer["image"]

            serialized_data.append(data)

        return Response(serialized_data, status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def add_blog(request):
    if request.method == "POST":
        mutable_data = request.data.copy()

        # Add the creator to the request data
        mutable_data['creator'] = request.user.id

        # Assuming category is a string in the request data
        category_name = mutable_data.get('category', '')
        # Get or create the category
        category, created = BlogCategory.objects.get_or_create(
            category_name=category_name)
        mutable_data['category'] = category.id

        serializer = BlogSerializer(data=mutable_data)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views to serve hero section


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_featured_blogs(request):
    # Get the most recently published blogs
    featured_blogs = Blog.objects.order_by(
        '-created_at')[:3]

    serialized_data = []

    for blog in featured_blogs:
        profile = NewUser.objects.get(id=blog.creator.id)
        serializer = CustomUserSerializer(profile).data
        data = BlogSerializer(blog).data
        # Replace 'user_name' with the actual field name for the user's name
        data['creator'] = blog.creator.user_name
        data['category'] = blog.category.category_name
        data['profile'] = serializer["image"]

        serialized_data.append(data)

    return Response(serialized_data, status=status.HTTP_200_OK)

# view to get latest blogs


@api_view(['GET'])
def get_trending_blogs(request):
    # Get the most recently published blogs
    featured_blogs = Blog.objects.annotate(
        like_count=Count('like')).order_by('-like_count')[:5]

    serialized_data = []

    for blog in featured_blogs:
        profile = NewUser.objects.get(id=blog.creator.id)
        serializer = CustomUserSerializer(profile).data
        data = BlogSerializer(blog).data
        like = Like.objects.filter(blog=blog)
        serialised_likes = LikeSerializer(like, many=True).data
        # Replace 'user_name' with the actual field name for the user's name
        data['creator'] = blog.creator.user_name
        data['category'] = blog.category.category_name
        data['profile'] = serializer["image"]
        data["like"] = len(serialised_likes)

        serialized_data.append(data)

    return Response(serialized_data, status=status.HTTP_200_OK)

# view to get a single blog get the cretor and  comments and likes


@api_view(['GET'])
def get_single_blog(request, uid):
    serialized_data = []
    single_blog = get_object_or_404(Blog, uid=uid)
    data = BlogSerializer(single_blog).data
    category = BlogCategorySerializer(
        BlogCategory.objects.get(id=data['category'])).data
    creator = CustomUserSerializer(
        NewUser.objects.get(id=data["creator"])).data
    comments = BlogComment.objects.filter(blog=single_blog)
    serialised_comments = CommentSerializer(comments, many=True).data
    likes = Like.objects.filter(blog=single_blog)
    like = LikeSerializer(likes, many=True).data
  
    data["category"] = category["category_name"]
    data["creator"] = creator["user_name"]

    data["creator_id"] = creator["id"]
    data["creator_uid"] = creator["uid"]
    data["profile"] = creator["image"]
    data["comments_no"] = len(serialised_comments)
    data["likes"] = len(like)
    # Iterate through comments and extract necessary information
    comments_data = []
    for comment in serialised_comments:
        comment_by = NewUser.objects.get(id=comment['comment_by'])
        serialised_comment_by = CustomUserSerializer(comment_by).data
        comment_data = {
            'comment_by': serialised_comment_by["user_name"],
            "comment_by_profile": serialised_comment_by["image"],
            'content': comment['content'],
            'created_at': comment['created_at'],
            "id": comment["id"]
        }
        comments_data.append(comment_data)

    data["comments"] = comments_data

    serialized_data.append(data)

    return Response(serialized_data, status=status.HTTP_200_OK)

# view to add acomment


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Comment(request):
    mutable_data = request.data.copy()
    mutable_data["comment_by"] = request.user.id
    blog_uid = mutable_data["uuid"]
    blog = Blog.objects.get(uid=blog_uid)
    serialized_blog = BlogSerializer(blog).data
    blog_id = serialized_blog["id"]
    mutable_data["blog"] = blog_id
    serialized_comment = CommentSerializer(data=mutable_data)
    if serialized_comment.is_valid():
        serialized_comment.save()
        return Response(serialized_comment.data, status.HTTP_201_CREATED)
    else:
        return Response(serialized_comment.errors, status.HTTP_400_BAD_REQUEST)


# view to edit a content and delete comment


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_or_delete_comment(request, id):
    comment = get_object_or_404(
        BlogComment, id=id, comment_by=request.user)

    if request.method == 'PUT':
        serializer = CommentSerializer(
            comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        comment.delete()
        return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# update or delete blog


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_or_delete_blog(request, id):
    blog = Blog.objects.get(id=id)

    if request.method == 'PUT':
        serializer = BlogSerializer(
            Blog, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        blog.delete()
        return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# view to pay


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_premium(request, id):
    serialized_data = {}
    mutable_data = request.data.copy()
    amount = mutable_data.get("amount", None)

    user = NewUser.objects.filter(id=id).first()

    if not user:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CustomUserSerializer(user).data
    subscription, created = Subscription.objects.get_or_create(
        premium_user=user)

    payment = "success"

    if payment == "success":
        subscription.is_premium = True
        subscription.save()

        serialized_data["message"] = "Payment success"
        serialized_data["user"] = serializer
        serialized_data["amount"] = amount

        return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
    elif payment == "fail":
        subscription.is_premium = False
        subscription.save()

        serialized_data["message"] = "Payment failed"
        serialized_data["user"] = serializer
        serialized_data["amount"] = amount

        return Response(serialized_data, status=status.HTTP_400_BAD_REQUEST)
