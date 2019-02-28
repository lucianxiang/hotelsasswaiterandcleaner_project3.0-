<template>
  <uploader :options="options" :file-status-text="statusText" class="uploader-example" ref="uploader"
            @file-success="fileSuccess"  @file-added="add" v-if="clearShow"  @files-added="adds" >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>上传文件</p>
      <uploader-btn>点击上传</uploader-btn>
      <uploader-btn v-show="attrs.accept== 'image/*'">选中替换</uploader-btn>
      <!--<uploader-btn :attrs="attrs">select images</uploader-btn>-->
      <!--<uploader-btn :directory="true">select folder</uploader-btn>-->
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'

  export default {
    name: '',
    props: ['attrs','index','i'],
    data() {
      return {
        clearShow:true,
        options: {
          // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
          target: getNewStr + '/OSSFile/PostToService',
          fileParameterName: 'file',
          testChunks: false,
          autoStart:false,
          allowDuplicateUploads:true
        },
//        categoryMap:{image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],},
//        attrs: {
//          accept: 'video/*'
//        },
        statusText: {
          success: '上传成功',
          error: '上传出错',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        }
      }
    },
//    created(){
//      this.options.categoryMap = this.categoryMap
//    },
    computed: {},
    methods: {
      adds(files, fileList){
        if(files.length>21){
          files.ignored = true
          this.$notify({
            message: '图片个数不能超过21张!',
            type: 'error'
          });
        }
      },
      add(file){
        let type = this.attrs.accept.split('/')[0];
        let fileType = file.fileType.split('/')[0];
        if(type!==fileType){
          switch (type){
            case 'video':
              alert("请上传视频格式的文件!")
              break;
            case 'audio':
              alert("请上传音频格式的文件!")
              break;
            default:
              alert("请上传图片格式的文件!")
              break;
          }
          file.ignored = true
          return
        }
        let size = file.size/1024;
        switch (type){
          case 'video':
            if(size>600000){
              alert("上传的视频不能大于600M!")
              file.ignored = true
              this.$emit('getFile',file);
              return
            }
            break;
          case 'audio':
            if(size>10000){
              alert("上传的音频不能大于10M!")
              file.ignored = true
              return
            }
            break;
          default:
            if(size>2000){
              alert("上传的图片不能大于2M!")
              file.ignored = true
              return
            }
            break;
        }
      },

      //上传成功的事件
      fileSuccess (rootFile, file, message, chunk) {
        this.clearShow = true
        var obj = JSON.parse(message)
        obj.index = this.index;
        obj.i = this.i;
        let files = document.querySelectorAll('input[type=file]')[0]
        console.log(files.value)

        this.$emit('getData',obj);
      },
    },
    mounted() {
      // 获取uploader对象
      this.$nextTick(() => {
        window.uploader = this.$refs.uploader.uploader
      })
    }
  }
</script>
<style scoped>
  .uploader-example {
    /*width: 580px;*/
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
