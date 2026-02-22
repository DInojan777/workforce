from .models import *
from users.models import *
from django.conf import settings
from django.contrib.auth import get_user_model
import jwt
import random
import string
from datetime import datetime, timedelta

JWT_SECRET = settings.SECRET_KEY
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 720  # 30 days

User = get_user_model()

def get_user_token(username):
    """Generate a JWT for the given username."""
    try:
        user = User.objects.get(username=username)
        payload = {
            'user_id': str(user.pk),
            'username': user.username,
            'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
            'iat': datetime.utcnow(),
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token
    except Exception as e:
        print("get_user_token error:", e)
        return None

def get_user_from_token(token_key):
    """Decode a JWT and return the User object."""
    try:
        payload = jwt.decode(token_key, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = User.objects.get(pk=payload['user_id'])
        return user
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    except Exception:
        return None

def generate_otp(length=4):
    """Generate a random numeric OTP of given length."""
    digits = string.digits
    otp = ''.join(random.choice(digits) for _ in range(length))
    return otp


def get_active_user(**kargs):
    try:
        return UserAuthentication.objects.get(**kargs)
    except:
        return None

def getuser_by_mobile(username):
    try:
        ep = UserPersonalInfo.objects.get(mobile_number=username)
        return ep.user
    except:
        return None

def get_object_by_pk(model, pk):
    try:
        return model.objects.get(pk=pk)
    except:
        return None

def get_user_from_request(request_info, data):
    user = request_info['user']
    if 'user_id' in data:
        try:
            employeeCompanyInfo = get_object_by_pk(
                EmployeeCompanyInfo, data['user_id'])
            user = employeeCompanyInfo.user
        except:
            pass
    return user

def get_user_company_from_request(request):
    response = {
        "user": None,
        "company_info": None,
        "is_admin": False,
        'is_branch_admin': False,
        "is_super_admin": False,
        "is_job_seeker": False,
        "is_contractor": False,
        "is_client": False,
        "is_guest": False,
    }
    try:
        token = request.META.get('HTTP_AUTHORIZATION')
        token = token.replace("Token ", "").replace("Bearer ", "")
        user = get_user_from_token(token)
        if user:
            response = get_user_company_from_user(user)
    except Exception as e:
        print("get_user_company_from_request error:", e)
    return response

def get_user_company_from_user(user):

    response = {
        "user": None,
        "company_info": None,
        "employee_id": None,
        "is_admin": False,
        'is_branch_admin': False,
        "is_super_admin": False,
        "is_guest": False,
        "is_job_seeker": False,
        "is_contractor": False,
        "is_client": False,
        'has_company': False,
        'has_company_branch_location': False,
        'company': None,
        'company_branch': None,
        'company_branch_location': None,
        'can_update_location': False,
        'photo': None,
        'name': None,
        'mobile_number': None
    }

    try:
        response['user'] = user
        user_auth = get_active_user(user=user)
        response['is_admin'] = user_auth.is_active and user_auth.is_admin
        response['designation'] = '-'
        try:
            employee_company_info = EmployeeCompanyInfo.objects.get(user=user)
            response['company_info'] = employee_company_info.company
            response['employee_id'] = employee_company_info.id
            try:
                response['photo'] = employee_company_info.photo.url
            except:
                pass

            response['name'] = employee_company_info.user.username
            response['is_super_admin'] = employee_company_info.authentication.is_super_admin
            response['is_job_seeker'] = employee_company_info.authentication.is_job_seeker
            response['is_guest'] = employee_company_info.authentication.is_guest
            response['is_contractor'] = employee_company_info.authentication.is_contractor
            response['is_client'] = employee_company_info.authentication.is_client

            employee_personal_info = UserPersonalInfo.objects.get(user=user)
            response['personal_info'] = employee_personal_info
            response['mobile_number'] = employee_personal_info.mobile_number

            try:
                response['is_branch_admin'] = user_auth.is_active and employee_company_info.designation.is_admin
                response['designation'] = employee_company_info.designation.name
            except:
                pass
            response['has_company'] = True
            response['company'] = {
                "name": employee_company_info.company.brand_name, "id": str(employee_company_info.company.id), 'type_is_provider': employee_company_info.company.type_is_provider}
            try:
                response['company_branch'] = {
                    "name": employee_company_info.company_branch.name, "id": str(employee_company_info.company_branch.id)}
                response['can_update_location'] = employee_company_info.company_branch.can_update_location
            except:
                response['company_branch'] = None

        except Exception as e:
            print("get_user_company_from_user error:", e)
            response['has_company'] = False

    except:
        pass

    return response


class ValidateRequest():

    def __init__(self, request, request_serializer=None):
        self.request = request
        self.request_data = request.data
        self.request_info = get_user_company_from_request(request)
        self.request_serializer = request_serializer

    def employee_company_info(self):
        return self.request_info['company_info']

    def employee_personal_info(self):
        employee_personal_info = UserPersonalInfo.objects.get(user=self.request_info['user'])
        return employee_personal_info

    def is_admin(self):
        if self.is_valid():
            userAuthentication = UserAuthentication.objects.get(user=self.request_info['user'])
            return userAuthentication.is_admin
        return False

    def is_valid_user(self):
        if self.request_info['company_info']:
            return True
        else:
            return False

    def errors(self):
        return self.errors

    def is_valid(self):
        if self.is_valid_user() == False:
            return False
        elif self.request_serializer is not None:
            request_serializer_response = self.request_serializer(data=self.request_data)
            if request_serializer_response.is_valid() == True:
                return True
            else:
                self.errors = request_serializer_response.errors
                return False
        else:
            return True

    def is_valid_open_request(self):
        if self.request_serializer is not None:
            request_serializer_response = self.request_serializer(data=self.request_data)
            if request_serializer_response.is_valid() == True:
                return True
            else:
                self.errors = request_serializer_response.errors
        else:
            return False

    def errors_formatted(self):
        return "Invalid Request Info"

def get_auth_info(token_key):
    try:
        user = get_user_from_token(token_key)
        if user:
            employee_info = EmployeeCompanyInfo.objects.filter(user=user).first()
            if employee_info:
                return employee_info.authentication
        return None
    except:
        return None