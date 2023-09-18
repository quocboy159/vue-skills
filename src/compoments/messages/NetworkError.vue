<template>
  <failure-message
    ref="errorMessageRef"
    borderClass="q-pb-lg"
    :message="message"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import FailureMessage from './FailureMessage.vue'
import { CHOOSE_USERNAME_NAME } from '../../common/constants.js'

export default {
  name: 'NetworkError',

  props: {
    pageName: {
      type: String,
      required: false,
      default: 'My Skills',
    },
  },

  components: {
    FailureMessage,
  },

  data() {
    return {
      message: `${this.pageName} is unavailable, please try again later.`,
    }
  },

  computed: {
    ...mapGetters(['applicationError']),
    ...mapGetters('skills-group-contact', ['isSetContactCRMFail']),
  },

  watch: {
    isSetContactCRMFail: {
      handler(data) {
        if (data) {
          this.$refs.errorMessageRef.onOpenMessage()
        } else {
          this.$refs.errorMessageRef.onCloseMessage()
        }
      },
    },

    applicationError(error) {
      // for put/post or noShowNetworkError methods, we have internal form's error message, so don't show this
      if (
        ['post', 'put'].includes(error.config?.method?.toLowerCase()) ||
        error.config?.headers?.noShowNetworkError
      ) {
        return
      }

      if (error.StatusCode || error.message) {
        if (this.$router.history.current.name === CHOOSE_USERNAME_NAME) {
          this.message =
            'There is a problem with your My Skills account. Please contact Skills on 0508 SKILLS (0508 754 557) or email us at <a href="mailto:support@skills.org.nz">support@skills.org.nz</a>'
        }

        this.$refs.errorMessageRef.onOpenMessage()
      } else {
        this.$refs.errorMessageRef.onCloseMessage()
      }
    },
  },
}
</script>
