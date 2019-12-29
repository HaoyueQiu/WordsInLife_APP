<template>
  <div>
    <div id="game_question">Where is the {{currentWord}}?</div>
    <mu-button id="answer_button" icon @click="clickMeaningButton">
      <mu-icon value="wb_sunny"></mu-icon>
    </mu-button>

    <mu-button id="comment_button" icon @click="errorModal = true">
      <mu-icon value="comment"></mu-icon>
    </mu-button>

    <mu-button id="home_button" icon @click="backHome">
      <mu-icon value="loop"></mu-icon>
    </mu-button>

    <audio :src="audioSrcSuccess" id="successAudio"></audio>
    <audio :src="audioSrcFail" id="failAudio"></audio>
    <p><img id="gameImg" :src="imgSrc" @click="testClick"/></p>
    <Modal
      width="280"
      v-model="errorModal"
      title="提交错误或建议"
      @on-ok="errorSubmit"
      @on-cancel="errorCancel"
      :styles="{top: '30px'}"
    >
      <p>用户名: {{username}}</p>
      <p>请输入你发觉的错误/想对本软件提出的修改建议 </p>
      <textarea id="TextareaError" rows="3" v-model="errorText"></textarea>
    </Modal>

  </div>
</template>

<script>
  import store from '../store'

  export default {
    name: 'GamePlay',
    data() {
      return {
        username: '',
        isAnswerButtonClick: false,
        words_loc: {},
        words: [],
        currentWord: '',
        currentWordCN: '',
        currentWordNum: 0,

        imgSrc: '',
        imgLoc: "static/img/Game/",
        game_img: null,

        audioSrcSuccess: 'static/audio/success.mp3',
        audioSrcFail: 'static/audio/fail.mp3',

        audioSuccess: null,
        audioFail: null,

        errorModal: false,

        errorText: '',
      }
    },
    components: {},

    created() {
      console.log('word game is created');
      const path = this.$route.path;
      this.game_img = path.substr(path.lastIndexOf('/') + 1);
      this.getData();
      this.imgSrc = this.imgLoc + "/" + this.game_img + ".jpg";
      this.username = store.state.username;

    },
    mounted() {
      this.audioSuccess = document.querySelector('#successAudio');
      this.audioFail = document.querySelector('#failAudio');
      console.log('audio', this.audioSuccess);
    },
    methods: {
      clickMeaningButton() {
        this.isAnswerButtonClick = true;
      },
      getData() {
        const path = '/game_word';
        this.$axios.get(path,
          {
            params: {
              game_img: this.game_img
            }
          })
          .then(response => {
            console.log(response.data);
            this.words_loc = response.data;
            for (let key in this.words_loc) {
              this.words.push(key);
            }
            console.log('game word list', this.words);
            this.isOver();
            this.currentWord = this.words[this.currentWordNum];
            console.log(this.currentWord)
          })

      },
      isOver() {
        console.log('this.currentWordNum', this.currentWordNum);
        if (this.currentWordNum >= this.words.length) {
          this.$router.push('/game')
        } else {
          this.currentWord = this.words[this.currentWordNum];
        }
      },
      testClick(e) {
        let picX = e.offsetX;
        let picY = e.offsetY;
        console.log(picX, picY);
        console.log(this.words_loc);
        let loc = this.words_loc[this.currentWord];
        console.log(loc);
        for (let i = 0; i < loc.length; ++i) {
          console.log(i);
          if (picX > loc[i][0] && picX < loc[i][2] && picY > loc[i][1] && picY < loc[i][3]) {
            this.currentWordNum++;
            this.audioSuccess.play();
            this.isOver();
            return;
          }
        }
        this.audioFail.play();
      },
      errorSubmit() {
        const path = '/findingError';
        const payload = {
          username: this.username,
          errorText: this.errorText,
        };
        this.$axios.post(path, payload)
          .then(response => {
            this.errorText = '';
            console.log(response);
          })
      },
      errorCancel() {
        this.errorText = '';
      },
      backHome() {
        this.$router.push('/game')
      }
    }
  }

</script>


<style scoped>
  #game_question {
    margin-left: 20px;
    font-size: 14px;
  }

  #answer_button {
    margin-left: 20px;
    height: 20px;
  }

  #comment_button {
    height: 20px;
  }

  #home_button {
    height: 20px;
  }

  #gameImg {
    margin-left: 0;
    margin-top: 0;
    width: 70vw;
  }

  #TextareaError {
    width: 100%;
  }

</style>


