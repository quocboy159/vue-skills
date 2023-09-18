<template>
  <div class="q-file-container">
    <fieldset>
      <q-file
        v-model="model"
        multiple
        use-chips
        append
        counter
        :accept="accept"
        :max-file-size="maxFileSizeInBytes"
        v-on="$listeners"
        v-bind="$attrs"
        @input="input"
        @rejected="handleRejected"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
        <q-tooltip v-if="tooltip && $q.platform.is.desktop">
          <span class="tooltip-text" v-html="tooltip"></span>
        </q-tooltip>
      </q-file>
      <div
        v-for="item in existingFileItems"
        :key="item.id"
        class="q-gutter-xs row"
      >
        <q-chip clickable v-if="$attrs.disable === true">
          <a class="btn-select" @click="onSelectedFile(item.id)">
            {{ item.name }}
          </a>
        </q-chip>

        <q-chip
          v-else
          clickable
          removable
          icon="file_present"
          @remove="onRemove(item.id)"
        >
          <a class="btn-select" @click="onSelectedFile(item.id)">
            {{ item.name }}
          </a>
        </q-chip>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {
  name: 'BaseMultipleUploadFile',
  props: {
    subfolder: {
      type: String,
      required: true,
    },
    existingFiles: {
      type: Array,
      required: false,
      default: () => [],
    },
    onChange: {
      type: Function,
      required: true,
    },
    onSelected: {
      type: Function,
      required: true,
    },
    accept: {
      type: String,
      default: '*/*',
    },
    maxFileSizeMB: {
      type: Number,
      default: 1024,
    },
    tooltip: {
      type: String,
    },
  },

  data() {
    return {
      model: null,
      deletedFileIds: [],
      existingFileItems: this.existingFiles ?? [],
    }
  },

  computed: {
    maxFileSizeInBytes() {
      return this.maxFileSizeMB * 1024 * 1024
    },
  },

  methods: {
    changeData() {
      const subfolder = this.subfolder
      const uploadFiles = []
      const deletedExistingFileIds = this.deletedFileIds ?? []

      this.model?.forEach((x) => {
        if (!uploadFiles.some((file) => file.name == x.name)) {
          uploadFiles.push(x)
        }
      })

      this.model = [...uploadFiles]

      this.onChange({ files: uploadFiles, subfolder, deletedExistingFileIds })
    },

    input() {
      this.changeData()
    },

    onSelectedFile(id) {
      this.onSelected(id)
    },

    onRemove(id) {
      this.deletedFileIds.push(id)
      this.existingFileItems = this.existingFileItems.filter(
        (x) => !this.deletedFileIds.includes(x.id)
      )
      this.changeData()
    },

    onClear() {
      this.deletedFileIds = []
      this.model = null
      this.existingFileItems = []
      this.existingFileItems = this.existingFiles
    },
    handleRejected(rejectedEntries) {
      if (rejectedEntries) {
        let invalidFileType = rejectedEntries.filter(
          (x) => x.failedPropValidation === 'accept'
        )
        let fileTypeErrorMsg = ''
        let invalidFileSize = rejectedEntries.filter(
          (x) => x.failedPropValidation === 'max-file-size'
        )
        let fileSizeErrorMsg = ''
        if (invalidFileType && invalidFileType.length > 0) {
          fileTypeErrorMsg = `<div>The following files are not accepted. Please upload files with the extension '${this.accept}' </div><ul>`
          invalidFileType.forEach((entry) => {
            fileTypeErrorMsg += `<li>${entry.file.name}</li>`
          })
          fileTypeErrorMsg += '</ul>'
        }

        if (invalidFileSize && invalidFileSize.length > 0) {
          fileSizeErrorMsg = `<div>The following files must not be greater than ${this.maxFileSizeMB} MB </div><ul>`
          invalidFileSize.forEach((entry) => {
            fileSizeErrorMsg += `<li>${entry.file.name}</li>`
          })
          fileSizeErrorMsg += '</ul>'
        }
        let errorMsg = `${fileTypeErrorMsg} ${fileSizeErrorMsg}`
        this.$notify.error({
          message: errorMsg,
          timeout: 10000,
          html: true,
          useWhiteBackground: true,
        })
      }
    },
  },
  watch: {
    existingFiles(newVal) {
      this.existingFileItems = newVal ?? []
    },
  },
}
</script>

<style lang="scss" scoped>
.q-file-container {
  margin: 15px 0 40px 0;
}

.tooltip-text {
  font-size: 16px;
}
</style>
