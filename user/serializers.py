from rest_framework import serializers
from user.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=False)
    user_name = serializers.CharField(required=False)
    password = serializers.CharField(min_length=8, write_only=True)
    phone = serializers.IntegerField(required=False)

    class Meta:
        model = NewUser
        fields = ("id","uid",'email', 'user_name', 'password', "phone","image","gender","bio","age","country")
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        # Update only the fields that are provided in the request
        instance.user_name = validated_data.get(
            'user_name', instance.user_name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.image = validated_data.get('image', instance.image)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.age = validated_data.get('age', instance.age)
        instance.country = validated_data.get('country', instance.country)

        password = validated_data.get('password')
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance
