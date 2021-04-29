
from django.db import models
from django.contrib.auth.models import User


class MyBook(models.Model):
    book_author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_book_author')
    book_title = models.CharField(max_length=100)
    content = models.TextField()
    poster_image = models.ImageField(upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return '"{book_title}" by {id}'.format(book_title=self.book_title, id=self.id)
