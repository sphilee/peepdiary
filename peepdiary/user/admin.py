from django.contrib import admin

# Register your models here.
from peepdiary.user.models import PeepUser


class PeepUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'social_account', 'name', 'gender', 'date_birth')


admin.site.register(PeepUser, PeepUserAdmin)