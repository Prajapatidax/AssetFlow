from django.core.management.base import BaseCommand
from apps.authentication.models import User
from apps.organization.models import Organization, Department
from apps.employees.models import Employee
from django.db import transaction


class Command(BaseCommand):
    help = 'Seeds database with default enterprise roles, departments, and user configurations.'

    def handle(self, *args, **kwargs):
        self.stdout.write('Starting database seed sequence...')
        
        try:
            with transaction.atomic():
                # 1. Create Default Organization
                org, created = Organization.objects.get_or_create(
                    code='AFCORP',
                    defaults={
                        'name': 'AssetFlow Solutions Corp',
                        'website': 'https://assetflow.example.com',
                        'address': '100 Tech Venture Pkwy, Suite 400',
                        'phone_number': '+1-800-555-0199',
                        'email': 'hq@assetflow.example.com'
                    }
                )
                if created:
                    self.stdout.write(f'Created Organization: {org}')
                else:
                    self.stdout.write(f'Found existing Organization: {org}')

                # 2. Create HQ / parent department
                hq_dept, created = Department.objects.get_or_create(
                    code='HQ',
                    defaults={
                        'organization': org,
                        'name': 'Corporate Headquarters'
                    }
                )
                
                # Create other departments
                eng_dept, created = Department.objects.get_or_create(
                    code='ENG',
                    defaults={
                        'organization': org,
                        'name': 'Engineering Department',
                        'parent_department': hq_dept
                    }
                )
                
                hr_dept, created = Department.objects.get_or_create(
                    code='HR',
                    defaults={
                        'organization': org,
                        'name': 'Human Resources',
                        'parent_department': hq_dept
                    }
                )

                self.stdout.write('Created organizational department trees.')

                # 3. Create Seed Users & Profiles
                users_payload = [
                    {
                        'username': 'admin',
                        'email': 'admin@assetflow.example.com',
                        'first_name': 'Alexander',
                        'last_name': 'Hamilton',
                        'role': User.Roles.ADMIN,
                        'emp_id': 'EMP-001',
                        'designation': 'System Administrator',
                        'dept': hq_dept
                    },
                    {
                        'username': 'manager',
                        'email': 'manager@assetflow.example.com',
                        'first_name': 'Elizabeth',
                        'last_name': 'Schuyler',
                        'role': User.Roles.ASSET_MANAGER,
                        'emp_id': 'EMP-002',
                        'designation': 'Global Asset Manager',
                        'dept': hq_dept
                    },
                    {
                        'username': 'head',
                        'email': 'head@assetflow.example.com',
                        'first_name': 'Thomas',
                        'last_name': 'Jefferson',
                        'role': User.Roles.DEPARTMENT_HEAD,
                        'emp_id': 'EMP-003',
                        'designation': 'Director of Engineering',
                        'dept': eng_dept
                    },
                    {
                        'username': 'employee',
                        'email': 'employee@assetflow.example.com',
                        'first_name': 'John',
                        'last_name': 'Laurens',
                        'role': User.Roles.EMPLOYEE,
                        'emp_id': 'EMP-004',
                        'designation': 'Junior Developer',
                        'dept': eng_dept
                    }
                ]

                for u_data in users_payload:
                    user_exists = User.objects.all_with_deleted().filter(username=u_data['username']).first()
                    if not user_exists:
                        # Create User
                        user = User.objects.create_user(
                            username=u_data['username'],
                            email=u_data['email'],
                            password='password123',
                            first_name=u_data['first_name'],
                            last_name=u_data['last_name'],
                            role=u_data['role']
                        )
                        
                        # Create Employee profile
                        emp = Employee.objects.create(
                            user=user,
                            employee_id=u_data['emp_id'],
                            department=u_data['dept'],
                            designation=u_data['designation'],
                            status=Employee.Statuses.ACTIVE
                        )
                        self.stdout.write(f"Created user: {user.username} & profile: {emp.employee_id}")
                    else:
                        self.stdout.write(f"User {u_data['username']} already exists. Skipping create.")

                # Set Department Head to manage Engineering Department
                head_user = User.objects.filter(username='head').first()
                if head_user:
                    eng_dept.manager = head_user
                    eng_dept.save(update_fields=['manager'])
                    self.stdout.write('Linked Department Head user as Engineering manager.')

            self.stdout.write(self.style.SUCCESS('Database seed completed successfully.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Database seed failed: {str(e)}"))
            raise e
