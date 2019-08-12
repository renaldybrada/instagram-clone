<template>
  <div id="app">
    <Navigation></Navigation>

    <div class="container">
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './layouts/Navigation'

export default {
  components : {
    Navigation
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss">
a {
  color: black !important;

  &:hover{
    cursor: pointer;
    color: turquoise;
  }
}

.main-content{
  margin-top: 2rem;
}
</style>
