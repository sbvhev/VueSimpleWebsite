<template>
  <div v-if="isLoaded" class="row dashboard-info-widgets">
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="stats">
            <h1 class="stats-number pt-2">
              <!-- <i class="ion ion-md-arrow-up text-primary stats-icon"></i> -->
              {{ statsDatas[0]['value'] }}
            </h1>
            <div class="stats-title pb-3">{{ statsDatas[0]['description'] }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number pt-2">
              {{ statsDatas[1]['value'] }}
            </div>
            <div class="stats-title pb-3">{{ statsDatas[1]['description'] }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="info-widget-inner has-chart">
            <div class="stats">
              <div class="stats-number pt-2">
                {{ statsDatas[2]['value'] }}
              </div>
              <div class="stats-title pb-3">{{ statsDatas[2]['description'] }}</div>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number pt-2">
              <!-- <i class="ion ion-md-people stats-icon icon-wide"></i> -->
              {{ statsDatas[3]['value'] }}
            </div>
            <div class="stats-title pb-3">{{ statsDatas[3]['description'] }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Proxy from '@/proxies/Proxy'

export default {
  name: 'dashboard-info-widgets',
  created () {
    this.initalization()
  },
  data () {
    return {
      statsDatas: [],
      isLoaded: false
    }
  },
  methods: {
    async initalization () {
      const me = this.$store.getters['account/myself']
      try {
        const { userId, accessToken } = me
        const { error, stats } = await new Proxy('getStats.php?', {
          userId,
          accessToken
        }).submit('get')
        if (error) {
          this.statsDatas = []
        } else {
          this.statsDatas = stats
          this.isLoaded = true
        }
      } catch (error) {
        this.$store.dispatch('auth/notification', {
          type: 'ERROR',
          title: 'SERVER ERROR',
          message: 'Oops, Please try again later.'
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.stats-number,
.stats-title {
  line-height: 1;
}

.info-widget-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  &.has-chart {
    justify-content: center;
  }

  .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.stats-number {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 3.625rem;
  font-weight: bold !important;
  margin-bottom: 0.5rem;

  .stats-icon {
    font-size: 2.5625rem;
    position: absolute;
    top: 0.625rem;
    left: -1.85rem;

    &.icon-wide {
      left: -1.875rem;
    }
  }
}
</style>
