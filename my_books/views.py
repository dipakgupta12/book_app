
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.response import Response
from my_books.serializers import MyBookSerializer
from user_auth.serializers import UserAuthSerializer
from my_books.models import MyBook


class MyBookViewSet(viewsets.ModelViewSet):
    """For django MyBook model api."""

    queryset = MyBook.objects.all()
    serializer_class = MyBookSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """To pass onli list of book whose book_author is logged in user."""
        if self.request.query_params.get("book_author_id", None):
            self.queryset = self.queryset.filter(
                book_author=User.objects.get(pk=self.request.query_params.get("book_author_id")))
        return super().list(request, *args, **kwargs)

    @action(detail=False, permission_classes=(AllowAny,), methods=['get'])
    def get_all_book_list(self, request):
        """To get list of all books."""
        serializer = MyBookSerializer(self.queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=(AllowAny,), methods=['get'])
    def profile(self, request):
        user = request.user
        serialized_user = UserAuthSerializer(user).data
        return Response({'user': serialized_user })
