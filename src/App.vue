<template>
  <div id="app" v-bind:class="{'dark-mode':isDarkMode}">
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
import moment from 'moment'

export default {
  components : {
    Navigation
  },
  data(){
    return {
      isDarkMode : false
    }
  },
  mounted(){
    const accessTime = moment().hour()
    if (accessTime >= 18 || accessTime <= 5 ){
      this.isDarkMode = true
    }
  }
}
</script>

<style lang="scss">
//===== Dark Mode Style =====//
.dark-mode{
  $background-dark: #333;
  $font-color-dark: #5DBCD2;

  background-color: $background-dark;
  color: $font-color-dark;
  
  & a {
    color: $font-color-dark !important;
  }

  & strong,p {
    color: $font-color-dark;
  }

  & .navbar{
    background-color: $background-dark;

    & .navbar-menu{
      background-color: $background-dark;
    }

    & .title {
      color: $font-color-dark;
    }
  }

  & .card {
    background-color: $background-dark;
  }

  & .card{
    & .title{
      color: $font-color-dark;
    }
    
    & .subtitle{
      color: $font-color-dark;
    }
  }
}
//===== End Dark Mode Style =====//

a {
  color: inherit !important;

  &:hover{
    cursor: pointer;
    color: turquoise;
  }
}

.wrapped-text{
  word-wrap: break-word;
}

.main-content{
  margin-top: 2rem;
}
</style>
