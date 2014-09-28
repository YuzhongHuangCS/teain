from django import forms

class RegisterForm(forms.Form):

    username = forms.CharField(max_length=20, required=True)
    password = forms.CharField(widget=forms.PasswordInput, max_length=20, required=True)
    email = forms.EmailField(required=True)


class OrderForm(forms.Form):

    user_id = forms.IntegerField(required=True)
    cloth_id = forms.IntegerField(required=True)
    num = forms.IntegerField(required=True)


class ClothUploadForm(forms.Form):

    title = forms.CharField(max_length=50, required=True)
    content = forms.CharField(max_length=500, required=True)

    price = forms.DecimalField(max_digits=10, decimal_places=2, required=True)
    color = forms.IntegerField(required=True)

    front_img = forms.ImageField()
    back_img = forms.ImageField()

