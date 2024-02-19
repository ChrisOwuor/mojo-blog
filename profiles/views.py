from django.shortcuts import get_object_or_404
from user.models import NewUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user.serializers import CustomUserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, parser_classes, permission_classes

@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def update_profile_picture(request, user_id):
    user = get_object_or_404(NewUser, id=user_id)

    # Ensure the user making the request is the owner of the profile
    if request.user.id != user.id:
        return Response({'error': 'You do not have permission to update this profile picture.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = CustomUserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        # If 'image' is in request.data, save it to the user's profile_picture field
        if 'image' in request.data:
            user.image = request.data['image']

        serializer.save()
        return Response({'message': 'Profile picture updated successfully'})

    return Response(serializer.errors)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_name(request, user_id):
    
    user = get_object_or_404(NewUser, id=user_id)
    serializer = CustomUserSerializer(
        user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User name updated successfully'})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_my_bio(request, user_id):
    user = get_object_or_404(NewUser, id=user_id)
    serializer = CustomUserSerializer(
        user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Bio updated successfully'})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_email(request, user_id):
    user = get_object_or_404(NewUser, id=user_id)
    serializer = CustomUserSerializer(
        user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Email updated successfully'})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_phone(request, user_id):
    user = get_object_or_404(NewUser, id=user_id)
    serializer = CustomUserSerializer(
        user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Phone updated successfully'})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_security(request, user_id):
    user = get_object_or_404(NewUser, id=user_id)
    # Implement your logic to handle security updates
    return Response({'message': 'Security info updated successfully'})




@api_view(['PUT'])  # You can use PUT method for partial updates
@permission_classes([IsAuthenticated])
def update_personal_info(request, user_id):
    user = get_object_or_404(NewUser, id=user_id)
    serializer = CustomUserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User information updated successfully'})

    return Response(serializer.errors, status=400)

