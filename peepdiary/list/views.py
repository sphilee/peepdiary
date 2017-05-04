from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from peepdiary.user.models import get_peep_user


def calendar(request):
    if not request.user.id:
        return HttpResponseRedirect("/accounts/login/")
    elif not get_peep_user(request.user):
        return HttpResponseRedirect("/user/signup/")

    context = {
        "user": get_peep_user(request.user)
    }
    return render(request, "list/calendar.html", context)