<template>
  <q-page padding>
    <div class="row">
      <label class="text-h4">
        Wellbeing Provider Onboarding
        <q-chip dense :color="getColorStatus" :icon="getIconStatus">
          {{ getStatusName }}
        </q-chip>
      </label>
    </div>

    <div class="row q-pt-lg">
      <div class="col-12">
        <q-card>
          <q-tabs
            v-model="tabModel"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              v-for="tab in tabs"
              :key="tab.name"
              :name="tab.name"
              :label="tab.label"
            >
              <span
                v-if="tab.isShowError"
                class="q-tab__alert text-negative"
              ></span>
            </q-tab>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tabModel" animated>
            <q-tab-panel :name="tabs[0].name">
              <q-card-section class="q-pa-lg">
                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">First Name</label>
                    <q-input
                      v-model="model.firstName"
                      :error-message="firstNameErrors"
                      :error="$v.model.firstName.$error"
                      @input="$v.model.firstName.$touch"
                      @blur="$v.model.firstName.$touch"
                      dense
                      class="field-input"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Middle Name</label>
                    <q-input
                      v-model="model.middleName"
                      :error-message="middleNameErrors"
                      :error="$v.model.middleName.$error"
                      @input="$v.model.middleName.$touch"
                      @blur="$v.model.middleName.$touch"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Last Name</label>
                    <q-input
                      v-model="model.lastName"
                      :error-message="lastNameErrors"
                      :error="$v.model.lastName.$error"
                      @input="$v.model.lastName.$touch"
                      @blur="$v.model.lastName.$touch"
                      dense
                      class="field-input"
                    />
                  </div>
                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Business Name</label>
                    <q-input
                      v-model="model.businessName"
                      :error-message="businessNameErrors"
                      :error="$v.model.businessName.$error"
                      @input="$v.model.businessName.$touch"
                      @blur="$v.model.businessName.$touch"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Website</label>
                    <q-input
                      v-model="model.website"
                      type="url"
                      :error-message="websiteErrors"
                      :error="$v.model.website.$error"
                      @input="$v.model.website.$touch"
                      @blur="$v.model.website.$touch"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Clinic Arrangement</label>
                    <base-radio
                      :options="YesOrNo"
                      v-model="model.clinicArrangement"
                      :error-message="clinicArrangementErrors"
                      :error="$v.model.clinicArrangement.$error"
                      @change="$v.model.clinicArrangement.$touch"
                      class="field-input"
                    />
                    <q-input
                      v-show="model.clinicArrangement"
                      v-model="model.clinicArrangementPracticeName"
                      :error-message="clinicArrangementPracticeNameErrors"
                      :error="$v.model.clinicArrangementPracticeName.$error"
                      @input="$v.model.clinicArrangementPracticeName.$touch"
                      @blur="$v.model.clinicArrangementPracticeName.$touch"
                      class="col-md-4 field-input"
                      dense
                      label="What is the Practices Name?"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Business Arrangement</label>
                    <base-radio
                      :options="BusinessArrangements"
                      v-model="model.businessArrangement"
                      :error-message="businessArrangementErrors"
                      :error="$v.model.businessArrangement.$error"
                      @change="$v.model.businessArrangement.$touch"
                      class="field-input"
                    />
                  </div>
                </div>

                <h1 class="text-h5">Postal Address</h1>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Country</label>
                    <app-select
                      v-model="model.postalAddress.country"
                      :options="countryOptions"
                      @input="onChangePostalAddressCountry"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Street</label>
                    <skills-suggestions-address
                      dense
                      v-model="model.postalAddress.street"
                      :error-message="postalAddressStreetErrors"
                      :error="$v.model.postalAddress.street.$error"
                      @input="$v.model.postalAddress.street.$touch"
                      @blur="$v.model.postalAddress.street.$touch"
                      :maxlength="100"
                      :onItemSelected="onPostalAddressStreetSelected"
                      isSkillsGroupPortal
                      v-if="displayPostalAddressSuggestionsAddress"
                    />
                    <q-input
                      v-else
                      dense
                      :error-message="postalAddressStreetErrors"
                      :error="$v.model.postalAddress.street.$error"
                      @input="$v.model.postalAddress.street.$touch"
                      @blur="$v.model.postalAddress.street.$touch"
                      v-model="model.postalAddress.street"
                      maxlength="250"
                      :readonly="disablePostalAddressStreet"
                      class="field-input"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">City</label>
                    <q-input
                      dense
                      v-model="model.postalAddress.city"
                      :error-message="postalAddressCityErrors"
                      :error="$v.model.postalAddress.city.$error"
                      @input="$v.model.postalAddress.city.$touch"
                      @blur="$v.model.postalAddress.city.$touch"
                      :maxlength="80"
                      :readonly="disablePostalAddressCitySuburbPostcode"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Suburb</label>
                    <q-input
                      dense
                      v-model="model.postalAddress.suburb"
                      :maxlength="100"
                      :readonly="disablePostalAddressCitySuburbPostcode"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Post Code</label>
                    <skills-post-code
                      dense
                      v-model="model.postalAddress.postCode"
                      :country="model.postalAddress.country"
                      :error-message="postalAddressPostCodeErrors"
                      :error="$v.model.postalAddress.postCode.$error"
                      @input="$v.model.postalAddress.postCode.$touch"
                      @blur="$v.model.postalAddress.postCode.$touch"
                      :readonly="disablePostalAddressCitySuburbPostcode"
                    />
                  </div>
                </div>

                <h1 class="text-h5">Street address</h1>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Country</label>
                    <app-select
                      v-model="model.physicalAddress.country"
                      :options="countryOptions"
                      @input="onChangePhysicalAddressCountry"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Street</label>
                    <skills-suggestions-address
                      dense
                      v-model="model.physicalAddress.street"
                      :error-message="physicalAddressStreetErrors"
                      :error="$v.model.physicalAddress.street.$error"
                      @input="$v.model.physicalAddress.street.$touch"
                      @blur="$v.model.physicalAddress.street.$touch"
                      :maxlength="250"
                      :onItemSelected="onPhysicalAddressStreetSelected"
                      isSkillsGroupPortal
                      v-if="displayPhysicalAddressSuggestionsAddress"
                    />
                    <q-input
                      v-else
                      dense
                      v-model="model.physicalAddress.street"
                      :error-message="physicalAddressStreetErrors"
                      :error="$v.model.physicalAddress.street.$error"
                      @input="$v.model.physicalAddress.street.$touch"
                      @blur="$v.model.physicalAddress.street.$touch"
                      maxlength="250"
                      :readonly="disablePhysicalAddressStreet"
                      class="field-input"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">City</label>
                    <q-input
                      dense
                      v-model="model.physicalAddress.city"
                      :error-message="physicalAddressCityErrors"
                      :error="$v.model.physicalAddress.city.$error"
                      @input="$v.model.physicalAddress.city.$touch"
                      @blur="$v.model.physicalAddress.city.$touch"
                      :maxlength="80"
                      :readonly="disablePhysicalAddressCitySuburbPostcode"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Suburb</label>
                    <q-input
                      dense
                      v-model="model.physicalAddress.suburb"
                      :maxlength="250"
                      :readonly="disablePhysicalAddressCitySuburbPostcode"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Post Code</label>
                    <skills-post-code
                      dense
                      v-model="model.physicalAddress.postCode"
                      :country="model.physicalAddress.country"
                      :error-message="physicalAddressPostCodeErrors"
                      :error="$v.model.physicalAddress.postCode.$error"
                      @input="$v.model.physicalAddress.postCode.$touch"
                      @blur="$v.model.physicalAddress.postCode.$touch"
                      :readonly="disablePhysicalAddressCitySuburbPostcode"
                    />
                  </div>
                </div>

                <div class="row q-pt-md">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Mobile Number</label>
                    <q-input
                      v-model="model.mobileNumber"
                      :error-message="mobileNumberErrors"
                      :error="$v.model.mobileNumber.$error"
                      @input="$v.model.mobileNumber.$touch"
                      @blur="$v.model.mobileNumber.$touch"
                      dense
                      class="field-input"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Landline Number</label>
                    <q-input
                      v-model="model.landlineNumber"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Work Email</label>
                    <q-input
                      v-model="model.workEmail"
                      :error-message="workEmailErrors"
                      :error="$v.model.workEmail.$error"
                      @input="$v.model.workEmail.$touch"
                      @blur="$v.model.workEmail.$touch"
                      dense
                      class="field-input"
                      type="email"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">
                      Your Reception Email Or Accounts Ones If Different
                    </label>
                    <q-input
                      v-model="model.receptionEmail"
                      :error-message="receptionEmailErrors"
                      :error="$v.model.receptionEmail.$error"
                      @input="$v.model.receptionEmail.$touch"
                      @blur="$v.model.receptionEmail.$touch"
                      type="email"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel :name="tabs[1].name">
              <q-card-section class="q-pa-lg">
                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Regulatory body</label>
                    <base-checkbox
                      :options="RegulatoryBodies"
                      v-model="model.regulatoryBodies"
                      class="field-input"
                      :error-message="regulatoryBodiesErrors"
                      :error="$v.model.regulatoryBodies.$error"
                      @change="$v.model.regulatoryBodies.$touch"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Regulatory status</label>
                    <base-checkbox
                      :options="RegulatoryStatuses"
                      v-model="model.regulatoryStatuses"
                      :error-message="regulatoryStatusesErrors"
                      :error="$v.model.regulatoryStatuses.$error"
                      @change="$v.model.regulatoryStatuses.$touch"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Professional affiliation</label>
                    <base-checkbox
                      :options="ProfessionalAffiliations"
                      v-model="model.professionalAffiliations"
                      :error-message="professionalAffiliationsErrors"
                      :error="$v.model.professionalAffiliations.$error"
                      @change="$v.model.professionalAffiliations.$touch"
                      class="field-input"
                    />
                    <q-input
                      v-show="displayProfessionalAffiliationOtherText"
                      v-model="model.professionalAffiliationOtherText"
                      :error-message="professionalAffiliationOtherTextErrors"
                      :error="$v.model.professionalAffiliationOtherText.$error"
                      @input="$v.model.professionalAffiliationOtherText.$touch"
                      @blur="$v.model.professionalAffiliationOtherText.$touch"
                      class="col-md-4 field-input"
                      dense
                      label="The other option and current membership types"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">
                      Number of years of experience
                    </label>
                    <q-input
                      v-model.number="model.yearsOfExperience"
                      :error-message="yearsOfExperienceErrors"
                      :error="$v.model.yearsOfExperience.$error"
                      @input="$v.model.yearsOfExperience.$touch"
                      @blur="$v.model.yearsOfExperience.$touch"
                      type="number"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">
                      Name of professional supervisor
                    </label>
                    <q-input
                      v-model="model.professionalSupervisorName"
                      :error-message="professionalSupervisorNameErrors"
                      :error="$v.model.professionalSupervisorName.$error"
                      @input="$v.model.professionalSupervisorName.$touch"
                      @blur="$v.model.professionalSupervisorName.$touch"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <h1 class="text-h5">Indemnity insurance</h1>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Company Name</label>
                    <q-input
                      dense
                      class="field-input"
                      v-model="model.indemnityInsuranceCompanyName"
                      :error-message="indemnityInsuranceCompanyNameErrors"
                      :error="$v.model.indemnityInsuranceCompanyName.$error"
                      @input="$v.model.indemnityInsuranceCompanyName.$touch"
                      @blur="$v.model.indemnityInsuranceCompanyName.$touch"
                    />
                  </div>
                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Policy number</label>
                    <q-input
                      dense
                      class="field-input"
                      v-model="model.indemnityInsurancePolicyNumber"
                      :error-message="indemnityInsurancePolicyNumberErrors"
                      :error="$v.model.indemnityInsurancePolicyNumber.$error"
                      @input="$v.model.indemnityInsurancePolicyNumber.$touch"
                      @blur="$v.model.indemnityInsurancePolicyNumber.$touch"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Validity From</label>
                    <app-date
                      dense
                      class="field-input"
                      v-model="model.indemnityInsuranceFrom"
                      :error-message="indemnityInsuranceFromErrors"
                      :error="$v.model.indemnityInsuranceFrom.$error"
                      @input="$v.model.indemnityInsuranceFrom.$touch"
                      @blur="$v.model.indemnityInsuranceFrom.$touch"
                    />
                  </div>
                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Validity To</label>
                    <app-date
                      dense
                      class="field-input offset-md-1 col-md-5"
                      v-model="model.indemnityInsuranceTo"
                      :error-message="indemnityInsuranceToErrors"
                      :error="$v.model.indemnityInsuranceTo.$error"
                      @input="$v.model.indemnityInsuranceTo.$touch"
                      @blur="$v.model.indemnityInsuranceTo.$touch"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">
                      Annual practicing certificate
                    </label>
                    <q-file
                      clearable
                      dense
                      bottom-slots
                      v-model="
                        model.indemnityInsuranceAnnualPracticingCertificate
                      "
                      :error-message="
                        indemnityInsuranceAnnualPracticingCertificateErrors
                      "
                      :error="
                        $v.model.indemnityInsuranceAnnualPracticingCertificate
                          .$error
                      "
                      @input="
                        $v.model.indemnityInsuranceAnnualPracticingCertificate.$touch()
                      "
                      @blur="
                        $v.model.indemnityInsuranceAnnualPracticingCertificate.$touch()
                      "
                      counter
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Delivery mode</label>
                    <base-checkbox
                      :options="DeliveryModes"
                      v-model="model.deliveryModes"
                      :error-message="deliveryModesErrors"
                      :error="$v.model.deliveryModes.$error"
                      @change="$v.model.deliveryModes.$touch"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">
                      Your Clients seeks help with…
                    </label>
                    <base-checkbox
                      :options="ClientPurposes"
                      v-model="model.clientPurposes"
                      :error-message="clientPurposesErrors"
                      :error="$v.model.clientPurposes.$error"
                      @change="$v.model.clientPurposes.$touch"
                      class="field-input"
                    />
                    <q-input
                      v-show="displayClientPurposesAddictionText"
                      v-model="model.clientPurposesAddictionText"
                      :error-message="clientPurposesAddictionTextErrors"
                      :error="$v.model.clientPurposesAddictionText.$error"
                      @input="$v.model.clientPurposesAddictionText.$touch"
                      @blur="$v.model.clientPurposesAddictionText.$touch"
                      class="col-md-4 field-input"
                      dense
                      label="Addictions"
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Client Types</label>
                    <base-checkbox
                      :options="ClientTypes"
                      v-model="model.clientTypes"
                      :error-message="clientTypesErrors"
                      :error="$v.model.clientTypes.$error"
                      @change="$v.model.clientTypes.$touch"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Languages and cultures</label>
                    <q-input
                      v-model="model.languaguesAndCultures"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-9 col-xs-12 form-group">
                    <label class="field-name">
                      About you, the focus of your professional services, and
                      specific modes you most often use
                    </label>
                    <q-input
                      v-model="model.focusOfYourProfessionalServices"
                      type="textarea"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel :name="tabs[2].name">
              <q-card-section class="q-pa-lg">
                <div class="row">
                  <div class="col-md-9 col-xs-12 form-group">
                    <label class="field-name">Specialist Areas</label>
                    <base-checkbox
                      :options="SpecialistAreas"
                      v-model="model.specialistAreas"
                      :error-message="specialistAreasErrors"
                      :error="$v.model.specialistAreas.$error"
                      @change="$v.model.specialistAreas.$touch"
                      class="field-input specialist-areas-checkbox"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Treatment Areas</label>
                    <base-checkbox
                      :options="TreatmentAreas"
                      v-model="model.treatmentAreas"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Specialist Services</label>
                    <base-checkbox
                      :options="SpecialistServices"
                      v-model="model.specialistServices"
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-xs-12 form-group">
                    <label class="field-name">Working with under 18’s</label>
                    <base-radio
                      :options="YesOrNo"
                      v-model="model.workingWithUnderEightTeen"
                      class="field-input"
                      inline
                    />
                  </div>

                  <div class="col-md-4 offset-md-1 col-xs-12 form-group">
                    <label class="field-name">Instep Website</label>
                    <base-radio
                      :options="YesOrNo"
                      v-model="model.instepWebsite"
                      :error-message="instepWebsiteErrors"
                      :error="$v.model.instepWebsite.$error"
                      @input="$v.model.instepWebsite.$touch"
                      @blur="$v.model.instepWebsite.$touch"
                      class="field-input"
                      inline
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-9 col-xs-12 form-group">
                    <label class="field-name">
                      Please describe your premises
                    </label>
                    <q-input
                      v-model="model.premisesDescription"
                      type="textarea"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-9 col-xs-12 form-group">
                    <label class="field-name">
                      Please describe how you manage client
                      confidentiality/personal information.
                    </label>
                    <q-input
                      v-model="model.personalInformationDescription"
                      type="textarea"
                      dense
                      class="field-input"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-tab-panel>
            <q-tab-panel :name="tabs[3].name"></q-tab-panel>
            <q-tab-panel :name="tabs[4].name"></q-tab-panel>
            <q-tab-panel :name="tabs[5].name"></q-tab-panel>
          </q-tab-panels>

          <q-card-actions horizontal align="right" class="q-pa-lg">
            <q-btn
              flat
              icon="close"
              label="Reset"
              color="primary"
              :class="buttonClass()"
              @click="onReset()"
            />
            <q-btn
              icon="save"
              label="Save"
              color="primary"
              :class="buttonClass()"
              @click="onSave()"
            />
            <q-btn
              v-if="displayNextButton"
              icon="skip_next"
              label="Next"
              color="primary"
              :class="buttonClass()"
              @click="onNext()"
            />
            <q-btn
              v-else
              icon="check"
              label="Complete"
              color="primary"
              :class="buttonClass()"
              @click="onComplete()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { WellbeingProviderOnboardingStatuses } from '../../common/skills-group-portal/enums'
