from django.shortcuts import render
from .models import categoria
from .serializers import CategoriaSerializer 
from rest_framework import viewsets  
from rest_framework.permissions import IsAuthenticated

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = categoria.objects.all().order_by('-id')
    serializer_class = CategoriaSerializer
