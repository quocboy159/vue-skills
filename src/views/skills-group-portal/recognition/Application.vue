<template>
  <q-page padding>
    <div class="row">
      <label class="text-h4">{{ applicationTitle }}</label>
    </div>

    <failure-message
      ref="failureCompleteApplicationMessage"
      :message="COMPLETE_APPLICATION_FAIL_MESSAGE"
    />

    <failure-message
      ref="failurePaymentMessage"
      :message="PAYMENT_FAIL_MESSAGE"
    />

    <failure-message
      ref="failureMessage"
      :message="UPDATE_APPLICATION_FAIL_MESSAGE"
    />
    <failure-message
      ref="failureExceedRequestBodyLimitMessage"
      :message="exceedRequestBodyLimitMessage"
    />

    <failure-message
      ref="unsuccessMessagePayment"
      :message="PAYMENT_UNSUCCESSFUL_MESSAGE"
    />

    <failure-message
      ref="validationErrorMessage"
      :message="VALIDATION_ERROR_MESSAGE"
    />

    <div class="row q-pt-lg">
      <div class="col-12">
        <q-card>
          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Personal Details</h1>

            <div class="row">
              <div class="row col-md-4 col-xs-12 form-group">
                <label class="field-name">First Name</label>
                <div class="field-text-1">{{ model.firstName }}</div>
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Email Address</label>
                <div class="field-text-1">{{ model.email }}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Middle Name</label>
                <q-input
                  dense
                  v-model="model.middleName"
                  maxlength="50"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>

              <div class="row col-md-4 offset-md-1 col-xs-12 form-group">
                <label ref="lbDateOfBirth" class="field-name col-12">
                  Date of Birth
                </label>
                <app-date
                  class="field-input"
                  v-model="model.dateOfBirth"
                  :error-message="dateOfBirthErrors"
                  :error="$v.model.dateOfBirth.$error"
                  @input="$v.model.dateOfBirth.$touch"
                  @blur="$v.model.dateOfBirth.$touch"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>

            <div class="row">
              <div class="row col-md-4 col-xs-12 form-group">
                <label class="field-name">Last Name</label>
                <div class="field-text-1">{{ model.lastName }}</div>
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name col-12">Gender</label>
                <app-select
                  class="field-input"
                  v-model="model.gender"
                  :options="Genders"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Home Phone</label>
                <q-input
                  dense
                  v-model="model.businessPhone"
                  maxlength="20"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Mobile Phone</label>
                <q-input
                  dense
                  v-model="model.phoneNumber"
                  maxlength="20"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>

            <div v-if="canDisplayNsn" class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">
                  National Student Number (if known)
                </label>
                <q-input
                  dense
                  v-model="model.nsn"
                  maxlength="10"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg">
            <h1 class="text-h5">Address</h1>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label ref="lbCountry" class="field-name">Country</label>
                <app-select
                  v-model="model.country"
                  :options="countryOptions"
                  :error="$v.model.country.$error"
                  @input="onInput"
                  :error-message="countryErrors"
                  @blur="$v.model.country.$touch"
                  class="field-input"
                  :disable="isDisabledInputs"
                  ref="countrySelect"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">Street</label>
                <skills-suggestions-address
                  dense
                  v-model="model.street"
                  maxlength="100"
                  :error-message="streetErrors"
                  :error="$v.model.street.$error"
                  @input="$v.model.street.$touch"
                  @blur="$v.model.street.$touch"
                  :onItemSelected="onStreetSelected"
                  v-if="isNewZealand"
                  class="field-input"
                  :disable="isDisabledInputs"
                  isSkillsGroupPortal
                />
                <q-input
                  dense
                  v-model="model.street"
                  maxlength="100"
                  :error-message="streetErrors"
                  :error="$v.model.street.$error"
                  @input="$v.model.street.$touch"
                  @blur="$v.model.street.$touch"
                  :readonly="!isHasValueCountry"
                  v-else
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Suburb</label>
                <q-input
                  dense
                  v-model="model.suburb"
                  maxlength="100"
                  :readonly="isNewZealand || !isHasValueCountry"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12 form-group">
                <label class="field-name">City</label>
                <q-input
                  dense
                  v-model.trim="model.city"
                  maxlength="50"
                  :readonly="isNewZealand || !isHasValueCountry"
                  :error-message="cityErrors"
                  :error="$v.model.city.$error"
                  @input="$v.model.city.$touch"
                  @blur="$v.model.city.$touch"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>

              <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                <label class="field-name">Post Code</label>
                <skills-post-code
                  v-model="model.postCode"
                  :country="model.country"
                  :error-message="postCodeErrors"
                  :error="$v.model.postCode.$error"
                  @input="$v.model.postCode.$touch"
                  @blur="$v.model.postCode.$touch"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12 form-group">
                <custom-checkbox
                  v-model="model.marketingConsent"
                  label="Yes, I would like to receive communications from Skills Consulting Group."
                  :disabled="isDisabledInputs"
                ></custom-checkbox>
              </div>
            </div>
          </q-card-section>

          <q-card-section v-if="canDisplayReferees" class="q-pa-lg">
            <h1 class="text-h5">Referees</h1>
            <div class="row">
              <div class="col-xs-12">
                Please complete the details below for two referees. The referee
                must be a person you have worked for within the last 5 years
                (for example a supervisor or a manager).
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <referee
                  ref="referee1"
                  title="Referee 1"
                  :data="referee1"
                  :isDiabled="isDisabledInputs"
                  :canValidateForm="canValidateForm"
                  @emailChanged="onReferee1EmailChanged($event)"
                ></referee>
              </div>
              <div class="col-md-4 col-xs-12 offset-md-1">
                <referee
                  ref="referee2"
                  title="Referee 2"
                  :data="referee2"
                  :isDiabled="isDisabledInputs"
                  :canValidateForm="canValidateForm"
                  :secondRefereeEmail="referee1.email"
                ></referee>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-lg" v-if="application">
            <h1 class="text-h5" ref="lbApplicationInformation">
              Application Information
            </h1>

            <div class="row">
              <div
                class="col-md-4 col-xs-12 form-group"
                v-if="canDisplayNzPgdBoardLicense"
              >
                <label class="field-name">NZ PGD Board License Number</label>
                <q-input
                  dense
                  v-model.trim="model.pgdBoardLicenseNumber"
                  :error-message="pgdBoradLicenseNumberError"
                  :error="$v.model.pgdBoardLicenseNumber.$error"
                  @input="$v.model.pgdBoardLicenseNumber.$touch"
                  @blur="$v.model.pgdBoardLicenseNumber.$touch"
                  maxlength="50"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>

              <div
                class="col-md-4 col-xs-12 form-group"
                v-if="canDisplayFsProviderRegistrationNumber"
              >
                <label class="field-name">
                  Financial Advice Provider Registration Number if you are
                  currently practising in New Zealand
                </label>
                <q-input
                  dense
                  v-model.trim="model.fsProviderRegistrationNumber"
                  maxlength="15"
                  class="field-input"
                  :disable="isDisabledInputs"
                />
              </div>
            </div>

            <div v-if="isRealEstate" class="row">
              <div class="col-md-4 col-xs-12">
                <custom-checkbox
                  v-model="model.isNzCitizen"
                  label="Please tick if you are a Citizen of NZ"
                  :disabled="isDisabledInputs"
                ></custom-checkbox>
              </div>
            </div>

            <div class="row">
              <div class="col-md-9 col-xs-12 form-group">
                <q-banner
                  v-if="$q.platform.is.mobile"
                  rounded
                  class="bg-grey-3 q-mb-md"
                >
                  <span v-html="tooltipText"></span>
                </q-banner>

                <div
                  v-for="(item, index) in questionSubFolders"
                  :key="item.subFolderName"
                >
                  <div v-if="canDisplayUploadQuestion(item.subFolderName)">
                    <div class="row">
                      <div class="col-12 col-md-auto q-mr-md">
                        <label class="field-name">
                          {{ item.questionText }}
                        </label>
                      </div>
                      <div v-if="item.subHeading" class="col-12 col-md-auto">
                        <label class="subHeading" v-html="item.subHeading" />
                      </div>
                    </div>

                    <base-multiple-upload-file
                      :tooltip="tooltipText"
                      :disable="isDisabledInputs"
                      :subfolder="item.subFolderName"
                      :onChange="onChangeFiles"
                      :onSelected="onDownloadFile"
                      :existingFiles="item.files"
                      :maxFileSizeMB="maxFileSizeUploadMB"
                      :accept="supportedFileTypes"
                      :ref="`${uploadFileRefName}${index}`"
                      :error="
                        validateUploadQuestion(
                          index,
                          item.mandatory,
                          item.subFolderName
                        )
                      "
                      :errorMessage="`${item.subFolderName} folder should have at least one file`"
                    ></base-multiple-upload-file>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-section v-if="previousFiles.length">
            <h1 class="text-h5">
              Files uploaded on your previous applications
            </h1>

            <div class="row">
              <i>
                You can view the files you previously uploaded by clicking the
                file name link. This will open in a new browser tab. If you want
                to upload it for your latest recognition application, you can
                right click and save that file. You can then browse/drag the
                downloaded file to the evidence box for your application.
              </i>
            </div>

            <div
              v-for="previousFile in previousFiles"
              :key="previousFile.key"
              class="q-gutter-xs row"
            >
              <label class="field-name q-pt-md">{{ previousFile.key }}:</label>
              <div
                v-for="item in previousFile.value"
                :key="item.id"
                class="row col-12"
              >
                <q-chip
                  clickable
                  class="btn-select"
                  @click="onDownloadFile(item.id)"
                >
                  {{ item.name }}
                </q-chip>
              </div>
            </div>
          </q-card-section>

          <q-card-section v-if="eligibilityChecks.length > 0">
            <h1 class="text-h5">Confirm your Eligibility</h1>
            <div v-for="item in eligibilityChecks" :key="item.crmField">
              <custom-checkbox
                v-model="item.checked"
                :label="item.questionText"
                :error="!isEligibilityValid(item)"
                :error-message="eligibilityError"
                :disabled="isDisabledInputs"
              ></custom-checkbox>
            </div>
          </q-card-section>

          <q-card-actions horizontal align="right">
            <q-btn
              flat
              icon="close"
              label="RESET"
              color="primary"
              class="float-right q-button-text"
              @click="onReset()"
              :disable="isDisabledInputs"
            />
            <q-btn
              icon="save"
              label="SAVE"
              color="primary"
              class="float-right q-button-text"
              @click="onSave()"
              :disable="isDisabledInputs"
            />
            <q-btn
              v-if="canDisplayCompleteButton"
              icon="done"
              label="Complete"
              color="primary"
              class="float-right q-button-text"
              @click="validateAndConfirm()"
              :disable="isDisabledInputs"
            />
            <q-btn
              v-else
              icon="payment"
              label="APPLY & PAY"
              color="primary"
              class="float-right q-button-text"
              @click="validateAndConfirm()"
              :disable="isDisabledInputs"
            />
          </q-card-actions>
        </q-card>
      </div>

      <base-dialog
        v-on:onOk="onRedirectToMarketingPage"
        :isOpen="isOpenDialogErrorCreateApplication"
      >
        <div slot="header" class="text-h6 text-weight-bold text-negative">
          <q-icon name="warning" />
          ERROR
        </div>
        <div class="text-negative" slot="body">
          There has been an error creating your application. Please contact the
          <a href="mailto:support@skills.org.nz">Support Team</a>
        </div>
      </base-dialog>

      <confirmation-dialog
        :isOpen="canShowConfirmationDialog"
        :isComplete="canDisplayCompleteButton"
        :industryTypeCode="applicationIndustryTypeCode"
        @onSubmit="onSubmit()"
        @onCancel="canShowConfirmationDialog = false"
      ></confirmation-dialog>
    </div>
  </q-page>
