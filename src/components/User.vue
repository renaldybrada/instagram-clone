<template>
    <div class="user-page">
        <div class="columns">
            <div class="column">
                <div class="biography">
                    <figure class="image is-128x128 biography__profpic">
                        <img class="is-rounded" :src="data.profile_pic" alt="">
                    </figure>
                    <div class="biography__bio">
                        <p class="is-size-4 biography__username"><strong>{{data.username}}</strong></p>
                        <ul class="biography__statistics">
                            <li><p class="is-size-6"><strong>{{data.posts_count | toKilo}}</strong> Posts</p></li>
                            <li><p class="is-size-6"><strong>{{data.followers_count | toKilo}}</strong> Followers</p></li>
                            <li><p class="is-size-6"><strong>{{data.following_count | toKilo}}</strong> Following</p></li>    
                        </ul>
                        <p class="is-size-6">{{data.full_name}}</p>
                        <p class="is-size-6">{{data.biography}}</p>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="user-gallery">
                    <div class="user-gallery__media" v-bind:key="media.id" v-for="media in data.timeline_media">
                        <router-link :to="{ name: 'post', params: { shortcode: media.shortcode }}">
                            <img class="user-gallery__thumbnail" :src="media.thumbnail_url" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data: null,
            loading: {
                isLoading: false,
                isFullPage: true
            }
        }
    },
    methods: {
        getUserPage(){
            this.loading.isLoading = true

            const uri = 'username/'+ this.$route.params.username
            this.$http.get(uri, {
                params: {formated:true}
            }).then((response) => {
                this.data = response.data
                this.loading.isLoading = false
            }).catch((e) => {
                this.error.message = e
                this.loading.isLoading = false
            })
        }
    },
    created(){
        this.getUserPage()
    },
    filters: {
        toKilo: function(value) {
            let divided = value/1000;
            if(divided > 1){
                return Math.floor(divided)+"K"
            }else{
                return value
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .biography{
        position: relative;
        padding: 1rem;

        &__profpic{
            display: inline-block;
        }

        &__bio{
            position: absolute;
            top: 0;
            display: inline-block;
            margin-left: 2rem;
        }

        &__statistics{
            margin: 1rem 0 1rem 0;

            & li{
                display: inline-block;

                &:not(last-child){
                    margin-right: 2rem;
                }
            }
        }

       @media only screen and (max-width: 600px) {
            &__profpic{
                margin-left: 50%;
                transform: translateX(-50%);
            }

            &__bio{
                position: relative;
                width: 100%;
                margin: 0;
                text-align: center;
            }

            &__statistics{
                & li{
                display: inline-block;

                &:not(last-child){
                    margin-right: .5rem;
                }
            }
            }

        }
    }

    .user-gallery{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        
        &__media {
            width: 10.5rem;
        }
    }
</style>