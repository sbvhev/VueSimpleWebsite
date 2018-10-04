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
            // manual validation occur
            const that = this.$refs.registerStepOne
            Object.keys(that.formFields).map(field => {
              that.validateFormField(field)
            })
          },
          isValid: () => {
            // validation check
            const that = this.$refs.registerStepOne
            const validOk = Object.keys(that.formFields).every(field => {
              return that.isFormFieldValid(field)
            })

            // integration step's data
            validOk && this.mergePartialModels(that.completedData())
            return validOk
          }
        },
        {
          label: 'Employee Stipend',
          slot: 'page2',
          isValid: () => {
            // integration step's data
            const that = this.$refs.registerStepTwo
            this.mergePartialModels(that.completedData())
            return true
          }
        },
        {
          label: 'Credit Card',
          slot: 'page3',
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
      finalModel: []
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
    },
    mergePartialModels (model) {
      this.finalModel = Object.assign({}, this.finalModel, model)
    },
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