</template>
<script>
import RecognitionApi from '@/apis/skills-group-portal/recognitionApi.js'
import FileApi from '@/apis/skills-group-portal/fileApi.js'
import {
  ErrorMessages,
  Genders,
  RegistrationClasses,
  NEW_ZEALAND,
  DDMMYYY,
  PAYMENT_UNSUCCESSFUL_MESSAGE,
  APPLICATION_DRIVE_NAME,
  UPDATE_APPLICATION_FAIL_MESSAGE,
  COMPLETE_APPLICATION_FAIL_MESSAGE,
  PAYMENT_FAIL_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  PROOF_OF_RESIDENCY,
  PROOF_OF_IDENTITY,
} from '../../../common/constants.js'
import { validDate } from '../../../common/datetime.js'
import { required, requiredIf } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import Utilities from '../../../common/utilities'
import moment from 'moment'
import { SkillsGroupPortalRouteNames } from '@/common/constants.js'
import { HttpStatusCode } from '@/common/enums.js'
import { scroll } from 'quasar'
import {
  ApplicationStatuses,
  ApplicationCategories,
  IndustryTypeEnum,
} from '@/common/skills-group-portal/enums.js'
import * as Sentry from '@sentry/browser'

const { setScrollPosition } = scroll
export default {
  name: 'Application',

  components: {
    BaseDialog: () =>
      import(/* webpackPrefetch: true */ '@/compoments/popups/BaseDialog.vue'),
    BaseMultipleUploadFile: () =>
      import(
        /* webpackPrefetch: true */ '@/compoments/inputs/BaseMultipleUploadFile.vue'
      ),
    AppSelect: () =>
      import(/* webpackPrefetch: true */ '@/compoments/select/AppSelect.vue'),
    FailureMessage: () =>
      import(
        /* webpackPrefetch: true */ '../../../compoments/messages/FailureMessage.vue'
      ),
    AppDate: () =>
      import(/* webpackPrefetch: true */ '../../../compoments/AppDate.vue'),
    SkillsSuggestionsAddress: () =>
      import(
        /* webpackPrefetch: true */ '../../../compoments/SkillsSuggestionsAddress.vue'
      ),
    SkillsPostCode: () =>
      import(
        /* webpackPrefetch: true */ '../../../compoments/SkillsPostCode.vue'
      ),
    ConfirmationDialog: () =>
      import(
        /* webpackPrefetch: true */ '@/containers/skills-group-portal/ConfirmationDialog'
      ),
    Referee: () => import('@/containers/skills-group-portal/Referee'),
    CustomCheckbox: () =>
      import(
        /* webpackPrefetch: true */ '@/compoments/checkboxes/CustomCheckbox'
      ),
  },

  data() {
    return {
      isOpenDialogErrorCreateApplication: false,
      previousFiles: [],
      PAYMENT_UNSUCCESSFUL_MESSAGE,
      uploadFileRefName: 'uploadFile',
      questionSubFolders: [],
      application: null,
      Genders,
      RegistrationClasses,
      model: {
        firstName: null,
        lastName: null,
        middleName: null,
        email: null,
        dateOfBirth: null,
        gender: null,
        phoneNumber: null,
        businessPhone: null,
        nsn: null,
        street: null,
        suburb: null,
        city: null,
        postCode: null,
        country: null,
        contactId: null,
        marketingConsent: false,
        pgdBoardLicenseNumber: null,
        fsProviderRegistrationNumber: null,
        fileUploads: [],
        fileDeletes: [],
        isNzCitizen: false,
      },
      fileDeletes: [],
      originalModel: {},
      countryOptions: Utilities.getCountries(),
      canValidateForm: false,
      canShowConfirmationDialog: false,
      supportedFileTypes: `${process.env.VUE_APP_SUPPORTED_FILE_TYPES}`,
      maxFileSizeUploadMB: +process.env.VUE_APP_MAX_FILE_SIZE_UPLOADMB,
      tooltipText: `Accepted file types for evidence are: ${process.env.VUE_APP_SUPPORTED_FILE_TYPES}. Each file must not exceed ${process.env.VUE_APP_MAX_FILE_SIZE_UPLOADMB}Mb.<br/>
                    Each save must not exceed ${process.env.VUE_APP_MAX_REQUEST_BODY_SIZE_MB}MB.<br/>
                    If your file uploads exceed ${process.env.VUE_APP_MAX_REQUEST_BODY_SIZE_MB}MB, upload some files, click save, then repeat until all files have been uploaded.`,
      exceedRequestBodyLimitMessage: '',
      UPDATE_APPLICATION_FAIL_MESSAGE,
      PAYMENT_FAIL_MESSAGE,
      COMPLETE_APPLICATION_FAIL_MESSAGE,
      VALIDATION_ERROR_MESSAGE,
      referee1: {},
      referee2: {},
      eligibilityChecks: [],
      deleteFilesByNzCitizen: false,
    }
  },

  validations() {
    if (this.canValidateForm) {
      return {
        model: {
          dateOfBirth: { required, validDate },
          street: { required },
          city: { required },
          postCode: { required },
          country: { required },
          pgdBoardLicenseNumber: {
            required: requiredIf(() => {
              return this.canDisplayNzPgdBoardLicense
            }),
          },
        },
      }
    } else {
      return {
        model: {
          dateOfBirth: { validDate },
          street: {},
          city: {},
          postCode: {},
          country: {},
          pgdBoardLicenseNumber: {},
        },
      }
    }
  },

  async created() {
    if (!this.$route.params.id) {
      let result
      try {
        result = await this.createRecognitionApplication()
      } catch {
        this.isOpenDialogErrorCreateApplication = true
      }
      await this.setApplication(result.data.applicationId)
    } else {
      await this.setApplication(this.$route.params.id)
    }

    this.setCRMContact()
    this.showSavePaymentUnsuccessMessage()
  },

  watch: {
    contact: {
      handler(data) {
        this.fetchModel(data)
      },
      immediate: true,
    },
    'model.isNzCitizen'(newValue) {
      if (newValue) {
        this.removeRealEstateUploadFiles()
      }
    },
  },

  computed: {
    ...mapGetters('skills-group-contact', ['contact']),

    ...mapGetters('skills-group-application', ['isSavePaymentUnsuccess']),

    applicationIndustryTypeCode() {
      return this.application
        ? this.application.industryTypeCode
        : IndustryTypeEnum.PGD
    },
    isRealEstate() {
      return (
        this.application &&
        this.application.industryTypeCode === IndustryTypeEnum.RealEstate
      )
    },
    isRigging() {
      return (
        this.application &&
        this.application.industryTypeCode === IndustryTypeEnum.Rigging
      )
    },
    isScaffolding() {
      return (
        this.application &&
        this.application.industryTypeCode === IndustryTypeEnum.Scaffolding
      )
    },
    canDisplayReferees() {
      return this.isRigging || this.isScaffolding
    },
    canDisplayNsn() {
      return (
        this.application &&
        (this.application.industryTypeCode === IndustryTypeEnum.Scaffolding ||
          this.application.industryTypeCode === IndustryTypeEnum.Electrical ||
          this.application.industryTypeCode === IndustryTypeEnum.Rigging ||
          this.application.industryTypeCode === IndustryTypeEnum.RealEstate)
      )
    },
    canDisplayNzPgdBoardLicense() {
      return (
        this.application &&
        this.application.inputCategory?.toUpperCase() ===
          ApplicationCategories.PGD_C &&
        this.application.industryTypeCode === IndustryTypeEnum.PGD
      )
    },
    canDisplayFsProviderRegistrationNumber() {
      return (
        this.application &&
        this.application.industryTypeCode === IndustryTypeEnum.FS
      )
    },
    canDisplayCompleteButton() {
      if (this.application && this.application.statusCode) {
        return (
          this.application.statusCode ===
          ApplicationStatuses.WaitingForDocuments
        )
      }
      return false
    },
    isDisabledInputs() {
      return (
        this.application?.statusCode !==
          ApplicationStatuses.WaitingForPayment &&
        this.application?.statusCode !== ApplicationStatuses.WaitingForDocuments
      )
    },

    applicationTitle() {
      return this.application
        ? `Application - ${this.application.productName}`
        : ''
    },

    dateOfBirthErrors() {
      if (this.$v.model.dateOfBirth.$dirty) {
        if (
          typeof this.$v.model.dateOfBirth.required !== 'undefined' &&
          !this.$v.model.dateOfBirth.required
        ) {
          return ErrorMessages.REQUIRED_FIELD('Date of Birth')
        }

        if (
          typeof this.$v.model.dateOfBirth.validDate !== 'undefined' &&
          !this.$v.model.dateOfBirth.validDate
        ) {
          return ErrorMessages.INVALID_FORMAT_DATE
        }
      }

      return ''
    },
    streetErrors() {
      if (this.$v.model.street.$dirty && !this.$v.model.street.required) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    cityErrors() {
      if (this.$v.model.city.$dirty && !this.$v.model.city.required) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postCodeErrors() {
      if (this.$v.model.postCode.$dirty && !this.$v.model.postCode.required) {
        return ErrorMessages.REQUIRED_FIELD('Post Code')
      }

      return ''
    },

    countryErrors() {
      if (this.$v.model.country.$dirty && !this.$v.model.country.required) {
        return ErrorMessages.REQUIRED_FIELD('Country')
      }

      return ''
    },
    pgdBoradLicenseNumberError() {
      if (
        this.$v.model.pgdBoardLicenseNumber.$dirty &&
        !this.$v.model.pgdBoardLicenseNumber.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('NZ PGD Board License Number')
      }

      return ''
    },

    isNewZealand() {
      return this.model.country?.value === NEW_ZEALAND
    },

    isHasValueCountry() {
      return !!this.model.country?.value
    },
    eligibilityError() {
      return ErrorMessages.INVALID_CHECKBOX
    },
  },

  methods: {
    ...mapActions('skills-group-contact', ['setCRMContact']),
    ...mapActions('skills-group-application', [
      'setEventSaveApplicationSuccess',
      'setIndustryTypeCodeNotValidError',
      'setEventSavePaymentUnsuccess',
      'commitCompleteApplicationInfo',
    ]),

    onRedirectToMarketingPage() {
      location.href = process.env.VUE_APP_MARKETING_SITE
    },

    setPreviousFiles() {
      if (this.application?.previousFiles?.length) {
        this.previousFiles = this.application.previousFiles.reduce(
          (accumulator, currentValue) => {
            if (!accumulator.some((x) => x.key === currentValue.subfolder)) {
              accumulator.push({
                key: currentValue.subfolder,
                value: [currentValue],
              })
            } else {
              const keyIndex = accumulator.findIndex(
                (x) => x.key === currentValue.subfolder
              )
              accumulator[keyIndex].value.push(currentValue)
            }

            return accumulator
          },
          []
        )
      }
    },

    onCloseAllErrorMessage() {
      this.$refs.failureMessage?.onCloseMessage()
      this.$refs.unsuccessMessagePayment?.onCloseMessage()
      this.$refs.failureExceedRequestBodyLimitMessage?.onCloseMessage()
      this.$refs.failurePaymentMessage?.onCloseMessage()
      this.$refs.failureCompleteApplicationMessage?.onCloseMessage()
      this.$refs.validationErrorMessage?.onCloseMessage()
    },

    validateExceedBodyRequestSizeLimit() {
      this.onCloseAllErrorMessage()
      const data = this.getUpdateRecognitionApplicationFormData()
      const length = Utilities.getContentLengthMB(data)
      const valid = length <= process.env.VUE_APP_MAX_REQUEST_BODY_SIZE_MB

      this.exceedRequestBodyLimitMessage = `<strong>Failure,</strong> Your application has not been updated.<br />
      Each save must not exceed ${process.env.VUE_APP_MAX_REQUEST_BODY_SIZE_MB}MB.  Your form is currently ${length}MB<br />
      Remove some files, click save, then upload the remaining files until all have been uploaded.`

      if (!valid) {
        this.$refs.failureExceedRequestBodyLimitMessage?.onOpenMessage()
        window.scrollTo(0, 0)
      } else {
        this.$refs.failureExceedRequestBodyLimitMessage?.onCloseMessage()
      }

      return valid
    },

    showSavePaymentUnsuccessMessage() {
      this.onCloseAllErrorMessage()

      if (this.isSavePaymentUnsuccess) {
        this.$refs.unsuccessMessagePayment?.onOpenMessage()
      } else {
        this.$refs.unsuccessMessagePayment?.onCloseMessage()
      }
    },

    onInput() {
      this.onChangeCountry()
      this.$v.model.country.$touch()
    },
    isAllEligibilityValid() {
      for (let item of this.eligibilityChecks) {
        const isValid = this.isEligibilityValid(item)
        if (!isValid) {
          return false
        }
      }
      return true
    },
    isEligibilityValid(eligibilityItem) {
      if (!this.canValidateForm || !eligibilityItem.mandatory) {
        return true
      }
      return eligibilityItem.checked
    },
    canDisplayUploadQuestion(subfolder) {
      const subFolderName = subfolder?.toLowerCase()
      if (
        subFolderName === PROOF_OF_RESIDENCY.toLowerCase() ||
        subFolderName === PROOF_OF_IDENTITY.toLowerCase()
      ) {
        return !this.model.isNzCitizen
      } else {
        return true
      }
    },
    validateUploadQuestion(index, mandatory, subfolder) {
      const subFolderName = subfolder?.toLowerCase()
      if (!this.canValidateForm) {
        return false
      }

      if (
        subFolderName === PROOF_OF_RESIDENCY.toLowerCase() ||
        subFolderName === PROOF_OF_IDENTITY.toLowerCase()
      ) {
        if (this.model.isNzCitizen) {
          return false
        } else if (this.deleteFilesByNzCitizen) {
          return !this.model.fileUploads.some((x) => x.subfolder == subfolder)
        }
      } else if (!mandatory) {
        return false
      }

      // check upload file input has file
      const isExistUploadedFile = this.model.fileUploads.some(
        (x) => x.subfolder == subfolder
      )
      if (isExistUploadedFile) {
        return false
      }

      // check previous files are deleted all
      const subfolerDeletedFiles = this.fileDeletes.filter(
        (x) => x.subfolder === subfolder
      )

      const isdeleteAllPreviousFiles =
        this.questionSubFolders[index].files.length ===
        subfolerDeletedFiles.length

      return isdeleteAllPreviousFiles
    },
    removeRealEstateUploadFiles() {
      // after the NZ citizen is checked then remove upload files for 'Proof of Residency' and 'Proof of Identity'
      if (
        this.application &&
        this.application.industryTypeCode === IndustryTypeEnum.RealEstate
      ) {
        this.questionSubFolders.forEach((item, index) => {
          if (
            [
              PROOF_OF_RESIDENCY.toLowerCase(),
              PROOF_OF_IDENTITY.toLowerCase(),
            ].includes(item.subFolderName?.toLowerCase())
          ) {
            // remove all files that are saved before
            item.files?.forEach((f) => {
              if (!this.fileDeletes.some((x) => x.id === f.id)) {
                this.fileDeletes.push({
                  id: f.id,
                  subfolder: item.subFolderName,
                })
              }
            })

            this.model.fileDeletes = this.fileDeletes.map((x) => {
              return x.id
            })

            item.files = []

            // reset the upload control
            this.$refs[`${this.uploadFileRefName}${index}`][0].onClear()
          }
        })

        // ignore some files are added to upload control but not yet saved
        this.model.fileUploads = this.model.fileUploads.filter(
          (x) =>
            x.subfolder?.toLowerCase() !== PROOF_OF_RESIDENCY.toLowerCase() &&
            x.subfolder?.toLowerCase() !== PROOF_OF_IDENTITY.toLowerCase()
        )
        this.deleteFilesByNzCitizen = true
      }
    },
    onChangeFiles({ files, subfolder, deletedExistingFileIds }) {
      const applicationName = this.application.applicationName
      const applicationId = this.application.applicationId

      this.model.fileUploads = this.model.fileUploads.filter(
        (x) => x.subfolder !== subfolder
      )

      files?.forEach((file) => {
        this.model.fileUploads.push({
          file,
          applicationName,
          applicationId,
          subfolder,
        })
      })

      deletedExistingFileIds?.forEach((id) => {
        if (!this.fileDeletes.some((x) => x.id === id)) {
          this.fileDeletes.push({
            id,
            subfolder,
          })
        }
      })

      this.model.fileDeletes = this.fileDeletes.map((x) => {
        return x.id
      })
    },

    async onDownloadFile(id) {
      await FileApi.downloadFile(id, APPLICATION_DRIVE_NAME)
    },

    async setApplication(applicationId) {
      if (applicationId) {
        let result
        try {
          result = await RecognitionApi.getRecognitionApplicationById(
            applicationId
          )
        } catch (error) {
          if (error.response.status === HttpStatusCode.Forbidden) {
            this.$router.push({
              name: SkillsGroupPortalRouteNames.MY_DASHBOARD,
              params: { label: this.$route.params.label },
            })
          } else {
            throw error
          }
        }

        this.application = { ...result.data }
        this.redirectToLandingPageWhenIndustryTypeCodeNotValid()
        this.model.pgdBoardLicenseNumber = this.application.pgdBoardLicenseNumber
        this.model.fsProviderRegistrationNumber = this.application.fsProviderRegistrationNumber
        this.setQuestionSubFolders()
        this.setPreviousFiles()
        this.initialReferees(this.application?.referees)
        this.initialEligibilityCheks(this.application?.eligibilityChecks)
      }
    },
    initialReferees(refereesList) {
      if (this.canDisplayReferees) {
        const defaultReferee = {
          firstName: '',
          lastName: '',
          email: '',
          organisation: '',
          position: '',
          phone: '',
          mobilePhone: '',
        }
        let refereeData1 = { ...defaultReferee }
        let refereeData2 = { ...defaultReferee }
        if (refereesList) {
          if (refereesList.length >= 1) {
            refereeData1 = { ...refereesList[0] }
          }
          if (refereesList.length >= 2) {
            refereeData2 = { ...refereesList[1] }
          }
        }

        this.referee1 = refereeData1
        this.referee2 = refereeData2
      }
    },
    initialEligibilityCheks() {
      this.eligibilityChecks = this.application?.eligibilityChecks.map(
        (item) => {
          return {
            ...item,
            checked:
              item.crmValue.toLowerCase() === item.savedValue.toLowerCase(),
          }
        }
      )
    },
    redirectToLandingPageWhenIndustryTypeCodeNotValid() {
      if (
        ![
          IndustryTypeEnum.PGD,
          IndustryTypeEnum.FS,
          IndustryTypeEnum.Electrical,
          IndustryTypeEnum.Scaffolding,
          IndustryTypeEnum.RealEstate,
          IndustryTypeEnum.Rigging,
        ].includes(this.application.industryTypeCode)
      ) {
        this.setIndustryTypeCodeNotValidError(true)
        this.$router.push({
          name: SkillsGroupPortalRouteNames.MY_DASHBOARD,
          params: { label: this.$route.params.label },
        })
      }
    },

    setQuestionSubFolders() {
      this.questionSubFolders.length = 0
      this.questionSubFolders = this.application.questionSubFolders.map(
        (item) => {
          const result = item
          result.files = this.application.files.filter(
            (x) => x.subfolder === item.subFolderName
          )
          return result
        }
      )
    },

    async createRecognitionApplication() {
      var createApplicationFunc = async () => {
        const createRecognitionApplicationRequest = {
          productPriceListItemsId: this.$route.query.productPriceListItemId,
          contactID: this.contact.targetCRMContactID,
          contactName: `${this.contact.firstName} ${this.contact.lastName}`,
          billToAccountId: this.$route.query.btai,
          parentId: this.$route.query.parentId,
        }
        return await RecognitionApi.createRecognitionApplication(
          createRecognitionApplicationRequest
        )
      }

      if (this.contact.targetCRMContactID) {
        return await createApplicationFunc()
      } else {
        Sentry.captureMessage(
          `Contact info is null or undefined, targetCRMContactID: ${this.contact.targetCRMContactID}, firstName: ${this.contact.firstName}, lastName: ${this.contact.lastName}`
        )
        await Utilities.delay(1000)
        return await createApplicationFunc()
      }
    },

    onChangeCountry() {
      this.model.street = ''
      this.model.suburb = ''
      this.model.city = ''
      this.model.postCode = ''
    },

    onStreetSelected({ street, suburb, city, postCode }) {
      this.model.street = street
      this.model.suburb = suburb
      this.model.city = city
      this.model.postCode = postCode
    },

    fetchModel(contact) {
      this.model.firstName = contact.firstName
      this.model.middleName = contact.middleName
      this.model.lastName = contact.lastName
      this.model.email = contact.primaryEmail
      this.model.contactId = contact.contactID
      this.model.dateOfBirth = contact.dateOfBirth
        ? moment(contact.dateOfBirth).format(DDMMYYY)
        : ''
      this.model.gender = Genders.find((item) => item.value == contact.gender)
      this.model.country = this.countryOptions.find(
        (item) => item.value == contact.country
      )
      this.model.street = contact.street
      this.model.suburb = contact.suburb
      this.model.city = contact.city
      this.$nextTick(() => {
        this.model.postCode = contact.postCode
        this.originalModel.postCode = contact.postCode
      })
      this.model.phoneNumber = contact.phoneNumber
      this.model.businessPhone = contact.businessPhone
      this.model.marketingConsent = contact.marketingConsent
      this.model.nsn = contact.nsn
      this.originalModel = { ...this.model }
    },

    async doComplete() {
      this.onCloseAllErrorMessage()

      // update application
      try {
        await this.updateRecognitionApplication(false)
      } catch {
        this.canShowConfirmationDialog = false
        this.$refs.failureMessage?.onOpenMessage()
        window.scrollTo(0, 0)
        return
      }

      // complete application
      try {
        await RecognitionApi.completeRecognitionApplication({
          amount: this.application.amount,
          applicationId: this.application.applicationId,
          email: this.contact.primaryEmail,
        })
        this.commitCompleteApplicationInfo({
          applicationId: this.application.applicationId,
          industryTypeCode: this.application.industryTypeCode,
        })
        this.$router.push({
          name: SkillsGroupPortalRouteNames.MY_DASHBOARD,
          params: { label: this.$route.params.label },
        })
      } catch {
        this.canShowConfirmationDialog = false
        this.$refs.failureCompleteApplicationMessage?.onOpenMessage()
        window.scrollTo(0, 0)
      }
    },

    async onSave() {
      this.onCloseAllErrorMessage()
      this.canValidateForm = false
      this.$nextTick(async () => {
        this.$v.$touch()
        const isReferee1Valid = this.canDisplayReferees
          ? this.$refs.referee1?.isValid()
          : true
        const isReferee2Valid = this.canDisplayReferees
          ? this.$refs.referee2?.isValid()
          : true
        const isUploadFileSizeValid = this.validateExceedBodyRequestSizeLimit()
        if (!this.$v.$invalid && isReferee1Valid && isReferee2Valid) {
          if (isUploadFileSizeValid) {
            try {
              await this.updateRecognitionApplication()

              this.$refs.failureMessage?.onCloseMessage()

              this.$router.push({
                name: SkillsGroupPortalRouteNames.MY_DASHBOARD,
                params: { label: this.$route.params.label },
              })
            } catch {
              this.$refs.failureMessage?.onOpenMessage()
            }

            this.scrollTop()
          }
        } else {
          this.scrollTop()
          this.$refs.validationErrorMessage?.onOpenMessage()
        }
      })
    },

    getUpdateRecognitionApplicationFormData() {
      const payload = {
        ...this.model,
        country: this.model.country?.value ?? '',
        gender: this.model.gender?.value,
        dateOfBirth: Utilities.convertStringDateToDate(this.model.dateOfBirth),
        applicationName: this.application.applicationName,
      }

      if (this.canDisplayReferees) {
        const savingReferee1 = this.$refs.referee1.getData()
        const savingReferee2 = this.$refs.referee2.getData()
        payload.referees = [savingReferee1, savingReferee2]
      }
      this.eligibilityChecks.forEach((item) => {
        const fieldName = item.crmField.replace('skills_', '')
        if (item.checked) {
          payload[fieldName] = item.crmValue.toLowerCase()
        } else {
          if (isNaN(item.crmValue.toLowerCase())) {
            payload[fieldName] = 'false'
          } else {
            payload[fieldName] = '0'
          }
        }
      })
      return Utilities.convertObjectToFormData(payload)
    },

    async updateRecognitionApplication(
      isSetEventSaveApplicationSuccess = true
    ) {
      const payload = this.getUpdateRecognitionApplicationFormData()
      await RecognitionApi.updateRecognitionApplication(
        this.application.applicationId,
        payload
      )

      if (isSetEventSaveApplicationSuccess) {
        this.setEventSaveApplicationSuccess(true)
      }
    },

    async applyAndPayApplication() {
      const data = {
        amount: this.application.amount,
        applicationId: this.application.applicationId,
        whiteLabel: this.$route.params.label,
      }
      return await RecognitionApi.applyAndPayApplication(data)
    },

    onReset() {
      this.canValidateForm = false
      this.model = { ...this.originalModel }
      this.$nextTick(() => {
        this.model.postCode = this.originalModel.postCode
      })
      this.initialReferees(this.application?.referees)
      this.initialEligibilityCheks(this.application?.eligibilityChecks)
      this.fileDeletes = []
      this.$v.$reset()
      this.$refs.referee1?.resetValidation()
      this.$refs.referee2?.resetValidation()
      this.resetUploadFiles()
      this.setQuestionSubFolders()
      this.onCloseAllErrorMessage()
      this.deleteFilesByNzCitizen = false
    },
    scrollTop() {
      const offset = 0
      const duration = 1000
      setScrollPosition(window, offset, duration)
    },
    getIndexOfInvalidQuestionSubFolder() {
      for (const index in this.questionSubFolders) {
        const inValid = this.validateUploadQuestion(
          index,
          this.questionSubFolders[index].mandatory,
          this.questionSubFolders[index].subFolderName
        )

        if (inValid) {
          return index
        }
      }

      return -1
    },
    onReferee1EmailChanged(newValue) {
      this.referee1.email = newValue
    },
    validateReferees() {
      if (this.canDisplayReferees) {
        const isReferee1Valid = this.$refs.referee1.isValid()
        const isReferee2Valid = this.$refs.referee2.isValid()
        return isReferee1Valid && isReferee2Valid
      }
      return true
    },
    async validateAndConfirm() {
      this.canValidateForm = true
      this.$nextTick(() => {
        this.$v.$touch()
        const isUploadFileSizeValid = this.validateExceedBodyRequestSizeLimit()
        const isReferessValid = this.validateReferees()
        const isAllEligibilityValid = this.isAllEligibilityValid()
        if (
          !this.$v.$invalid &&
          isReferessValid &&
          isAllEligibilityValid &&
          this.getIndexOfInvalidQuestionSubFolder() === -1
        ) {
          if (isUploadFileSizeValid) {
            this.canShowConfirmationDialog = true
          }
        } else {
          this.scrollTop()
          this.$refs.validationErrorMessage?.onOpenMessage()
        }
      })
    },

    onSubmit() {
      if (this.canDisplayCompleteButton) {
        this.doComplete()
      } else {
        this.doApplyAndPay()
      }
    },
    async doApplyAndPay() {
      this.onCloseAllErrorMessage()

      if (!this.$v.$invalid) {
        this.canShowConfirmationDialog = true

        // update application
        try {
          await this.updateRecognitionApplication()
        } catch {
          this.$refs.failureMessage?.onOpenMessage()
          this.canShowConfirmationDialog = false
          window.scrollTo(0, 0)
          return
        }

        // init payment
        try {
          const result = await this.applyAndPayApplication()
          window.location.href = result.data
        } catch {
          this.$refs.failurePaymentMessage?.onOpenMessage()
          this.canShowConfirmationDialog = false
          window.scrollTo(0, 0)
        }
      }
    },

    resetUploadFiles() {
      this.questionSubFolders.forEach((value, index) => {
        this.$refs[`${this.uploadFileRefName}${index}`][0]?.onClear()
      })
    },
  },

  beforeRouteLeave(to, from, next) {
    this.setEventSavePaymentUnsuccess(false)
    next()
  },
}
</script>

<style lang="stylus" scoped>

@media only screen and (max-width: 360px) {
  .q-button-text {
    font-size: 11px;
  }
}

.field-amount {
  padding-top: 20px;
}

.subHeading {
  font-size: 12px;
}
</style>
