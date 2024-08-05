export enum SignupLoginEnum {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN'
}

export enum LoggedOutRoutesEnum {
  HOME = '/',
  CREATE_USER = '/create-user',
  FORGET_PASSWORD = '/forget-password',
  DEFAULT = '/*'
}

export enum LoggedInRoutesEnum {
  HOME = '/',
  PROFILE = '/profile',
  SEARCH = '/search',
  CHAT = '/chat',
  DEFAULT = '/*'
}

export enum RedirectUrls {
  LEARN_MORE = 'https://www.facebook.com/help/instagram/261704639352628',
  TERMS = 'https://help.instagram.com/581066165581870/?locale=en_US',
  PRIVACY_POLICY = 'https://www.facebook.com/privacy/policy',
  COOKIES_POLICY = 'https://www.instagram.com/legal/cookies/'
}

export enum SignupLoginVariable {
  SIGNIN_MESSAGE = 'Sign up to see photos and videos from your friends.',
  GOOGLE_LOGIN = 'Log in with Google',
  DETAIL_MESSAGE = 'People who use our service may have uploaded your contact information to Igram. ',
  LEARN_MORE = 'Learn More',
  BY_SIGNUP = 'By signing up, you agree to our ',
  TERMS = 'Terms, ',
  PRIVACY_POLICY = ' Privacy Policy ',
  AND = 'and ',
  COOKIES_POLICY = 'Cookies Policy .',
  FORGET_PASSWORD = 'Forget password?',
  NO_ACCOUNT = "Don't have an account?",
  ACCOUNT = 'Have an account?',
  SIGNUP = 'Sign up',
  LOGIN = 'Log in',
  GET_APP = 'Get the app.'
}

export enum ForgetPasswordEnum {
  TROUBLE = 'Trouble logging in?',
  ENTER_DETAILS = "Enter your email, phone, or username and we'll send you a link to get back into your account.",
  CREATE = 'Create new account',
  BACK = 'Back to login',
  NO_USER = 'No users found',
  LINK_SENT = 'We sent an email to sainimanish255@gmail.com with a link to get back into your account.',
  LOGIN_LINK = 'Send login link',
  RESET_PASSWORD = 'Reset password'
}

export enum FormLabel {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  CONFIRM_PASSWORD = 'Confirm Password',
  PHONE_NUMBER = 'Phone Number'
}

export enum ImageUrl {
  APPLE_STORE = 'https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png',
  GOOGLE_PLAY = 'https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png'
}
