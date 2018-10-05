<template>
  <div class="row">
    <div class="col-md-12 d-flex">
      <vuestic-pre-loader v-show="isLoading" class="pre-loader"></vuestic-pre-loader>
      <vuestic-widget :headerText="'Payment Update'" class="chat-widget">
        <Payment ref="updatePayment"></Payment>
        <br />
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3  d-flex justify-center-center">
            <button class="btn btn-primary" @click="handleUpdate">
              Update
            </button>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Payment from '../auth/signup/steps/Step3'
import Proxy from '@/proxies/Proxy'

export default {
  name: 'payment',
  components: {
    Payment
  },
  data () {
    return {
      me: this.$store.getters['account/myself'],
      isLoading: false
    }
  },
  methods: {
    async handleUpdate () {
      const that = this.$refs.updatePayment

      Object.keys(that.formFields).map(field => {
        that.validateFormField(field)
      })
      const validOk = Object.keys(that.formFields).every(field => {
        return that.isFormFieldValid(field)
      })

      try {
        if (validOk) {
          this.isLoading = true
          const stripeToken = await that.completedData()
          const { stripePaymentToken } = stripeToken
          if (stripePaymentToken) {
            await this.updateApi(stripeToken)
          } else {
            this.isLoading = false
          }
        }
      } catch (err) {
        console.log('extra error')
      }
    },
    async updateApi (value) {
      const { userId, accessToken } = this.me
      try {
        const { error } = await new Proxy('updatePayment.php?', {
          userId,
          accessToken,
          stripePaymentToken: value
        }).submit('post')
        if (error) {
          this.$store.dispatch('auth/notification', {
            type: 'ERROR',
            title: 'SERVER ERROR',
            message: 'Oops, Please try again later.'
          })
        } else {
          await this.$store.dispatch('account/me', {
            userId,
            accessToken
          })
          this.$store.dispatch('auth/notification', {
            type: 'SUCCESS',
            title: 'UPDATE SUCCESS',
            message: 'Payment updated successfully.'
          })
        }
      } catch (error) {
        this.$store.dispatch('auth/notification', {
          type: 'ERROR',
          title: 'SERVER ERROR',
          message: 'Oops, Please try again later.'
        })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  .overview-tab {
    .explore-row {
      display: none !important;
    }
  }

  .maps-tab {
    height: 500px;
  }
}

.profile-card-widget,
.chat-widget {
  width: 100%;
  .widget-body {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      width: 100%;
    }
  }
}

.bottom-widgets {
  > div[class^='col'] {
    & > div {
      width: 100%;
    }
  }
}
</style>
