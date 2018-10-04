<template>
  <div class="form-wizard-page">
    <div class="row">
      <div class="col-md-12">
        <vuestic-wizard :steps="hsSteps">
          <div slot="page1" class="form-wizard-tab-content">
            <Step1 ref="registerStepOne"></Step1>
          </div>
          <div slot="page2" class="form-wizard-tab-content">
            <Step2 ref="registerStepTwo"></Step2>
          </div>
          <div slot="page3" class="form-wizard-tab-content">
            <Step3 ref="registerStepThree"></Step3>
          </div>
          <div slot="wizardCompleted" class="form-wizard-tab-content">
            <h4>{{'forms.wizard.completed' | translate}}</h4>
            <p>
              Zebras communicate with facial expressions and sounds. They make
              loud braying or barking sounds and
              soft snorting sounds. The position of their ears, how wide open
              their eyes are, and whether they show
              their teeth all send a signal. For example, ears flat back means
              trouble, or "you better follow orders!"
            </p>
          </div>
        </vuestic-wizard>
      </div>
    </div>
  </div>
</template>

<script>
import CountriesList from 'data/CountriesList'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

export default {
  name: 'signup',
  components: {
    Step1,
    Step2,
    Step3
  },
  computed: {
    hsSteps () {
      return [
        {
          label: 'Personal Details',
          slot: 'page1',
          onNext: () => {
            // this.$refs.registerStepOne.$validator.validateAll()
          },
          isValid: () => {
            return this.$refs.registerStepOne.validate()

            // return true
          }
        },
        {
          label: 'Employee Stipend',
          slot: 'page2',
          onNext: () => {
            // this.$refs.registerStepOne.$validator.validateAll()
          },
          isValid: () => {
            // return this.$refs.registerStepOne.$validator.validateAll()
            return true
          }
        },
        {
          label: 'Credit Card',
          slot: 'page3',
          onNext: () => {
            // this.$refs.registerStepOne.$validator.validateAll()
          },
          isValid: () => {
            // return this.$refs.registerStepOne.$validator.validateAll()
            return false
          }
        }
      ]
    }
  },
  data () {
    return {
      hsName: '',
      hsCountry: '',
      hrName: '',
      hrCountry: '',
      vrName: '',
      vrCountry: '',
      email: '',
      countriesList: CountriesList,
      chosenCountry: '',
      user: {
        userEmailAddress: '212@2.com',
        userPassword: 'password'
      },
      submitted: false,
      radioModel: 'option1',
      radioDisabledModel: 'option4',
      simpleOptions: [
        {
          id: 1,
          description: 'First option'
        },
        {
          id: 2,
          description: 'Second option'
        },
        {
          id: 3,
          description: 'Third option'
        }
      ],
      multiSelectModel: []
    }
  },
  methods: {
    isFormFieldValid (field) {
      let isValid = false
      if (this.formFields[field]) {
        isValid =
          this.formFields[field].validated && this.formFields[field].valid
      }
      return isValid
    },
    validateFormField (fieldName) {
      this.$validator.validate(fieldName, this[fieldName])
    }
  }
}
</script>

<style lang="scss" scoped>
.widget.simple-vertical-wizard-widget {
  .widget-body {
    padding: 0 $widget-padding;
    @include media-breakpoint-down(sm) {
      padding: $widget-padding 0;
    }
  }
}

.form-wizard-page {
  width: 100%;
  .form-group {
    min-width: 200px;
    width: 100%;
  }
}

.form-wizard-tab-content-text {
  width: 100%; // IE11 only
}

.register-step3-form {
  width: 100%;
  padding-top: 10.7%;
  padding-bottom: 11%;
}

</style>
