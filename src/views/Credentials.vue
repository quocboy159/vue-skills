<template>
  <div class="row">
    <div class="col-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="header-row row q-pa-md">
            <div class="col-12">
              <h3 class="text-h3 float-left">Password</h3>

              <!--<q-btn @click="editMode = true" flat round icon="edit" color="primary" class="float-right" />-->
            </div>
          </div>

          <div id="credentials" ref="credentials" class="detail-rows q-pa-md">
            <!--<user-name></user-name>-->
            <edit-password></edit-password>
            <!--<div class="displayMode q-col-gutter-x-sm q-col-gutter-y-md" v-if="!editMode">
              <div class="row" :class="LayoutParent">
                <q-item-label id="f-name" class="" :class="LayoutChild1">Skills Username</q-item-label>
                <div id="l-name" class="" :class="LayoutChild2">Joeb</div>
              </div>
              <div class="row" :class="LayoutParent">
                <q-item-label class="" :class="LayoutChild1">Password</q-item-label>
                <div class="" :class="LayoutChild2">********</div>
              </div>
             </div>        
             


             
            <div class="editMode q-gutter-sm" v-else>
              <div class="row" :class="LayoutParent">
                <q-item-label id="f-name" class="" :class="LayoutChild1">
                  Skills Username
                </q-item-label>
                <div class="" :class="LayoutChild2">                    
                  <q-input v-model="userName" hint="" label="Enter Username">                             
                    </q-input>
                </div>
              </div>
              <div class="row" :class="LayoutParent">
                <q-item-label class="" :class="LayoutChild1">
                  Password
                </q-item-label>
                <div class="" :class="LayoutChild2">                    
                  <q-input v-model="passwordEntry1" :type="isPwd ? 'passwordEntry1' : 'text'" hint="" label="Enter Password">                             
                    </q-input>
                </div>
                <div class="" :class="LayoutChild2">
                  <q-input v-model="passwordEntry2" :type="isPwd ? 'passwordEntry1' : 'text'" hint="" label="Confirm Password">                        
                   </q-input>
                </div>  
                <div class="q-field__append q-field__marginal row no-wrap items-center">              
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                 </div>                  
              </div>
              
              <div class="row">
                <div class="col-12">
                  <q-btn @click="editMode = false" icon="save" label="Save" color="primary" class="float-right" />
                </div>
              </div>
            </div>-->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
//import UserName from './UserName.vue'
import EditPassword from './EditPassword.vue'

export default {
  name: 'credentials',
  components: {
    //'userName' : UserName,
    editPassword: EditPassword,
  },
  props: ['credentials'],

  data() {
    return {
      //dummy data
      editMode: false,
      //end dummy data

      //created data
      date: '1990/01/01',
      existingPassword: '',
      passwordEntry1: '',
      passwordEntry2: '',
      isPwd: true,
      existingIsPwd: true,

      //end created data

      title: 'Credentials',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],

      //custom-style-class-sets

      //paddings 1
      LayoutParent: ['q-col-gutter-x-lg q-col-gutter-y-xm'],
      LayoutChild1: ['layout-child-1 col-12'],
      LayoutChild2: ['layout-child-2 col-12'],
    }
  },
}
</script>

<style lang="stylus" scoped>
@import('../styles/global.styl')
@import('../styles/themes/SkillsDefault/skillsDefault.styl')

#credentials >*
   margin-bottom 1rem
</style>
