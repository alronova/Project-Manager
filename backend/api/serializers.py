from rest_framework import serializers
from .models import CustomUser, Project

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

class ProjectSerializer(serializers.ModelSerializer):
     class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'github_link',
            'deliverables',
            'deadline',
            'assigned_by',
            'assigned_to',
            'm1_title',
            'm1',
            'm2_title',
            'm2',
            'm3_title',
            'm3',
            'm4_title',
            'm4',
            'm5_title',
            'm5',
            'created_at',
        ]
        # extra_kwargs = {'assigned_by': {'read_only': True}, 'assigned_to': {'many':True, 'read_only': True}}