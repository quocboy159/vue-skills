> Do not publish the env/secret i.e. no hard code `.env`, `.env.production` etc. as they will be handled by the build pipelines

So these only .env file we need locally is `.env.local`. This file is gitignore and do not publish to the repo otherwise people will know your secrets!

Please create one and use these content to start if you dont know what values to use

```
VUE_APP_ROOT_API=https://localhost:44371/
VUE_APP_ROOT_AUTH_API=https://localhost:44382/
VUE_APP_ROOT_EXISTING_CRM=https://localhost:44388/
VUE_APP_RECAPTCHA_SITEKEY=6Ldfo7MUAAAAAMDtwhwv4yu4feJ9qFNasTaY6BZh
VUE_APP_PORTAL_SECRECTKEY=5FBD0509-7930-4D44-99F0-743FC433EB38
VUE_APP_SENTRY_DSN=https://6a452f06fba64f7abeb5fc7cf7bf9556@o481906.ingest.sentry.io/5531319
VUE_APP_ANALYTICS=UA-1538454-7
VUE_APP_AAD_CLIENT_ID=d1bf18f0-ccdd-4d0c-9bcf-b2edfdde74ad
VUE_APP_TARGET_CRM=2 // Sales CRM
VUE_APP_AAD_DOMAIN=skillsgroupdev.onmicrosoft.com
VUE_APP_B2C_AUTHORITY_DOMAIN=skillsgroupdev.b2clogin.com
VUE_APP_B2C_REDIRECT_URI=https://skillsgroup-ui-test.azurewebsites.net/skills-group/b2c-sign-in
VUE_APP_B2C_SKILLS_GROUP_PORTAL_SITE_CLIENT_ID=8a59a3f2-6c38-4ca3-85f7-f5c2fd0a86fd
VUE_APP_B2C_POST_LOG_OUT_REDIRECT_URI=/skills-group/dashboard
VUE_APP_B2C_SIGNUP_SIGNIN_POLICY_ID=B2C_1_SkillGroupPortalSigninSignup
VUE_APP_B2C_PASSWORD_RESET_POLICY_ID=B2C_1_SkillGroupPortalPasswordReset
VUE_APP_B2C_SKILLS_GROUP_PORTAL_API=api
VUE_APP_IDLE_TIMEOUT_IN_MINUTE=2
VUE_APP_APPLICATION_DRIVE_NAME=Application
VUE_APP_CONTACT_DRIVE_NAME=Contact
VUE_APP_SUPPORTED_FILE_TYPES=".pdf, .png, .jpg, .jpeg"
VUE_APP_MAX_FILE_SIZE_UPLOADMB=10
VUE_APP_MAX_REQUEST_BODY_SIZE_MB=30
VUE_APP_MARKETING_SITE=https://skills.org.nz/skills-recognition/plumbing-gasfitting-drainlaying/
```
