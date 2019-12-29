<template>
  <mu-container class="MuContainer">
    <mu-flex justify-content="center">
      <mu-paper :z-depth="1">
        <mu-grid-list class="gridlist-demo" :cols="2">
          <mu-grid-tile v-for="tile,index in imgsArr" :key="index" @click="clickPic(tile.img_name)">
            <img :src="tile.src">
            <span slot="title" class="gameTitle">{{tile.wordSubject}}</span>
          </mu-grid-tile>
        </mu-grid-list>
      </mu-paper>
    </mu-flex>
  </mu-container>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import EditGame from './EditGame'
  import store from '../store.js'

  export default {
    name: 'Game',
    data() {
      return {
        editImgSrc: '',
        imgLoc: `static/img/Game/`,
        imgsArr: [],
        group: 0,
        canEditGame: false,
      }
    },
    components: {
      vueWaterfallEasy
    },

    methods: {
      onFileChange(event) {
        this.editImgSrc = event.target.files[0].name;
        console.log(this.editImgSrc);
        store.state.editImgSrc = this.editImgSrc;
        this.$router.push('editGame');
      },
      getData() {//从后端拉取数据
        const path = '/game';
        this.$axios.get(path)
          .then(response => {
            console.log(response);
            var arr = [];
            for (var i = 0; i < response.data.length; i++) {
              arr.push({
                  src: this.imgLoc + response.data[i]['EN'] + '.jpg',
                  wordSubject: response.data[i]['word_subject'],
                  img_name: response.data[i]['EN']
                }
              )
            }
            this.imgsArr = this.imgsArr.concat(arr);
            this.group++;
            console.log(this.imgsArr);
          })
      },
      clickPic(imgName) {
        this.$router.push('game/' + imgName);
      }
    },

    created() {
      this.getData();
      if (store.state.username == 'root') {
        store.state.authority = true;
      }
      this.canEditGame = store.state.authority;
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
    width: 100%;
    margin-left: 0px;
  }

  .mu-grid-tile-wrapper {
    box-shadow: none;
  }

  .MuContainer {
    margin-bottom: 56px;
  }

  .mu-grid-tile-title-container {
    margin-left: 0px;
    text-align: center;
  }

  .gameTitle {
    font-size: 20px;
  }
</style>



