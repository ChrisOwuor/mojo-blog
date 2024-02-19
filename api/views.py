import openai
from rest_framework.decorators import api_view
from django.db.models import Q
from django.views.decorators.http import require_GET
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404, render
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
from django.http import StreamingHttpResponse
import os


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

# add blog


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def edit_blog(request, uid):
    if request.method == "PUT":
        try:
            blog = Blog.objects.get(uid=uid)
        except Blog.DoesNotExist:
            return Response({"detail": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)

        mutable_data = request.data.copy()

        # Assuming category is a string in the request data
        category_name = mutable_data.get('category', '')
        # Get or create the category
        category, created = BlogCategory.objects.get_or_create(
            category_name=category_name)
        mutable_data['category'] = category.id

        # Update the serializer with the request data and instance
        serializer = BlogSerializer(blog, data=mutable_data, partial=True)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

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

# view for search fields
@api_view(['GET'])
@require_GET
def blog_search(request):
    try:
        search_query = request.GET.get('q', '')

        if not search_query:
            return Response([])

        results = Blog.objects.filter(
            Q(title__icontains=search_query) | Q(content__icontains=search_query))

        data = [{'id': blog.id, 'title': blog.title, 'content': blog.content, "uid": blog.uid}
                for blog in results]

        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


def stream_video(request):
    video_file_path = video_path = os.path.join('static', "ali.mp4")
# Replace with the actual path to your video file

    def generate_video_chunks(video_path):
        with open(video_path, 'rb') as video_file:
            while True:
                # Read 1MB chunks of the video file
                chunk = video_file.read(1024 * 1024)
                if not chunk:
                    break
                yield chunk

    response = StreamingHttpResponse(generate_video_chunks(
        video_file_path), content_type='video/mp4')
    return response


# views.py

# view to generate response
@api_view(['POST'])
def generate_response(request):
    if request.method == 'POST':
        client = openai.OpenAI(
            api_key="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")
        prompt = request.data.get('prompt', '')
        command = "below is a prompt make sure it reads make a blog about or anything close to that like i would like to create a blog about then only create a 3 titles and a 3 paragraphs at most dont exceed not a very long one just 200 words maximum for  every title enclose it in asterix and for every paragraph enclose it in double quotes dont write a the initial prompt just start from the first title assume the prompt is like write a blog about benefits of school just write a title and body *title here* " "  inside the asterix include the title and in the quotes include the body  again go to second *title here* "   " in the asterix include title  and write the body inside the quotes enclose the  in asterix and body in quotes follow this order precisely DO NOT  write anything else like disclaimer or a note just the three titles and the body thats all"
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[

                {"role": "user", "content": command+prompt}
            ]
        )
        response_message = response.choices[0].message.content

        return Response({"mes": response_message}, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
