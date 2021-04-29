
from my_books.models import MyBook
from rest_framework import serializers
from user_auth.serializers import UserAuthSerializer


class MyBookSerializer(serializers.ModelSerializer):
    book_author_data = serializers.SerializerMethodField()

    class Meta:
        model = MyBook
        fields = ('id', 'book_author', 'book_title', 'content', 'poster_image', 'created_at','book_author_data')
        extra_kwargs = {
            'book_author_data': {'required': True}
        }

    def get_book_author_data(self, obj):
        return UserAuthSerializer(obj.book_author).data

