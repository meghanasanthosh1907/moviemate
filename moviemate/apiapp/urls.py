from django.urls import path
from . import views


urlpatterns = [
     path('', views.home, name='home'),  
    path('signup', views.Signup, name='signup'),
    path('login', views.login, name='login'),
    path('addmovie', views.add_movie, name='add'),
    path('movies/', views.get_movies, name='get_movies'),
    path('movies/<int:movie_id>/', views.get_single_movie, name='movie_detail'),
    path('movies/<int:movie_id>/edit/', views.update_movie, name='update_movie'),
      path('logout/', views.logout_user, name='logout'),

]
