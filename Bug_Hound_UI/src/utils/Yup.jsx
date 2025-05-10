import * as yup from 'yup';

export const LoginForm=yup.object({
    email:yup.string().email('Invalid Email').required('Email is required'),
    password:yup.string().required('Password is required')
}).required()

export const SignUpFom=yup.object({
    name:yup.string().required('Name is required'),
    email:yup.string().email("Invalid email").required('Email is required'),
    password:yup.string().min(8,"Minimum 8 char required").required('Password is required'),
    role:yup.string().oneOf(['Developer','Tester','ProjectManager'],'Invalid Role value') .required("Role is required"),
    profile:yup.string().required('Image required')
}).required()

export const BugFormValidation = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    priority: yup.string().required("Priority is required"),
    assignedTo: yup.string().required("Assigned user is required"),
    screenshot: yup.mixed().required("Screenshot is required"),
  }).required()

  export const BugUpdateValidation=yup.object({
    status:yup.string().required("Status is required")
  })

 export const CommentValidation = yup.object({
  bugId: yup.string().required("Bug id is required"),
  to: yup.string().required("User detail is required"),
  content: yup.string().required("Content is required")
}).required();