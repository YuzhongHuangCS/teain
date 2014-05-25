from django import forms

class RegisterForm(forms.Form):

    username = forms.CharField(max_length=20, required=True)
    password = forms.CharField(widget=forms.PasswordInput, max_length=20, required=True)
    email = forms.EmailField(required=True)


class OrderForm(forms.Form):

    user_id = forms.IntegerField(required=True)
    cloth_id = forms.IntegerField(required=True)
    num = forms.IntegerField(required=True)

