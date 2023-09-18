<template>
  <div class="v-suggestions">
    <q-input
      debounce="500"
      v-bind="$attrs"
      v-on="$listeners"
      @keydown="onKeyDown"
      @blur="onBlur"
      @focus="showItems = true"
      v-model="query"
    />
    <div class="suggestions">
      <ul class="items" v-show="items.length > 0 && showItems === true">
        <li
          class="item"
          :key="index"
          v-for="(item, index) in items"
          @click.prevent="selectItem(index)"
          v-bind:class="{ 'is-active': index === activeItemIndex }"
        >
          <slot name="item" :item="item">
            {{ item }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AddressCheckerApi from '../apis/addressCheckerApi.js'

export default {
  name: 'SkillsSuggestionsAddress',

  props: {
    onItemSelected: {
      type: Function,
    },
    value: {
      type: String,
    },
    isSkillsGroupPortal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      originalValue: this.value,
      query: this.value ?? '',
      lastSetQuery: null,
      items: [],
      activeItemIndex: -1,
      showItems: false,
      hasSelected: false,
    }
  },

  watch: {
    query(newValue) {
      if (newValue === this.lastSetQuery) {
        this.lastSetQuery = null
        return
      }
      this.onQueryChanged(newValue)
      this.$emit('input', newValue)
    },

    value(newValue, oldValue) {
      if (oldValue === null || oldValue === undefined) {
        this.originalValue = newValue
      }
      this.setInputQuery(newValue)
    },
  },

  methods: {
    onBlur() {
      setTimeout(() => {
        if (
          !this.query ||
          (!this.hasSelected && this.originalValue !== this.query)
        ) {
          this.originalValue = ''
          this.onItemSelected({
            street: '',
            suburb: '',
            city: '',
            postCode: '',
          })
        }
        this.hideItems()
      }, 100)
    },

    onItemSelectedDefault(item) {
      if (typeof item === 'string') {
        this.$emit('input', item)
        this.setInputQuery(item)
        this.showItems = false
      }
    },

    hideItems() {
      setTimeout(() => {
        this.showItems = false
        this.hasSelected = false
        this.items = []
      }, 300)
    },

    showResults() {
      this.showItems = true
    },

    setInputQuery(value) {
      this.lastSetQuery = value
      this.query = value
    },

    onKeyDown(e) {
      this.$emit('keyDown', e.keyCode)
      switch (e.keyCode) {
        case 40:
          this.highlightItem('down')
          e.preventDefault()
          break
        case 38:
          this.highlightItem('up')
          e.preventDefault()
          break
        case 13:
          this.selectItem()
          e.preventDefault()
          break
        case 27:
          this.showItems = false
          e.preventDefault()
          break
        default:
          return true
      }
    },

    selectItem(index) {
      let item = null
      if (typeof index === 'undefined') {
        if (this.activeItemIndex === -1) {
          return
        }
        item = this.items[this.activeItemIndex]
      } else {
        item = this.items[index]
      }
      if (!item) {
        return
      }

      this.hasSelected = true

      if (this.onItemSelected) {
        const address = this.splitAddress(item)
        this.originalValue = address.street
        this.onItemSelected(address)
      } else {
        this.onItemSelectedDefault(item)
      }
      this.hideItems()
    },

    splitAddress(item) {
      // address 1 example: 123 Puriri Park Road, Maunu, Whangarei 0110
      // address 2 example: 123 Bank Street, Whangarei 0110
      const items = item.split(',')
      let street, suburb, city, postCode

      if (items.length === 3) {
        street = items[0]
        suburb = items[1].trim()
        const { cityValue, postCodeValue } = this.getCityAndPostCode(items[2])
        city = cityValue
        postCode = postCodeValue
      } else {
        street = items[0]
        suburb = ''
        const { cityValue, postCodeValue } = this.getCityAndPostCode(items[1])
        city = cityValue
        postCode = postCodeValue
      }

      return { street, suburb, city, postCode }
    },

    getCityAndPostCode(text) {
      text = text.trim()
      const postCodeValue = text.substring(text.length - 4).trim()
      const cityValue = text.substring(0, text.length - 5).trim()

      return { cityValue, postCodeValue }
    },

    highlightItem(direction) {
      if (!this.items.length) {
        return
      }

      let selectedIndex = this.items.findIndex((item, index) => {
        return index === this.activeItemIndex
      })

      if (selectedIndex === -1) {
        // nothing selected
        if (direction === 'down') {
          selectedIndex = 0
        } else {
          selectedIndex = this.items.length - 1
        }
      } else {
        this.activeIndexItem = 0
        if (direction === 'down') {
          selectedIndex++
          if (selectedIndex === this.items.length) {
            selectedIndex = 0
          }
        } else {
          selectedIndex--
          if (selectedIndex < 0) {
            selectedIndex = this.items.length - 1
          }
        }
      }
      this.activeItemIndex = selectedIndex
    },

    setItems(items) {
      this.items = items
      this.activeItemIndex = -1
      this.showItems = true
    },

    async getAddresses(value) {
      if (!value?.trim()) {
        return []
      }

      const data = await AddressCheckerApi.getAddresses(
        value.trim(),
        this.isSkillsGroupPortal
      )
      const result = data.data.map((x) => {
        return x.fullAddress
      })
      return result
    },

    async onQueryChanged(value) {
      const result = await this.getAddresses(value)
      this.setItems(result)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-suggestions {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.v-suggestions .suggestions {
  position: absolute;
  left: 0;
  top: 36px;
  width: 100%;
  z-index: 100;
  background: #ffffff;
}

.v-suggestions .items {
  list-style: none;
  border: 1px solid #eee;
  margin: 0;
  padding: 0;
  border-width: 0 1px 1px 1px;
}

.v-suggestions .item {
  border-bottom: 1px solid #eee;
  padding: 0.4rem;
}

.v-suggestions .items .item.is-active,
.v-suggestions .items .item:hover {
  background: #eee;
  cursor: pointer;
}

.v-suggestions-input {
  -webkit-appearance: none;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  max-width: 100%;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.v-suggestions-input:focus,
.v-suggestions-input:active {
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  outline: none;
}
</style>
