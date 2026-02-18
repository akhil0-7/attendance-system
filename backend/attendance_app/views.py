from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student, Attendance
from .serializers import StudentSerializer, AttendanceSerializer
from datetime import date

@api_view(['GET', 'POST'])
def student_list(request):
    if request.method == 'GET':
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


@api_view(['GET', 'POST'])
def mark_attendance(request):
    if request.method == 'POST':
        student_id = request.data['student']
        present = request.data['present']

        attendance = Attendance.objects.create(
            student_id=student_id,
            date=date.today(),
            present=present
        )
        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data)

    if request.method == 'GET':
        records = Attendance.objects.all()
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data)
