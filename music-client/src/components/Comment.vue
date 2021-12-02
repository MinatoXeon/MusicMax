
<template>
  
</template> 

 <script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'
import { HttpManager } from '../api/index'
import { ICON } from '../assets/icon/index'

export default {
  name: 'comment',
  mixins: [mixin],
  props: {
    playId: Number, // 歌曲ID或歌单ID
    type: Number // 歌单（1）/歌曲（0）
  },
  data () {
    return {
      commentList: [], // 存放评论内容
      userPic: [], // 保存评论用户头像
      userName: [], // 保存评论用户名字
      textarea: '', // 存放输入内容
      ZAN: ICON.ZAN
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'userId', // 用户ID
      'index', // 列表中的序号
      'loginIn', // 用户是否登录
      'avator' // 用户头像
    ])
  },
  watch: {
    id () {
      this.getComment()
    }
  },
  mounted () {
    this.getComment()
  },
  methods: {
    // 获取所有评论
    getComment () {
      HttpManager.getAllComment(this.type, this.playId)
        .then(res => {
          this.commentList = res
          for (let item of res) {
            this.getUsers(item.userId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取评论用户的昵称和头像
    getUsers (id) {
      HttpManager.getUserOfId(id)
        .then(res => {
          this.userPic.push(res[0].avator)
          this.userName.push(res[0].username)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交评论
    postComment () {
      if (this.loginIn) {
        // 0 代表歌曲， 1 代表歌单
        let params = new URLSearchParams()
        if (this.type === 1) {
          params.append('songListId', this.playId)
        } else if (this.type === 0) {
          params.append('songId', this.playId)
        }
        params.append('userId', this.userId)
        params.append('type', this.type)
        params.append('content', this.textarea)
        HttpManager.setComment(params)
          .then(res => {
            if (res.code === 1) {
              this.textarea = ''
              this.getComment()
              this.notify('评论成功', 'success')
            } else {
              this.notify('评论失败', 'error')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.notify('请先登录您的Music Max ID', 'warning')
      }
    },
    // 点赞
    postUp (id, up, index) {
      if (this.loginIn) {
        let params = new URLSearchParams()
        params.append('id', id)
        params.append('up', up + 1)
        HttpManager.setLike(params)
          .then(res => {
            if (res.code === 1) {
              this.$refs.up[index].children[0].style.color = '#2796dd'
              this.getComment()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.notify('请先登录您的Music Max ID', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/comment.scss';
 </style>
