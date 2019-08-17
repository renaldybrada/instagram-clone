<template>
    <div class="home-page">
        <b-loading :active.sync="isLoading.hashtag" :is-full-page="isLoading.prop.isFullPage"></b-loading>
        <div class="search-keyword">
            <p class="search-keyword__title">#{{search_keyword}}</p>
        </div>
        
        <div class="search-result">
            <b-tabs 
                position="is-centered" 
                v-model="activeTab" 
                :expanded="tabProperty.expanded"
                :animated="tabProperty.animated"
                class="block">
                <b-tab-item class="main-container" label="Hashtags">
                    <div class="columns" v-if="data.hashtag.status == 'error'">
                        <div class="column">Media with specified hashtag not found</div>
                    </div>
                    <div v-else>
                        <p class="hashtag-subtitle">Top Posts</p>
                        <div class="columns is-multiline" v-if="data.hashtag">
                            <div class="column is-4" v-bind:key="item.id" v-for="item in data.hashtag.top_posts">
                                <router-link :to="{ name: 'post', params: { shortcode: item.shortcode }}">
                                <figure class="image media-item">
                                    <img class="media-item__image" :src="item.thumbnail_url" alt="">
                                    <div class="media-item__detail">
                                        <p>{{item.liked_count}}</p>
                                    </div>
                                    <i class="media-item__videoIcon large material-icons" v-if="item.is_video">videocam</i>
                                </figure>
                                </router-link>
                            </div>
                        </div>
                        <hr>
                        <p class="hashtag-subtitle">Recent Post</p>
                        <div class="columns is-multiline" v-if="data.hashtag">
                            <div class="column is-4" v-bind:key="item.id" v-for="item in data.hashtag.media_posts">
                                <router-link :to="{ name: 'post', params: { shortcode: item.shortcode }}">
                                <figure class="image media-item">
                                    <img class="media-item__image" :src="item.thumbnail_url" alt="">
                                    <div class="media-item__detail">
                                        <p>{{item.liked_count}}</p>
                                    </div>
                                    <i class="media-item__videoIcon large material-icons" v-if="item.is_video">videocam</i>
                                </figure>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </b-tab-item>
                <b-tab-item class="main-container" label="People">
                    <b-loading :active.sync="isLoading.people" :is-full-page="isLoading.prop.isFullPage"></b-loading>
                    <div class="card" v-bind:key="people.user.pk" v-for="people in data.people">
                        <router-link :to="{ name: 'user', params: { username: people.user.username }}">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                        <img class="is-rounded" :src="people.user.profile_pic_url" alt="">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">{{people.user.full_name}} <span class="subtitle is-6">@{{people.user.username}}</span></p>
                                        <p class="subtitle is-6">{{people.user.byline}}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </b-tab-item>
                <b-tab-item class="main-container" label="Location">
                    Coming soon
                </b-tab-item>
            </b-tabs>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 0,
            search_keyword : '',
            rand_default_keyword: [
                'natgeo', 'nationalgeographic', 'indonesia', 'ethnic', 'flower', 'adventure',
                'malang', 'bandung', 'instagram', 'nature', 'food', 'africa', 'santorini', 'italy',
                'forest', 'lake', 'beach'
            ],
            data: {
                hashtag   : {
                    status: ""
                },
                people    : null,
                location  : null
            },
            error: {
                message: ''
            },
            isLoading: {
                hashtag: false,
                people: false,
                location: false,
                prop: {
                    isFullPage: true
                }
            },
            tabProperty: {
                expanded: true,
                animated: false,
            }
        };
    },
    methods: {
        searchByHashtag () {
            this.isLoading.hashtag = true

            const uri = 'tags/'+ this.search_keyword
            this.$http.get(uri, {
                params: {formated:true}
            }).then((response) => {
                this.data.hashtag = response.data
                this.isLoading.hashtag = false
            }).catch((e) => {
                this.error.message = e
                this.isLoading.hashtag = false
            })
        },
        searchGeneral() {
            this.isLoading.hashtag = true
            this.isLoading.location = true

            const uri = 'search/'
            this.$http.get(uri, {
                params: {q:this.search_keyword}
            }).then((response) => {
                this.data.people = response.data.users
                this.data.location = response.data.places
                this.isLoading.hashtag = false
                this.isLoading.location = false
            }).catch((e) => {
                this.error.message = e
                this.isLoading.hashtag = false
                this.isLoading.location = false
            })
        }
    },
    created() {
        if(this.$route.query.keyword && this.$route.query.keyword != ''){
           this.search_keyword = this.$route.query.keyword 
        }else{
            this.search_keyword = this.rand_default_keyword[Math.floor(Math.random()*this.rand_default_keyword.length)];
        }
        this.searchByHashtag()
        this.searchGeneral()
    },
    watch: {
        '$route' () {
            this.data.hashtag = []
            if(this.$route.query.keyword && this.$route.query.keyword != ''){
                this.search_keyword = this.$route.query.keyword 
            }else{
                this.search_keyword = this.rand_default_keyword[Math.floor(Math.random()*this.rand_default_keyword.length)];
            }
            this.searchByHashtag()
            this.searchGeneral()
        }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

.search-keyword {
    &__title{
        text-align: center;
        font-weight: 500;
        font-size: 3rem;
    }

    @media only screen and (max-width: 600px) {
        &__title{
            font-size: 2rem;
        }
    }
}

.main-container{
    margin-top: 1.5rem;
    min-height: 72vh;
}

.hashtag-subtitle{
    text-align: center;
    font-weight: 600;
    font-size: 2.5rem;
    margin: 1rem 0 1rem 0;

    @media only screen and (max-width: 600px) {
        &{
            font-size: 1.5rem;
        }
    }
}

.search-result{
    margin-top: 1rem;
}

.main-container .card:not(:last-child){
    margin-bottom: 1rem;
}

.media-item {
    position: relative;

    &:hover &__image{
        transform: translate(-.3rem) scale(1.05);
        filter: grayscale(90%) blur(.1rem);
    }

    &:hover &__detail{
        opacity: 1;
    }

    &__image{
        border-radius: 5%;
        transition: all .2s;
    }
    
    &__videoIcon{
        position: absolute;
        top: .5rem;
        right: 1rem;
        color:white;
        font-size: 2rem;
    }

    &__detail{
        height: 100px;
        width: 100px;
        position: absolute;
        left: 50%;
        margin-left: -50px;
        top: 50%;
        margin-top: -50px;

        text-align: center;
        color: $red;
        font-size: 2rem;
        opacity: 0;

        transition: all .2s;
    }
}
</style>