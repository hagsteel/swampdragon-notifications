from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.generic import ListView


class HomeView(ListView):
    template_name = 'index.html'
    model = User

    def get_queryset(self):
        return self.model.objects.all()

    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            user = User.objects.filter(pk=kwargs['pk']).first()
            user = authenticate(username=user.username, password='p')

            if user:
                login(request, user)
        else:
            logout(request)
        return super(HomeView, self).get(request, *args, **kwargs)
