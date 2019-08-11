<template>
    <div class="container">
        <b-navbar>
            <template slot="brand">
                <router-link :to="{ path: '/'}">
                <b-navbar-item>
                    <p class="title is-3">Instagram Clone</p>
                </b-navbar-item>
                </router-link>
            </template>
            <template slot="start">
                
            </template>

            <template slot="end">
                <div class="navbar-item search-box">
                    <input type="text" 
                        class="input is-rounded"
                        v-model="search_keyword"
                        v-on:keyup.enter="search"
                        placeholder="type natgeo, indonesia, etc">
                </div>
                <div class="navbar-item"></div>
                <div class="navbar-item">
                    Fork on Github
                </div>
            </template>
        </b-navbar>
    </div>
</template>

<style scoped>
.search-box {
    width: 100%;
}
</style>

<script>


export default {
    data() {
        return {
            search_keyword: '',
        }
    },
    methods: {
        search(){
            if(this.search_keyword == ''){
                this.$router.push({ path: '/' })
            }else{
                this.$router.push({ path: '/search', query: { keyword: this.search_keyword } })
            }
            this.search_keyword = ''
        }
    }
}
</script>