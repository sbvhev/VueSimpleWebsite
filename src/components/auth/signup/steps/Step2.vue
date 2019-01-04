<template>
  <div class="row">
    <div class="col-md-12 plans">
      <fieldset>
        <h1><span class="badge badge-pill badge-success"></span>Monthly Employee Stipend</h1>
        <table>
          <tr>
            <td><vuestic-radio-button label="$250" :id="'radio1'" :value="'250'" :name="'radio'" v-model="planChoice" @input="onClickRadio"/></td>
            <td><vuestic-radio-button label="$150" :id="'radio2'" :value="'150'" :name="'radio'" v-model="planChoice" @input="onClickRadio"/></td>
          </tr>
          <tr>
            <td><vuestic-radio-button label="$50" :id="'radio3'" :value="'50'" :name="'radio'" v-model="planChoice" @input="onClickRadio"/></td>
            <td><vuestic-radio-button label="$25" :id="'radio4'" :value="'25'" :name="'radio'" v-model="planChoice" @input="onClickRadio"/></td>
          </tr>
          <tr>
            <td><vuestic-radio-button :id="'radio5'" :name="'radio'" :value="planChoice" :checked="isFocused"/><input id="'radio5'" placeholder="Custom" class="d-flex custom-plan" v-model="customPlanChoice" @focus="onCustomPlan" @onChanged="onCustomPlan" @keydown="onKeyDown"/></td>
            <td><vuestic-radio-button label="No stipend" :id="'radio6'" :value="'0'" :name="'radio'" v-model="planChoice" @input="onClickRadio"/></td>
          </tr>
        </table>
      </fieldset>
    </div>
  </div>
</template>

<script>

export default {
  name: 'step2',
  data () {
    return {
      planChoice: this.$store.getters['account/myself'].planChoice,
      isFocused: false,
      plans: [0, 25, 50, 150, 250],
      customPlanChoice: ''
    }
  },
  methods: {
    completedData () {
      return this.$data
    },
    onCustomPlan (e) {
      this.planChoice = e.target.value
      this.customPlanChoice = e.target.value
      this.isFocused = true
    },
    onClickRadio () {
      this.isFocused = false
    },
    onKeyDown (e) {
      if ((e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) && e.keyCode !== 46) {
        e.preventDefault()
      }
    }
  },
  watch: {
    isFocused (val) {
      if (val) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.badge {
  font-size: 1.225rem;
  letter-spacing: 0.125rem;
  margin: 21px;
}

.abc-radio {
  margin-bottom: 11.5%;
}

.custom-plan {
  position: absolute;
  left: 69px;
  top: 10px;
  width: 100px;
  line-height: 20px;
  border-width: 1px;
  @media only screen and (max-width: 768px) {
    left: 60px;
    top: 15px;
    width: 74px;
  }
}

.plans {
  h1 {
    text-align: center;
    margin-top: 3.25rem;
    margin-bottom: 4.25rem;
    @media only screen and (max-width: 768px) {
      font-size: 2rem;
    }
  }

  table {
    margin: auto;
    margin-top: 50px !important;
    margin-bottom: 50px !important;
  }

  tr {
    height: 60px;
  }

  td {
    width: 200px;
    position: relative;
  }
}
</style>
