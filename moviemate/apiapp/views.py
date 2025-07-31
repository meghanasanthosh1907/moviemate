from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from apiapp.models import User
from .serializers import MovieSerializer
from rest_framework import status
from .models import Movie

#home
@api_view(['GET'])
@permission_classes((AllowAny,))
def home(request):
    return Response({"message": "API is working!"})


#signup
@api_view(['POST'])
@permission_classes((AllowAny,))
def Signup(request):
        email  = request.data.get("email")
        password = request.data.get("password")
        name = request.data.get("name")
        if not name or not email or not password:
            return Response({'message':'All fields are required'})
        if User.objects.filter(email=email).exists():
            return Response({'message':'Email already exist'})
        user = User.objects.create_user(email=email,password=password,name= name)
        user.save
        return Response({'message':'user created successsfully'} ,status = 200)

#login
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=HTTP_200_OK)

#add
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_movie(request):
    user = request.user.id
    title = request.data.get('title')
    
    
    if Movie.objects.filter(title=title, user=user).exists():
        return Response(
            {"error": "You have already added a movie or TV show with this title."},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = MovieSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=user)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_movies(request):
    user = request.user
    movies = Movie.objects.filter(user=user)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_movie(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id, user=request.user)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)

    serializer = MovieSerializer(movie, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_single_movie(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id, user=request.user)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=HTTP_404_NOT_FOUND)

    serializer = MovieSerializer(movie)
    return Response(serializer.data, status=HTTP_200_OK)


#logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()  
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
