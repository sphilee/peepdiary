from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import User
from django.core.exceptions import MultipleObjectsReturned
from django.db import models

# Create your models here.


class PeepUser(models.Model):
    user = models.OneToOneField(User)
    social_account = models.OneToOneField(SocialAccount)
    name = models.CharField(max_length=10)
    gender = models.IntegerField(default=0)
    date_birth = models.DateField()

    def __str__(self):
        return '[%d] %s' % (self.id, self.user.first_name)

    def get_name(self):
        return self.name

    def get_email(self):
        return self.social_account.extra_data['kaccount_email']

    def get_picture(self):
        return self.social_account.extra_data['properties']['profile_image']

    def get_gender(self):
        if self.gender == 0:
            return "남자"
        return "여자"

    def get_birth(self):
        return self.date_birth


def get_peep_user(user):
    return get_or_none(PeepUser, user=user)


def get_or_none(model,order=None, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except MultipleObjectsReturned as e:
        if order == "-":
            res = model.objects.filter(**kwargs).order_by("-id")
        else :
            res = model.objects.filter(**kwargs).order_by("id")
        if res:
            return res[0]
        return None
    except Exception as e:
        return None
