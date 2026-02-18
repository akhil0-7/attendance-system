from django.contrib import admin
from django.urls import path
from attendance_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/students/', views.student_list),
    path('api/attendance/', views.mark_attendance),
]
