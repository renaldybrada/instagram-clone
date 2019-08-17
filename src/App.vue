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
.dark-mode{
  $background-dark: #333;
  $font-color-dark: #eee;

  background-color: $background-dark;
  color: $font-color-dark;
  
  & > a {
    color: $font-color-dark !important;
  }

  & strong {
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

a {
  color: inherit !important;

  &:hover{
    cursor: pointer;
    color: turquoise;
  }
}

.main-content{
  margin-top: 2rem;
}
</style>
