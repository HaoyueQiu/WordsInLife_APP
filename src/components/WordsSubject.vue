<template>
  <mu-container class="MuContainer">
    <mu-flex justify-content="center">
      <mu-paper :z-depth="1">
        <mu-grid-list class="gridlist-demo">
          <mu-grid-tile v-for="tile,index in imgsArr" :key="index" @click="clickPic(tile.wordSubject)">
            <img :src="tile.src" >
            <span slot="title">{{tile.wordSubject}}</span>
            <span slot="subTitle">{{tile.complete_ratio}}%</span>
          </mu-grid-tile>
        </mu-grid-list>
      </mu-paper>
    </mu-flex>
  </mu-container>
</template>

<script>
  import store from '../store.js'

  export default {
    name: 'WordsSubject',
    data() {
      return {
        imgLoc: `static/img/wordsSubject/`,
        imgsArr: [],
      }
    },
    methods: {
      getData() {//从后端拉取数据
        const path = '/wordSubject';
        this.$axios.get(path, {
          params: {
            username: store.state.username
          }
        })
          .then(response => {
            console.log('response', response);
            var arr = [];
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
              arr.push({
                  src: this.imgLoc + response.data[i]['wordsubject'] + '/' + `${response.data[i]['wordsubject']}.jpg`,
                  wordSubject: response.data[i]['wordsubject'],
                  complete_ratio: response.data[i]['complete_ratio']
                }
              );
            }
            this.imgsArr = this.imgsArr.concat(arr);
            console.log(this.imgsArr);
          })
      },
      clickPic(wordsubject) {
        this.$router.push('WordsSubject/' + wordsubject)
      }
    },

    created() {
      this.getData()
    }
  }
</script>


<style>
  .gridlist-demo {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .mu-grid-tile-titlebar {
    height: 48px !important;
  }

  .mu-paper-round {
    width:100%;
    margin-left: 0px;
    margin-right: 0px;
  }

  .MuContainer{
    margin-bottom: 56px;
  }
</style>



