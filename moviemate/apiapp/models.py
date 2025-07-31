from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, name , password=None ):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email,name = name)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length =255)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Movie(models.Model):
    STATUS_CHOICES = [
        ('watching', 'Watching'),
        ('completed', 'Completed'),
        ('wishlist', 'Wishlist'),
    ]

    PLATFORM_CHOICES = [
        ('netflix', 'Netflix'),
        ('prime', 'Prime'),
        ('hotstar', 'Hotstar'),
        ('other', 'Other'),
    ]
    TYPE_CHOICES = [
    ('movie', 'Movie'),
    ('tvshow', 'TV Show'),
]
 
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='movie')
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    user = models.ForeignKey('User',on_delete=models.CASCADE,default=None)
    total_episodes = models.IntegerField(null=True, blank=True)
    episodes_watched = models.IntegerField(null = True)
    rating = models.FloatField(null=True, blank=True)
    review = models.TextField(null=True, blank=True)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

