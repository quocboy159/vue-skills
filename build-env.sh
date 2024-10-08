#!/bin/bash

cat > .env <<EOF
VUE_APP_ROOT_API=$ROOT_API
VUE_APP_ROOT_CRM_API=$ROOT_API
VUE_APP_ROOT_AUTH_API=$ROOT_AUTH
VUE_APP_ROOT_EXISTING_CRM=$PORTAL_URL
VUE_APP_RECAPTCHA_SITEKEY=$RECAPTCHA_SITEKEY
VUE_APP_PORTAL_SECRECTKEY=$PORTAL_SECRET
VUE_APP_AAD_CLIENT_ID=$AAD_CLIENT_ID
VUE_APP_SENTRY_DSN=@SENTRY_DSN
VUE_APP_ANALYTICS=@ANALYTICS
EOF
