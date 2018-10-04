<template>
  <div class="login">
    <h2>{{'auth.welcome' | translate}}</h2>
    <form @submit.prevent="handleSubmit" name="login">
      <div class="form-group with-icon-right" :class="{'has-error': errors.has('email')}">
        <div class="input-group">
          <input
                        id="email"
                        name="email"
                        v-model="user.userEmailAddress"
                        v-validate="'required|email'"
                        required/>
          <label class="control-label" for="email">Email</label><i class="bar"></i>
          <small v-show="errors.has('email')" class="help text-danger">{{
            errors.first('email')
            }}
          </small>
        </div>
      </div>
      <div class="form-group with-icon-right">
        <div class=" input-group">
          <input
                        id="password"
                        name="password"
                        type="password"
                        v-model="user.userPassword"
                        required/>
          <label class="control-label" for="password">Password</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">
          {{'auth.login' | translate}}
        </button>
        <router-link class='link' :to="{name: 'signup'}">{{'auth.createAccount' | translate}}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        userEmailAddress: 'test@gurtz.me',
        userPassword: 'test'
      },
      submitted: false
    }
  },
  methods: {
    async handleSubmit (e) {
      this.submitted = true
      try {
        await this.$validator.validateAll() && this.$store.dispatch('auth/login', this.user)
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      .link {
        margin-top: 2rem;
      }
    }
  }

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }

  .form-group .bar.error::before {
    background: #e36049;
  }
}
</style>
