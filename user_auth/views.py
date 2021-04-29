
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from user_auth.serializers import MyTokenObtainPairSerializer, UserAuthSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


class MyObtainTokenPairView(TokenObtainPairView):
    """For django login api."""

    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class UserAuthViewSet(viewsets.ModelViewSet):
    """For django user model api."""

    queryset = User.objects.all()
    serializer_class = UserAuthSerializer
    permission_classes = (AllowAny,)


class LogoutView(APIView):
    """Logout api."""

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def home(request):
    """To setup root url."""
    return render(request, 'home.html')

