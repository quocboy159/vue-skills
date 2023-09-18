<template>
  <div>
    <div class="row" id="address" :class="LayoutParent">
      <div class="col">
        <div class="col-auto float-left" :class="LayoutChild1">
          <q-item-label class="">Address</q-item-label>
          <div class="">Address line 1 {{ addressLine1 }}</div>
          <div class="">Address line 2 {{ addressLine2 }}</div>
          <div class="">City {{ city }}</div>
          <div class="">Postal Code {{ postalCode }}</div>
          <div class="">Country {{ country }}</div>
        </div>
        <!--<div class="col-auto float-right btn-align-1" :class="LayoutChild1">
                        <q-btn @click="editMode = true" flat round icon="edit" color="primary" class="float-right" />
                    </div>-->
      </div>
    </div>

    <div class="row">
      <q-card flat class="col">
        <q-card-section>
          <div class="col-12">
            <div class="row">
              <div class="col">
                <q-item-label class="col" :class="LayoutChild1">
                  Address
                </q-item-label>
              </div>
            </div>
            <div class="row">
              <div class="col-auto float-left">
                <div class="col" :class="LayoutChild1">
                  <q-select
                    v-model="addressLine1"
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    :options="AddressLine1Options"
                    label="Address Line 1"
                  ></q-select>
                </div>
                <div class="col" :class="LayoutChild1">
                  <q-select
                    v-model="addressLine2"
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    :options="AddressLine2Options"
                    label="Address Line 2"
                  ></q-select>
                </div>
                <div class="col" :class="LayoutChild1">
                  <q-select
                    v-model="city"
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    :options="cityOptions"
                    label="City"
                  ></q-select>
                </div>
                <div class="col" :class="LayoutChild1">
                  <q-select
                    v-model="postalCode"
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    :options="postalCodeOptions"
                    label="Post Code"
                  ></q-select>
                </div>
                <div class="col" :class="LayoutChild1">
                  <q-select
                    v-model="country"
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    :options="countryOptions"
                    label="Country"
                  ></q-select>
                </div>
              </div>
            </div>
            <!--<div class="row">

                <div class="col-12 float-right btn-align-1" :class="LayoutChild1">                  
                        <q-btn @click="editMode = false" icon="save" label="Save" color="primary" class="float-right" />
                </div>
            </div>     -->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressDetails',
  props: ['addressDetails'],

  data() {
    return {
      //dummy data
      editMode: false,
      //end dummy data

      //created data
      addressLine1: null,
      AddressLine1Options: ['1', '2', '3'],
      addressLine2: null,
      AddressLine2Options: ['green street', 'blue street'],
      city: null,
      cityOptions: ['Auckland', 'Christchurch'],
      postalCode: null,
      postalCodeOptions: ['1024', '1080'],
      country: null,
      countryOptions: ['New Zealand', 'Australia'],

      //end created data

      title: 'AddressDetails',

      //custom-style-class-sets

      //paddings 1
      LayoutParent: ['layout-parent q-col-gutter-x-sm q-col-gutter-y-lg'],
      LayoutChild1: ['layout-child-1'],
      //LayoutChild2: ['layout-child-2 col-12']
    }
  },

  Methods: {},
}
</script>

<style lang="stylus" scoped>
@import('../styles/global.styl')

#user-name .detail-rows .row
 align-items center

.layout-parent
    align-items center

.layout-child-1
    width $fieldWidth2
.btn-align-1
    padding-top 6px
</style>
