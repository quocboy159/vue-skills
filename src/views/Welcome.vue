<template>
  <div class="row">
    <div class="col-sm-12 col-md-8 q-pl-lg">
      <div class="row">
        <div class="col-sm-12">
          <h1>Welcome to My Skills</h1>
          <p>
            My Skills is our hub for all personal, training and assessment
            information
          </p>
          <a class="btn btn-danger" v-on:click="toLogin">Login</a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4>Forgotten your Password?</h4>
          <a class="btn btn-default" href="#">Reset Password</a>
        </div>
      </div>

      <div class="row registration message hidemessage">
        <hr />
        <div class="col-md-12">
          <h4 class="message">MySkills Update</h4>
          <p>
            MySkills will be unavailable from 2:00 pm on Friday, February 8th
            until 7:00am on Monday February 11th.
          </p>
        </div>
      </div>

      <hr style="margin-block-start: 20px" />
      <div class="row registration">
        <div class="col-md-12">
          <h4 class="message">New Financial Services Candidate</h4>
          <p>
            If you are a new financial services candidate, register by clicking
            <a
              class="blue-link"
              href="https://portal.skills.org.nz/login/register"
            >
              here
            </a>
          </p>
        </div>
      </div>
      <hr style="margin-block-end: 20px" />
      <div class="row">
        <div class="col-md-12">
          <p>
            Please use Google Chrome or Microsoft Edge as you browser. IE may
            have issues with some aspects of this site.
          </p>
        </div>
      </div>
      <hr style="margin-block-end: 25px; margin-block-start: 15px" />
      <div class="row">
        <div class="col-md-12">
          <h3>Need Assistance?</h3>
          <h4 style="margin-block-start: 7px">
            Our customer services team are here to help
          </h4>
          <p>
            Call us on 0508 SKILLS (0508 754 557) or email us at
            <a class="blue-link" href="mailto:support@skills.org.nz">
              support@skills.org.nz
            </a>
          </p>
          <p>Our contact centre operating hours are:</p>
          <ul class="list-unstyled" style="margin-left: 20px">
            <li>Monday to Thursday: 7am to 7pm</li>
            <li>Friday: 7am to 5pm</li>
            <li>We're closed on Saturday, Sunday and public holidays</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Welcome',

  methods: {
    toLogin() {
      this.$router.push({
        name: 'sign-in',
        params: { label: this.$globalLabel },
        query: { redirectUrl: `/${this.$globalLabel}/choose-username` },
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
h3 {
    font-size : 24px;
    line-height : 27px;
    margin : 0;
}

hr {

    margin-top : 10px
}

a {
    text-decoration: none !important;
}

.btn-default {
    color: #333 !important;
    background-color: #fff !important;
    border-color: #ccc !important;
}

h4 {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.00735em;
    margin-bottom : 10px;
}

.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

.btn-danger {
    color: #fff !important;
    background-color: #d9534f;
    border-color: #d43f3a;
}

h1 {
    margin: 0;
    font-size: 36px;
    font-weight: 500;
    line-height: 40px;
}

.registration .message {
    color: red;
}

.hidemessage {
    display: none;
}
</style>
