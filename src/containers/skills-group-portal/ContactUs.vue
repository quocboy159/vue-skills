<template>
  <q-card class="col-md-12 col-xs-12">
    <q-card-section>
      <label class="text-h6 label-contact-us">{{ title }}</label>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div v-if="whiteLabel === 'imnz'">
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">For General Enquires</div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="email"
              style="font-size: 25px"
            />
            Email:
            <a href="mailto:enquiries@imnz.co.nz">enquiries@imnz.co.nz</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Phone:
            <a href="tel:0508 22 55 46">0508 22 55 46</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">For Events & Marketing</div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              name="mail"
              class="q-icon-contact-us"
              style="font-size: 25px"
            />
            Email:
            <a href="mailto:marketing@imnz.net.nzs">marketing@imnz.net.nz</a>
          </div>
        </div>
      </div>

      <div v-else-if="whiteLabel === 'etec'">
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Call us on:
            <a href="tel:0800 030 500">0800 030 500</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            If you’re overseas please call T
            <a href="tel:+64 9 573 1964">+64 9 573 1964</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <a class="blue-link label-text" href="tel:0800 030 500">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Fax
            <a href="fax:+64 9 573 1967">+64 9 573 1967</a>
          </a>
        </div>
      </div>

      <div v-else-if="whiteLabel === 'scg'">
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            New Zealand
            <a href="tel:+64 9 525 2590">+64 9 525 2590</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Hong Kong
            <a href="tel:+852 9253 3376">+852 9253 3376</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">OR</div>
        </div>
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="email"
              style="font-size: 25px"
            />
            Email us at
            <a href="emailto:info@skillsconsultinggroup.com">
              info@skillsconsultinggroup.com
            </a>
          </div>
        </div>
      </div>

      <div v-else-if="whiteLabel === 'cdl'">
        <div class="q-pt-sm q-pb-xs">
          <a class="blue-link label-text" href="tel:0800 512 622">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Give us a call on 0800 512 622
          </a>
        </div>
      </div>

      <div v-else-if="whiteLabel === 'instep'">
        <div class="q-pt-sm q-pb-xs">
          <a class="blue-link label-text" href="tel:0800 284 678">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Give us a call on 0800 284 678
          </a>
        </div>
      </div>

      <div v-else-if="whiteLabel === 'skills'">
        <div class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Phone 0508 SKILLS
            <a href="tel:0508 754 557">(0508 754 557)</a>
          </div>
        </div>
        <div class="q-pt-sm q-pb-xs q-pl-lg inter-phone-text">
          <div class="blue-link q-ml-xs label-text">
            If you are overseas, please phone
            <a href="tel:+64 9 525 2590">+64 9 525 2590</a>
          </div>
        </div>
        <div v-if="displayRecognitionEmail" class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              name="mail"
              class="q-icon-contact-us"
              style="font-size: 25px"
            />
            Mail
            <a href="mailto:recognition@skills.org.nz">
              recognition@skills.org.nz
            </a>
          </div>
        </div>
        <div v-if="displayRealEstateEmail" class="q-pt-sm q-pb-xs">
          <div class="blue-link label-text">
            <q-icon
              name="mail"
              class="q-icon-contact-us"
              style="font-size: 25px"
            />
            Mail
            <a href="mailto:realestate@skills.org.nz">
              realestate@skills.org.nz
            </a>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="q-pt-sm q-pb-xs">
          <a class="blue-link label-text" href="tel:0508 754 557">
            <q-icon
              class="q-icon-contact-us"
              name="phone"
              style="font-size: 25px"
            />
            Phone 0508 SKILLS (0508 754 557)
          </a>
        </div>
        <div class="q-pt-sm q-pb-xs q-pl-lg inter-phone-text">
          <a class="blue-link q-ml-xs label-text" href="tel:+64 9 525 2590">
            If you are overseas, please phone +64 9 525 2590
          </a>
        </div>
        <div v-if="displayRecognitionEmail" class="q-pt-sm q-pb-xs">
          <a
            class="blue-link label-text"
            href="mailto:recognition@skills.org.nz"
          >
            <q-icon
              name="mail"
              class="q-icon-contact-us"
              style="font-size: 25px"
            />
            Mail recognition@skills.org.nz
          </a>
        </div>
        <div v-if="displayRealEstateEmail" class="q-pt-sm q-pb-xs">
          <a
            class="blue-link label-text"
            href="mailto:realestate@skills.org.nz"
          >
            <q-icon
              name="mail"
              class="q-icon-contact-us"
              style="font-size: 25px"
            />
            Mail realestate@skills.org.nz
          </a>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { IndustryTypeEnum } from '@/common/skills-group-portal/enums'

export default {
  name: 'ContactUs',

  props: {
    industryTypes: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      title: 'Contact Us',
      whiteLabel: null,
    }
  },

  created() {
    this.whiteLabel = (this.$route.params.label || '').toLowerCase()

    if (this.whiteLabel && this.whiteLabel !== 'skills') {
      this.title += ' at Recognition'
    }
  },

  computed: {
    displayRealEstateEmail() {
      return this.industryTypes.includes(IndustryTypeEnum.RealEstate)
    },

    displayRecognitionEmail() {
      return (
        this.industryTypes.length === 0 ||
        this.industryTypes.some((x) => x !== IndustryTypeEnum.RealEstate)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
$blue-color: #337ab7;

a.blue-link {
  color: $blue-color;
  text-decoration: none;
}
a.blue-link:link {
  color: $blue-color;
  text-decoration: none;
}
a.blue-link:visited {
  color: $blue-color;
  text-decoration: none;
}
a.blue-link:hover {
  color: $blue-color;
  text-decoration: none;
  cursor: pointer;
}
a.blue-link:active {
  color: $blue-color;
  text-decoration: none;
}

.inter-phone-text {
  max-width: 230px;
}

.label-contact-us {
  padding-right: 52.6px;
}
</style>
