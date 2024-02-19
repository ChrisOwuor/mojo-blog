from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Blog, Subscription

from api.serializers import BlogSerializer, SubscriptionSerializer
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response

from user.models import NewUser
from user.serializers import CustomUserSerializer
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user_name'] = user.user_name
        token["email"] = user.email
        token["phone"] = user.phone
        token["id"] = user.id

        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Profile(request, id):
    serializer_data = []

    user = request.user
    user_data = NewUser.objects.filter(user_name=user)
    serializer = CustomUserSerializer(user_data, many=True).data

    blogs = Blog.objects.filter(creator=id)
    serialized_blogs = BlogSerializer(blogs, many=True).data

    # Append user data to serializer_data as a dictionary
    serializer_data.append({'user_data': serializer[0]})

    try:
        sub = Subscription.objects.get(premium_user=id)
        sub_serialized = SubscriptionSerializer(sub).data
        # Append premium data to serializer_data as a dictionary
        serializer_data.append({'premium': sub_serialized["is_premium"]})
    except Subscription.DoesNotExist:
        # Append premium data to serializer_data as a dictionary
        serializer_data.append({'premium': False})

    # Append blogs data to serializer_data as a dictionary
    serializer_data.append({'blogs': serialized_blogs})

    return Response(serializer_data, status.HTTP_200_OK)


@api_view(['GET'])
def Bio(request, id):
    serializer_data = {}

    bio_data = NewUser.objects.get(uid=id)
    serialized_bio_data = CustomUserSerializer(bio_data).data
    serializer_data["user_info"] = serialized_bio_data
    blogs = Blog.objects.filter(creator=serialized_bio_data["id"])
    serialized_blogs = BlogSerializer(blogs, many=True).data
    serializer_data["blogs"] = serialized_blogs

    serializer_data["total_blogs"] = len(serialized_blogs)

    return Response(serializer_data, status.HTTP_200_OK)


@api_view(['GET'])
def User(request, id):
    serializer_data = {}

    # Check if the user exists
    user = get_object_or_404(NewUser, id=id)

    # Check if the user has a subscription
    subscription, created = Subscription.objects.get_or_create(
        premium_user=user, defaults={'is_premium': False})

    # Serialize user information
    serialized_bio_data = CustomUserSerializer(user).data
    serializer_data["user_info"] = serialized_bio_data

    # Serialize subscription information
    serializer_data["premium"] = subscription.is_premium

    return Response(serializer_data, status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Premium_update(request, id):
    serializer_data = {}

    blogs = Blog.objects.filter(creator=id)
    serialized_blogs = BlogSerializer(blogs, many=True).data
    serializer_data["blogs"] = serialized_blogs
    bio_data = NewUser.objects.get(id=id)
    serialized_bio_data = CustomUserSerializer(bio_data).data
    serializer_data["user_info"] = serialized_bio_data
    serializer_data["total_blogs"] = len(serialized_blogs)

    return Response(serializer_data, status.HTTP_200_OK)

# view to et top users


@api_view(['GET'])
def Top_Author(request):
    users = NewUser.objects.all()
    user_list = CustomUserSerializer(users, many=True).data
    for user in user_list:
        blog = Blog.objects.filter(creator=user.get('id'))
        serializer = BlogSerializer(blog, many=True).data
        user['blogs'] = len(serializer)

    return Response(user_list, status.HTTP_200_OK)