import {
  YesOrNo,
  BusinessArrangements,
  RegulatoryBodies,
  RegulatoryStatuses,
  ProfessionalAffiliations,
  DeliveryModes,
  ClientPurposes,
  ClientTypes,
  SpecialistAreas,
  TreatmentAreas,
  SpecialistServices,
  ErrorMessages,
  NEW_ZEALAND,
} from '../../common/constants.js'
import { validDate } from '../../common/datetime.js'
import { notEmptyArray, isAfterDate } from '../../common/customValidators'
import {
  required,
  requiredIf,
  email,
  url,
  minValue,
} from 'vuelidate/lib/validators'
import Utilities from '../../common/utilities.js'

export default {
  name: 'WellnessProviderOnboarding',

  components: {
    BaseRadio: () => import('@/compoments/inputs/BaseRadio'),
    BaseCheckbox: () => import('@/compoments/inputs/BaseCheckbox'),
    AppDate: () => import('../../compoments/AppDate.vue'),
    SkillsSuggestionsAddress: () =>
      import('../../compoments/SkillsSuggestionsAddress.vue'),
    AppSelect: () => import('../../compoments/select/AppSelect.vue'),
    SkillsPostCode: () => import('../../compoments/SkillsPostCode.vue'),
  },

  data() {
    return {
      countryOptions: Utilities.getCountries(),
      YesOrNo,
      BusinessArrangements,
      RegulatoryBodies,
      RegulatoryStatuses,
      ProfessionalAffiliations,
      DeliveryModes,
      ClientPurposes,
      ClientTypes,
      SpecialistAreas,
      TreatmentAreas,
      SpecialistServices,
      model: {
        status: WellbeingProviderOnboardingStatuses.Draft,
        firstName: null,
        middleName: null,
        lastName: null,
        businessName: null,
        website: null,
        clinicArrangement: null,
        clinicArrangementPracticeName: null,
        businessArrangement: null,
        mobileNumber: null,
        landlineNumber: null,
        physicalAddress: {
          country: null,
          street: null,
          suburb: null,
          city: null,
          postCode: null,
        },
        postalAddress: {
          country: null,
          street: null,
          suburb: null,
          city: null,
          postCode: null,
        },
        workEmail: null,
        receptionEmail: null,
        regulatoryBodies: [],
        regulatoryStatuses: [],
        professionalAffiliations: [],
        professionalAffiliationOtherText: null,
        yearsOfExperience: null,
        professionalSupervisorName: null,
        indemnityInsuranceCompanyName: null,
        indemnityInsurancePolicyNumber: null,
        indemnityInsuranceFrom: null,
        indemnityInsuranceTo: null,
        indemnityInsuranceAnnualPracticingCertificate: null,
        deliveryModes: [],
        clientPurposes: [],
        clientPurposesAddictionText: null,
        clientTypes: [],
        specialistAreas: [],
        treatmentAreas: [],
        specialistServices: [],
        workingWithUnderEightTeen: null,
        instepWebsite: null,
        premisesDescription: null,
        personalInformationDescription: null,
        languaguesAndCultures: null,
        focusOfYourProfessionalServices: null,
      },
      originModel: null,
      tabs: [
        {
          name: 'personalDetails',
          label: 'Personal Details',
          isShowError: false,
        },
        {
          name: 'businessDetails',
          label: 'Business Details',
          isShowError: false,
        },
        { name: 'practiceHours', label: 'Practice Hours', isShowError: false },
        { name: 'memberships', label: 'Memberships', isShowError: false },
        { name: 'services', label: 'Services', isShowError: false },
        { name: 'privacy', label: 'Privacy', isShowError: false },
      ],
      tabModel: null,
    }
  },

  validations: {
    model: {
      firstName: { required },
      middleName: { required },
      lastName: { required },
      businessName: { required },
      website: { url },
      clinicArrangement: { required },
      clinicArrangementPracticeName: {
        required: requiredIf((data) => {
          return !!data.clinicArrangement
        }),
      },
      businessArrangement: { required },
      physicalAddress: {
        street: {
          required,
        },
        city: {
          required,
        },
        postCode: {
          required,
        },
      },
      postalAddress: {
        street: {
          required,
        },
        city: {
          required,
        },
        postCode: {
          required,
        },
      },
      mobileNumber: { required },
      workEmail: {
        email,
        required: requiredIf((data) => {
          if (data.workEmail || data.receptionEmail) {
            return false
          }

          return true
        }),
      },
      receptionEmail: {
        email,
        required: requiredIf((data) => {
          if (data.workEmail || data.receptionEmail) {
            return false
          }

          return true
        }),
      },
      regulatoryBodies: { notEmptyArray },
      regulatoryStatuses: { notEmptyArray },
      professionalAffiliations: { notEmptyArray },
      professionalAffiliationOtherText: {
        required: requiredIf((data) => {
          return data.professionalAffiliations.some((x) => [10, 11].includes(x))
        }),
      },
      yearsOfExperience: {
        required,
        minValue: minValue(0),
      },
      professionalSupervisorName: { required },
      indemnityInsuranceCompanyName: { required },
      indemnityInsurancePolicyNumber: { required },
      indemnityInsuranceFrom: {
        required,
        validDate,
        isAfterDate: isAfterDate('indemnityInsuranceTo'),
      },
      indemnityInsuranceTo: {
        required,
        validDate,
      },
      indemnityInsuranceAnnualPracticingCertificate: { required },
      deliveryModes: { notEmptyArray },
      clientPurposes: { notEmptyArray },
      clientPurposesAddictionText: {
        required: requiredIf((data) => {
          return data.clientPurposes.includes(9)
        }),
      },
      clientTypes: { notEmptyArray },
      specialistAreas: { notEmptyArray },
      instepWebsite: { required },
    },
  },

  created() {
    this.tabModel = this.tabs[0].name
    this.originModel = { ...this.model }
  },

  computed: {
    getColorStatus() {
      return this.model.status === WellbeingProviderOnboardingStatuses.Draft
        ? null
        : 'positive'
    },

    getIconStatus() {
      return this.model.status === WellbeingProviderOnboardingStatuses.Draft
        ? 'drafts'
        : 'check_circle'
    },

    displayNextButton() {
      const currentTabIndex = this.tabs.findIndex(
        (x) => x.name === this.tabModel
      )

      return [0, 1].includes(currentTabIndex)
    },

    getStatusName() {
      return Utilities.getKeyNameByValue(
        WellbeingProviderOnboardingStatuses,
        this.model.status
      )
    },

    disablePostalAddressCitySuburbPostcode() {
      if (
        !this.model.postalAddress.country?.value ||
        this.model.postalAddress.country?.value === NEW_ZEALAND
      )
        return true
      return false
    },

    disablePostalAddressStreet() {
      if (this.model.postalAddress.country?.value) return false
      return true
    },

    displayPostalAddressSuggestionsAddress() {
      return this.model.postalAddress.country?.value === NEW_ZEALAND
    },

    displayPhysicalAddressSuggestionsAddress() {
      return this.model.physicalAddress.country?.value === NEW_ZEALAND
    },

    disablePhysicalAddressCitySuburbPostcode() {
      if (
        !this.model.physicalAddress.country?.value ||
        this.model.physicalAddress.country?.value === NEW_ZEALAND
      )
        return true
      return false
    },

    disablePhysicalAddressStreet() {
      if (this.model.physicalAddress.country?.value) return false
      return true
    },

    displayProfessionalAffiliationOtherText() {
      return this.model.professionalAffiliations.some((x) =>
        [10, 11].includes(x)
      )
    },

    displayClientPurposesAddictionText() {
      return this.model.clientPurposes.includes(9)
    },

    firstNameErrors() {
      if (this.$v.model.firstName.$dirty && !this.$v.model.firstName.required) {
        return ErrorMessages.REQUIRED_FIELD('First Name')
      }

      return ''
    },
    middleNameErrors() {
      if (
        this.$v.model.middleName.$dirty &&
        !this.$v.model.middleName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Middle Name')
      }

      return ''
    },
    lastNameErrors() {
      if (this.$v.model.lastName.$dirty && !this.$v.model.lastName.required) {
        return ErrorMessages.REQUIRED_FIELD('Last Name')
      }

      return ''
    },

    businessNameErrors() {
      if (
        this.$v.model.businessName.$dirty &&
        !this.$v.model.businessName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Business Name')
      }

      return ''
    },

    websiteErrors() {
      if (this.$v.model.website.$dirty && !this.$v.model.website.url) {
        return ErrorMessages.INVALID_URL
      }

      return ''
    },

    clinicArrangementErrors() {
      if (
        this.$v.model.clinicArrangement.$dirty &&
        !this.$v.model.clinicArrangement.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Clinic Arrangement')
      }

      return ''
    },

    clinicArrangementPracticeNameErrors() {
      if (
        this.$v.model.clinicArrangementPracticeName.$dirty &&
        !this.$v.model.clinicArrangementPracticeName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Practice Name')
      }

      return ''
    },

    businessArrangementErrors() {
      if (
        this.$v.model.businessArrangement.$dirty &&
        !this.$v.model.businessArrangement.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Business Arrangement')
      }

      return ''
    },

    postalAddressStreetErrors() {
      if (
        this.$v.model.postalAddress.street.$dirty &&
        !this.$v.model.postalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    postalAddressCityErrors() {
      if (
        this.$v.model.postalAddress.city.$dirty &&
        !this.$v.model.postalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    postalAddressPostCodeErrors() {
      if (
        this.$v.model.postalAddress.postCode.$dirty &&
        !this.$v.model.postalAddress.postCode.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Post Code')
      }

      return ''
    },

    physicalAddressStreetErrors() {
      if (
        this.$v.model.physicalAddress.street.$dirty &&
        !this.$v.model.physicalAddress.street.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Street')
      }

      return ''
    },

    physicalAddressCityErrors() {
      if (
        this.$v.model.physicalAddress.city.$dirty &&
        !this.$v.model.physicalAddress.city.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('City')
      }

      return ''
    },

    physicalAddressPostCodeErrors() {
      if (
        this.$v.model.physicalAddress.postCode.$dirty &&
        !this.$v.model.physicalAddress.postCode.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Post Code')
      }

      return ''
    },

    mobileNumberErrors() {
      if (
        this.$v.model.mobileNumber.$dirty &&
        !this.$v.model.mobileNumber.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Mobile Number')
      }

      return ''
    },

    workEmailErrors() {
      if (this.$v.model.workEmail.$dirty) {
        if (!this.$v.model.workEmail.required) {
          return ErrorMessages.REQUIRED_FIELD('Work Email')
        }

        if (!this.$v.model.workEmail.email) {
          return ErrorMessages.INVALID_EMAIL
        }
      }

      return ''
    },

    receptionEmailErrors() {
      if (this.$v.model.receptionEmail.$dirty) {
        if (!this.$v.model.receptionEmail.required) {
          return ErrorMessages.REQUIRED_FIELD('Your Reception Email')
        }

        if (!this.$v.model.receptionEmail.email) {
          return ErrorMessages.INVALID_EMAIL
        }
      }

      return ''
    },

    regulatoryBodiesErrors() {
      if (
        this.$v.model.regulatoryBodies.$dirty &&
        !this.$v.model.regulatoryBodies.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Regulatory Body')
      }

      return ''
    },

    regulatoryStatusesErrors() {
      if (
        this.$v.model.regulatoryStatuses.$dirty &&
        !this.$v.model.regulatoryStatuses.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Regulatory Status')
      }

      return ''
    },

    professionalAffiliationsErrors() {
      if (
        this.$v.model.professionalAffiliations.$dirty &&
        !this.$v.model.professionalAffiliations.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Professional Affiliation')
      }

      return ''
    },

    professionalAffiliationOtherTextErrors() {
      if (
        this.$v.model.professionalAffiliationOtherText.$dirty &&
        !this.$v.model.professionalAffiliationOtherText.required
      ) {
        return ErrorMessages.REQUIRED_FIELD(
          'The other option and current membership types'
        )
      }

      return ''
    },

    yearsOfExperienceErrors() {
      if (this.$v.model.yearsOfExperience.$dirty) {
        if (!this.$v.model.yearsOfExperience.required) {
          return ErrorMessages.REQUIRED_FIELD('Number of years of experience')
        }

        if (!this.$v.model.yearsOfExperience.minValue) {
          return ErrorMessages.INVALID_MIN_VALUE(
            'Number of years of experience',
            this.$v.model.yearsOfExperience.$params.minValue.min
          )
        }
      }

      return ''
    },

    professionalSupervisorNameErrors() {
      if (
        this.$v.model.professionalSupervisorName.$dirty &&
        !this.$v.model.professionalSupervisorName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Professional Supervisor Name')
      }

      return ''
    },

    indemnityInsuranceCompanyNameErrors() {
      if (
        this.$v.model.indemnityInsuranceCompanyName.$dirty &&
        !this.$v.model.indemnityInsuranceCompanyName.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Company Name')
      }

      return ''
    },

    indemnityInsurancePolicyNumberErrors() {
      if (
        this.$v.model.indemnityInsurancePolicyNumber.$dirty &&
        !this.$v.model.indemnityInsurancePolicyNumber.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Policy Number')
      }

      return ''
    },

    indemnityInsuranceFromErrors() {
      if (this.$v.model.indemnityInsuranceFrom.$dirty) {
        if (!this.$v.model.indemnityInsuranceFrom.required) {
          return ErrorMessages.REQUIRED_FIELD('Validity From')
        }

        if (!this.$v.model.indemnityInsuranceFrom.validDate) {
          return ErrorMessages.INVALID_FORMAT_DATE
        }

        if (!this.$v.model.indemnityInsuranceFrom.isAfterDate) {
          return ErrorMessages.INVALID_MIN_VALUE('Validity To', 'Validity From')
        }
      }

      return ''
    },

    indemnityInsuranceToErrors() {
      if (this.$v.model.indemnityInsuranceTo.$dirty) {
        if (!this.$v.model.indemnityInsuranceTo.required) {
          return ErrorMessages.REQUIRED_FIELD('Validity To')
        }

        if (!this.$v.model.indemnityInsuranceTo.validDate) {
          return ErrorMessages.INVALID_FORMAT_DATE
        }
      }

      return ''
    },

    indemnityInsuranceAnnualPracticingCertificateErrors() {
      if (
        this.$v.model.indemnityInsuranceAnnualPracticingCertificate.$dirty &&
        !this.$v.model.indemnityInsuranceAnnualPracticingCertificate.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Annual Practicing Certificate')
      }

      return ''
    },

    deliveryModesErrors() {
      if (
        this.$v.model.deliveryModes.$dirty &&
        !this.$v.model.deliveryModes.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Delivery Mode')
      }

      return ''
    },

    clientPurposesErrors() {
      if (
        this.$v.model.clientPurposes.$dirty &&
        !this.$v.model.clientPurposes.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Your Clients seeks help with')
      }

      return ''
    },

    clientPurposesAddictionTextErrors() {
      if (
        this.$v.model.clientPurposesAddictionText.$dirty &&
        !this.$v.model.clientPurposesAddictionText.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Addictions')
      }

      return ''
    },

    clientTypesErrors() {
      if (
        this.$v.model.clientTypes.$dirty &&
        !this.$v.model.clientTypes.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Client Type')
      }

      return ''
    },

    specialistAreasErrors() {
      if (
        this.$v.model.specialistAreas.$dirty &&
        !this.$v.model.specialistAreas.notEmptyArray
      ) {
        return ErrorMessages.EMPTY_ARRAY('Specialist Area')
      }

      return ''
    },

    instepWebsiteErrors() {
      if (
        this.$v.model.instepWebsite.$dirty &&
        !this.$v.model.instepWebsite.required
      ) {
        return ErrorMessages.REQUIRED_FIELD('Instep Website')
      }

      return ''
    },
  },

  methods: {
    buttonClass() {
      if (this.$q.platform.is.mobile) {
        return 'col-xs-12 q-mt-xs'
      }
      return 'float-right'
    },

    onChangePhysicalAddressCountry() {
      this.model.physicalAddress.street = ''
      this.model.physicalAddress.suburb = ''
      this.model.physicalAddress.city = ''
      this.model.physicalAddress.postCode = ''
    },

    onPhysicalAddressStreetSelected({ street, suburb, city, postCode }) {
      this.model.physicalAddress.street = street
      this.model.physicalAddress.suburb = suburb
      this.model.physicalAddress.city = city
      this.model.physicalAddress.postCode = postCode
    },

    onChangePostalAddressCountry() {
      this.model.postalAddress.street = ''
      this.model.postalAddress.suburb = ''
      this.model.postalAddress.city = ''
      this.model.postalAddress.postCode = ''
    },

    onPostalAddressStreetSelected({ street, suburb, city, postCode }) {
      this.model.postalAddress.street = street
      this.model.postalAddress.suburb = suburb
      this.model.postalAddress.city = city
      this.model.postalAddress.postCode = postCode
    },

    updateErrorTabs(isReset) {
      this.tabs = this.tabs.map((tab) => {
        if (isReset) {
          tab.isShowError = false
          return tab
        }

        switch (tab.name) {
          case 'personalDetails':
            {
              tab.isShowError =
                this.$v.model.firstName.$invalid ||
                this.$v.model.middleName.$invalid ||
                this.$v.model.lastName.$invalid ||
                this.$v.model.businessName.$invalid ||
                this.$v.model.website.$invalid ||
                this.$v.model.clinicArrangement.$invalid ||
                this.$v.model.clinicArrangementPracticeName.$invalid ||
                this.$v.model.businessArrangement.$invalid ||
                this.$v.model.postalAddress.$invalid ||
                this.$v.model.physicalAddress.$invalid ||
                this.$v.model.mobileNumber.$invalid ||
                this.$v.model.workEmail.$invalid ||
                this.$v.model.receptionEmail.$invalid
            }
            break

          case 'businessDetails':
            {
              tab.isShowError =
                this.$v.model.regulatoryBodies.$invalid ||
                this.$v.model.regulatoryStatuses.$invalid ||
                this.$v.model.professionalAffiliations.$invalid ||
                this.$v.model.professionalAffiliationOtherText.$invalid ||
                this.$v.model.yearsOfExperience.$invalid ||
                this.$v.model.professionalSupervisorName.$invalid ||
                this.$v.model.indemnityInsuranceCompanyName.$invalid ||
                this.$v.model.indemnityInsurancePolicyNumber.$invalid ||
                this.$v.model.indemnityInsuranceFrom.$invalid ||
                this.$v.model.indemnityInsuranceTo.$invalid ||
                this.$v.model.indemnityInsuranceAnnualPracticingCertificate
                  .$invalid ||
                this.$v.model.deliveryModes.$invalid ||
                this.$v.model.clientPurposes.$invalid ||
                this.$v.model.clientPurposesAddictionText.$invalid ||
                this.$v.model.clientTypes.$invalid
            }
            break

          case 'practiceHours':
            {
              tab.isShowError =
                this.$v.model.specialistAreas.$invalid ||
                this.$v.model.instepWebsite.$invalid
            }
            break
          case 'memberships':
            {
              tab.isShowError = false
            }
            break
          case 'services':
            {
              tab.isShowError = false
            }
            break
          case 'privacy':
            {
              tab.isShowError = false
            }
            break
        }

        return tab
      })
    },

    onClearErrorTabs() {
      this.tabs = this.tabs.map((x) => {
        x.isShowError = false
        return x
      })
    },

    onNext() {
      const currentTabIndex = this.tabs.findIndex(
        (x) => x.name == this.tabModel
      )
      this.tabModel = this.tabs[currentTabIndex + 1].name
    },

    onReset() {
      this.tabModel = this.tabs[0].name
      this.model = {
        ...this.originModel,
        physicalAddress: {
          country: null,
          street: null,
          suburb: null,
          city: null,
          postCode: null,
        },
        postalAddress: {
          country: null,
          street: null,
          suburb: null,
          city: null,
          postCode: null,
        },
      }

      this.$v.$reset()
      this.onClearErrorTabs()
    },

    onSave() {
      this.$v.$touch()
      this.updateErrorTabs()
      if (!this.$v.$invalid) {
        this.$q.notify({
          type: 'positive',
          message: 'Wellbeing Provider Onboarding saved Successfully!',
        })
      }
    },

    onComplete() {
      this.$v.$touch()
      this.updateErrorTabs()

      if (!this.$v.$invalid) {
        this.model.status =
          this.model.status === WellbeingProviderOnboardingStatuses.Active
            ? WellbeingProviderOnboardingStatuses.Draft
            : WellbeingProviderOnboardingStatuses.Active
        const statusName = Utilities.getKeyNameByValue(
          WellbeingProviderOnboardingStatuses,
          this.model.status
        )
        this.$q.notify({
          type: 'positive',
          message: `Wellbeing Provider Onboarding has been changed to ${statusName}!`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.q-tab__alert {
  right: -12px;
  border-radius: 50%;
  background: currentColor;
  top: 7px;
  height: 10px;
  width: 10px;
}

@media screen and (min-width: 599px) {
  .specialist-areas-checkbox {
    column-count: 3;
  }
}
</style>
