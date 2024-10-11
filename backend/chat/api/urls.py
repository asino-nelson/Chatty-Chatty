from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path('', views.getRoutes),

    path("inbox/<user_id>/", views.Inbox.as_view()),
    path("get-messages/<sender_id>/<receiver_id>/", views.GetMessages.as_view()),
    path("send-message/", views.SendMessage.as_view()),

    path("profile/<int:pk>/", views.ProfileDetails.as_view()),
    path("search/<username>/", views.SearchUser.as_view()),

]
