<template>
  <div class="row dashboard-info-widgets">
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="stats">
            <h1 class="stats-number">
              <!-- <i class="ion ion-md-arrow-up text-primary stats-icon"></i> -->
              49
            </h1>
            <div class="stats-title">Active Users</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <div>
                <i class="fa fa-unsorted"></i>
              </div>
              3,800
            </div>
            <div class="stats-title">Avg/Steps Today</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="info-widget-inner has-chart">
            <div class="stats">
              <div class="stats-number">
                $1,900
              </div>
              <div class="stats-title">Spent this month</div>
            </div>
            <div class="chart-container">
              <vuestic-progress-bar type="circle" :value="70" theme="Gray" backgroundTheme="Primary" />
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-primary">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <!-- <i class="ion ion-md-people stats-icon icon-wide"></i> -->
              56
            </div>
            <div class="stats-title">Classes this month</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard-info-widgets'
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
    justify-content: space-between;
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

.fa-line-chart {

}
</style>
