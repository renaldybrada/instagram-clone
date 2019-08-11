<template>
    <div class="post-page">
        <div class="columns">
            <div class="column is-4">
                <div class="post-media post-media__owner">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                            <img class="is-rounded" :src="data.owner.profile_pic_url" alt="">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="is-size-6">
                                <strong>{{data.owner.username}}</strong>
                                <span class="is-size-6" v-if="data.location !== null">
                                    <br>
                                    at <strong>{{data.location.name}}</strong>
                                </span>
                            </p>
                            <p class="is-size-6" v-if="data.caption !== null">
                                {{data.caption}}
                            </p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="post-media post-media__statisctics">
                    <p class="is-pulled-right">
                        <strong>{{data.liked_count}}</strong> Likes | <strong>{{data.comments_count}}</strong> Comments
                        <br>
                        <span class="is-pulled-right">
                            {{data.created_at | dateFromNow}}
                        </span>
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="main-media" v-on:click="expandImage">
                    <figure class="image">
                        <img class="main-media__image" :src="data.display_url" alt="">
                    </figure>
                </div>
            </div>
            <div class="column is-3">
                <div class="post-media post-media__comments">
                    <div class="media" v-bind:key="comment.id" v-for="comment in data.comments">
                        <div class="media-left">
                            <figure class="image is-32x32">
                                <img class="is-rounded" :src="comment.owner.profile_pic_url" alt="">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="is-size-6">
                                <strong>{{comment.owner.username}}</strong>
                            </p>
                            <p class="is-size-6">
                                {{comment.text}}
                                <br>
                                <span class="is-pulled-right">
                                    {{data.created_at | dateFromNow}}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" v-bind:class="{ 'is-active': imageIsExpanded }">
            <div class="modal-background" v-on:click="expandImage"></div>
            <div class="modal-content">
                <p class="image">
                    <img class="expanded-image" :src="data.display_url" alt="">
                </p>
            </div>
            <button class="modal-close is-large" aria-label="close" v-on:click="expandImage"></button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data(){
        return{
            data: null,
            imageIsExpanded: false
        }
    },
    methods: {
        getMediaByShortcode(){
            // this.isLoading.hashtag = true

            const uri = 'media/'+ this.$route.params.shortcode
            this.$http.get(uri, {
                params: {formated:true}
            }).then((response) => {
                this.data = response.data
                // this.isLoading.hashtag = false
            }).catch((e) => {
                this.error.message = e
                // this.isLoading.hashtag = false
            })
        },
        expandImage(){
            if(this.imageIsExpanded){
                this.imageIsExpanded = false
            }else{
                this.imageIsExpanded = true
            }
        }
    },
    created() {
        this.getMediaByShortcode();
    },
    filters: {
        dateFromNow: function(value) {
            if (value) {
                return moment(value*1000).fromNow()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.post-media{
    overflow-y: auto;
    overflow-x: hidden;

    &__owner{
        height: 60vh;
    }

    &__comments{
        height: 80vh;
    }
}

.main-media{
    &__image{
        width: auto;
        max-height: 80vh;
        border-radius: 10px;
        cursor: pointer;
    }
}

.expanded-image{
    width: auto;
    max-height: 90vh;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>
