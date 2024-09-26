from rest_framework_simplejwt.tokens import Token
from api.models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)

        return token
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, attributes):
        if attributes['password'] != attributes['password2']:
            raise serializers.ValidationError(
                {"password": "The passwords do not match"}
            )
        return attributes
    
    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    

class ProfileSerializer(serializers.ModelSerializer):
        class Meta:
            model = Profile
            fields = ['id', 'user', 'full_name', 'image']

        def __init__(self, *args, **kwargs):
            super(ProfileSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            if request and request.method=='POST':
                self.Meta.depth = 0
            else:
                self.Meta.depth = 3


class ChatMessageSerializer(serializers.ModelSerializer):
    receiver_profile = ProfileSerializer(read_only=True)
    sender_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'sender', 'sender_profile', 'receiver', 'receiver_profile', 'message', 'is_read', 'date']

    def __init__(self, *args, **kwargs):
        super(ChatMessageSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method=='POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 2