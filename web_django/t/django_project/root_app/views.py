from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index_html(p_request):
    #return HttpResponse('I am Root.')
    return render(p_request, 'root_app/index.html', {}, content_type='text/html')
