from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from peepdiary.user.models import get_peep_user, PeepUser, get_or_none
from allauth.socialaccount.models import SocialAccount


def signup(request):
    if not request.user.id:
        return HttpResponseRedirect("/accounts/login/")

    full_name = request.POST.get("full_name", "")

    if full_name != "":
        gender = int(request.POST.get("gender", 0))
        birth = request.POST.get("birth")

        PeepUser.objects.create(user=request.user, social_account=get_or_none(SocialAccount, user=request.user), name=full_name, gender=gender, date_birth=birth)

        return HttpResponseRedirect("/")

    context = {
        "user": request.user
    }
    return render(request, "user/signup.html", context)