from rest_framework import serializers
from .models import CustomUser

class userRegisterationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'fullName', 'b_of', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            fullName=validated_data['fullName'],
            b_of=validated_data['b_of'],
            password=validated_data['password']
        )
        return user
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'fullName', 'b_of']
